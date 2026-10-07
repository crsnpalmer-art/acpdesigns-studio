// Generate src/content/hermes-live.json from Carson's live Hermes setup on this Mac.
// Ported from the retired My Hermes Stack site (2026-10-06); feeds /systems.
//
// Run locally before deploying: node scripts/gen-hermes-data.mjs
//
// It reads the Hermes profile roster, scheduled jobs, and loaded LaunchAgents,
// then writes a PUBLIC-SAFE `window.RP_LIVE` blob for the site to render.
// Only whitelisted fields are emitted — never prompts, paths, tokens, chat IDs,
// tenant data, or message bodies. Paused/disabled jobs are COUNTED only; their
// names are never emitted.

import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const HERMES_HOME = join(homedir(), '.hermes');

function sh(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  } catch (e) {
    console.error(`! command failed: ${cmd} ${args.join(' ')}`);
    throw e;
  }
}

// Public persona metadata for known profiles. Unknown profiles are still
// included (with a generic label) and trigger a warning so the site never
// silently drops a lane.
const PROFILE_META = {
  main: { persona: 'Dispatcher', emoji: '🎩', profile: 'default' },
  work: { persona: 'Leasing Back Office', emoji: '🧠', profile: 'work' },
  lyra: { persona: 'Lyra', emoji: '🌷', profile: 'lyra' },
  finance: { persona: 'Trading', emoji: '📊', profile: 'finance' },
  collections: { persona: 'Collections & Books', emoji: '💸', profile: 'collections' },
  ops: { persona: 'System Health', emoji: '🛡️', profile: 'ops' },
  memory: { persona: 'Memory & Wiki', emoji: '📚', profile: 'memory' },
  maintenance: { persona: 'Maintenance', emoji: '🥊', profile: 'maintenance' },
  tweeter: { persona: 'Research', emoji: '🐦', profile: 'tweeter' },
};
const PROFILE_ORDER = ['main', 'work', 'lyra', 'finance', 'collections', 'ops', 'memory', 'maintenance', 'tweeter'];

// Map Hermes provider ids to a public vendor prefix.
function normalizeProvider(provider, model) {
  const p = (provider || '').toLowerCase();
  if (p.startsWith('openai')) return 'openai-codex';
  if (p.startsWith('claude') || p.startsWith('anthropic')) return 'anthropic';
  if (p.startsWith('xai') || p.startsWith('grok')) return 'xai';
  const m = (model || '').toLowerCase();
  if (m.startsWith('gpt')) return 'openai-codex';
  if (m.startsWith('claude')) return 'anthropic';
  if (m.startsWith('grok')) return 'xai';
  return p || 'unknown';
}

function configModel(profileHome, id) {
  const p = join(profileHome, 'config.yaml');
  if (!existsSync(p)) {
    console.warn(`! ${id}: no config.yaml — model left blank`);
    return '';
  }
  const text = readFileSync(p, 'utf8');
  const block = /^model:\s*\n((?:[ \t]+.*\n?)*)/m.exec(text);
  const body = block ? block[1] : '';
  const pick = (key) => {
    const m = new RegExp(`^\\s+${key}:\\s*([^\\n#]+)`, 'm').exec(body);
    return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
  };
  const model = pick('default').replace(/\[[^\]]*\]$/, ''); // strip context suffix like [1m]
  if (!model) {
    console.warn(`! ${id}: no model.default found — model left blank`);
    return '';
  }
  return `${normalizeProvider(pick('provider'), model)}/${model}`;
}

function profileHomes() {
  const homes = new Map([['main', HERMES_HOME]]);
  const profilesDir = join(HERMES_HOME, 'profiles');
  if (existsSync(profilesDir)) {
    for (const name of readdirSync(profilesDir)) {
      const full = join(profilesDir, name);
      let st;
      try { st = lstatSync(full); } catch { continue; }
      if (name.startsWith('.') || st.isSymbolicLink() || !st.isDirectory()) continue; // skip hidden dirs + rename aliases
      if (!existsSync(join(full, 'config.yaml'))) {
        console.warn(`! skipping "${name}": no config.yaml (not a live profile)`);
        continue;
      }
      const id = name === 'default' ? 'main' : name;
      if (!PROFILE_META[id]) console.warn(`! unknown profile "${name}" — included with a generic label; add it to PROFILE_META`);
      homes.set(id, full);
    }
  }
  const ordered = PROFILE_ORDER.filter((id) => homes.has(id));
  const extra = [...homes.keys()].filter((id) => !PROFILE_ORDER.includes(id)).sort();
  return { homes, ids: [...ordered, ...extra] };
}

function getProfiles({ homes, ids }) {
  return ids.map((id) => {
    const meta = PROFILE_META[id] || { persona: id, emoji: '•', profile: id };
    return {
      id,
      persona: meta.persona,
      emoji: meta.emoji,
      profile: meta.profile,
      model: configModel(homes.get(id), id),
    };
  });
}

const DOW = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function fmtTime(hour, min) {
  if (hour === 12 && min === 0) return 'noon';
  if (hour === 0 && min === 0) return 'midnight';
  const ap = hour < 12 ? 'AM' : 'PM';
  let hr = hour % 12;
  if (hr === 0) hr = 12;
  return `${hr}:${String(min).padStart(2, '0')} ${ap}`;
}
function fmtHour(hour) {
  if (hour === 12) return 'noon';
  if (hour === 0) return 'midnight';
  return `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`;
}
function dayPrefix(domF, dowF) {
  if (domF !== '*') return `Monthly ${ordinal(parseInt(domF, 10))}`;
  if (dowF !== '*') {
    if (dowF === '1-5') return 'Weekdays';
    if (dowF === '0-6') return 'Daily';
    return dowF.split(',').map((d) => DOW[parseInt(d, 10) % 7]).join(', ');
  }
  return 'Daily';
}
function parseCron(expr) {
  const [minF = '0', hourF = '*', domF = '*', , dowF = '*'] = expr.trim().split(/\s+/);
  const days = dayPrefix(domF, dowF);
  const dayNote = days === 'Daily' ? '' : ` (${days})`;
  const range = /^(\d+)-(\d+)$/.exec(hourF);
  const minStep = /^\*\/(\d+)$/.exec(minF);

  // Minute step: "*/15 7-21 * * *" or "*/20 * * * *"
  if (minStep) {
    const every = `Every ${minStep[1]} minutes`;
    if (range) {
      const a = parseInt(range[1], 10); const b = parseInt(range[2], 10);
      return { h: a, cadence: `${every}, ${fmtHour(a)}–${fmtHour(b)}${dayNote}` };
    }
    return { h: 0, cadence: `${every}${dayNote}` };
  }
  const min = /^\d+$/.test(minF) ? parseInt(minF, 10) : 0;
  const mm = String(min).padStart(2, '0');
  // Hour step: "0 */6 * * *"
  const everyN = /^\*\/(\d+)$/.exec(hourF);
  if (everyN) return { h: min / 60, cadence: `Every ${everyN[1]} hours at :${mm}${dayNote}` };
  // Every hour: "0 * * * *"
  if (hourF === '*') return { h: min / 60, cadence: `Hourly at :${mm}${dayNote}` };
  // Hour range: "0 7-21 * * *"
  if (range) {
    const a = parseInt(range[1], 10); const b = parseInt(range[2], 10);
    return { h: a + min / 60, cadence: `Hourly at :${mm}, ${fmtHour(a)}–${fmtHour(b)}${dayNote}` };
  }
  const hours = hourF.split(',').map((x) => parseInt(x, 10)).filter(Number.isFinite);
  const firstHour = hours[0] ?? 0;
  return { h: firstHour + min / 60, cadence: `${days} ${hours.map((hr) => fmtTime(hr, min)).join(', ')}` };
}
function parseInterval(schedule) {
  const minutes = schedule.minutes || (schedule.seconds ? Math.round(schedule.seconds / 60) : null);
  const hours = schedule.hours || null;
  if (minutes) return `Every ${minutes} minute${minutes === 1 ? '' : 's'}`;
  if (hours) return `Every ${hours} hour${hours === 1 ? '' : 's'}`;
  return 'Recurring interval';
}
// Strip emoji / pictographs and stray symbols from job names for public display.
function cleanName(name) {
  return String(name || '')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function unwrapJobs(text) {
  const data = JSON.parse(text);
  return Array.isArray(data) ? data : data.jobs || [];
}
function getCrons({ homes, ids }) {
  const crons = [];
  let paused = 0;
  for (const id of ids) {
    const jobsPath = join(homes.get(id), 'cron', 'jobs.json');
    if (!existsSync(jobsPath)) continue;
    for (const job of unwrapJobs(readFileSync(jobsPath, 'utf8'))) {
      if (job.enabled === false || job.paused === true) { paused += 1; continue; } // count only
      const schedule = job.schedule || {};
      let parsed = { h: 0, cadence: 'Scheduled' };
      if (schedule.kind === 'cron' && schedule.expr) parsed = parseCron(schedule.expr);
      else if (schedule.kind === 'interval') parsed = { h: 0, cadence: parseInterval(schedule) };
      crons.push({
        name: cleanName(job.name) || 'Scheduled job',
        agentId: id,
        kind: schedule.kind || 'schedule',
        h: parsed.h,
        cadence: parsed.cadence,
      });
    }
  }
  crons.sort((a, b) => (a.h - b.h) || a.name.localeCompare(b.name));
  return { crons, enabledCount: crons.length, disabledCount: paused };
}

function getLaunchd() {
  const out = sh('launchctl', ['list']);
  const labels = out
    .split('\n')
    .map((l) => l.trim().split(/\s+/).pop())
    .filter((l) => l && !l.startsWith('application.'))
    .filter((l) => l.startsWith('ai.hermes') || l.startsWith('com.palmer'))
    .sort();
  return { labels: [...new Set(labels)] };
}

function getGateway(agentCount) {
  const p = join(HERMES_HOME, 'gateway_state.json');
  let served = agentCount;
  try {
    const st = JSON.parse(readFileSync(p, 'utf8'));
    if (Array.isArray(st.served_profiles) && st.served_profiles.length) served = st.served_profiles.length;
  } catch { /* fall back to the profile count */ }
  return { processes: 1, servedProfiles: served };
}

function getHermesVersion() {
  try {
    const m = /Hermes Agent (v[\d.]+)/.exec(sh('hermes', ['--version']));
    return m ? m[1] : '';
  } catch { return ''; }
}

const roster = profileHomes();
const agents = getProfiles(roster);
const { crons, enabledCount, disabledCount } = getCrons(roster);

// Every live job needs a write-up in src/content/job-guide.json (keyed by exact name), or the
// site shows it with no description. Warn loudly so a rename can't slip through.
{
  const guide = JSON.parse(readFileSync('src/content/job-guide.json', 'utf8'));
  const missing = crons.map((c) => c.name).filter((n) => !guide[n]);
  const stale = Object.keys(guide).filter((n) => !crons.some((c) => c.name === n));
  if (missing.length) console.warn(`! src/content/job-guide.json has no entry for: ${missing.join(' | ')}`);
  if (stale.length) console.warn(`! src/content/job-guide.json entries with no live job (renamed/paused?): ${stale.join(' | ')}`);
}
const { labels } = getLaunchd();
const now = new Date();
const verified = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

const data = {
  verified,
  systemName: 'Hermes',
  hermesVersion: getHermesVersion(),
  gateway: getGateway(agents.length),
  agents,
  agentCount: agents.length,
  crons,
  cronEnabledCount: enabledCount,
  cronDisabledCount: disabledCount,
  // Public slugs only: raw launchd labels (com.palmer.*, ai.hermes.*) stay off the site.
  macServices: labels.map((l) => l.replace(/^com\.palmer\./, '').replace(/^ai\.hermes\./, 'hermes-')),
  launchdCount: labels.length,
};

writeFileSync('src/content/hermes-live.json', `${JSON.stringify(data, null, 2)}\n`);

console.log('src/content/hermes-live.json written:');
console.log(`  profiles:      ${data.agentCount}`);
console.log(`  jobs enabled:  ${data.cronEnabledCount}  (paused/disabled, count only: ${data.cronDisabledCount})`);
console.log(`  LaunchAgents:  ${data.launchdCount}`);
console.log(`  gateway:       ${data.gateway.processes} process serving ${data.gateway.servedProfiles} profiles`);
console.log(`  hermes:        ${data.hermesVersion}`);
console.log(`  verified:      ${data.verified}`);
