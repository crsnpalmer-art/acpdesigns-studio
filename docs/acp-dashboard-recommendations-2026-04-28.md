# ACP Designs Studio dashboard recommendations

Date: 2026-04-28
Lens: personal operating dashboard for Carson and trusted collaborators — not an agency, portfolio, showcase, or conversion site.

## Verdict

OK / WATCH. The current site already contains useful operating context: active products, property operations, automation, private tenant tooling, and live links. The main risk is framing drift: several sections still read like an external product-studio homepage instead of a personal command center for current work, priorities, status, roadmap, and trusted-collaborator orientation.

## Corrected top 5 improvements

1. **Replace external studio positioning with dashboard framing.**
   - Current language: “Independent product studio,” “One studio,” “Work with ACP Designs Studio,” and “Need a sharper internal system…” implies an agency/showcase surface.
   - Recommended dashboard language: “Carson’s operating dashboard,” “Current work,” “Systems, products, properties, and experiments,” “For Carson + trusted collaborators.”

2. **Add a persistent status layer to every project.**
   - Add fields such as `priority`, `phase`, `owner`, `lastUpdated`, `nextMilestone`, `blockers`, `visibility`, and `trustedCollaboratorNotes`.
   - Existing `status` labels are useful but too broad: “Active builds,” “Live brand,” and “Open-source app” do not tell Carson what needs attention next.

3. **Create a Focus / Now view above the project cards.**
   - Show 3–5 current focus items across all domains.
   - Each item should answer: what matters now, why it matters, next action, due/target date, and confidence/risk.
   - This would make the homepage useful in 15 seconds instead of requiring a scan through every card.

4. **Add changelog / logbook / roadmap sections.**
   - Changelog: recent shipped changes, decisions, fixes, launches.
   - Logbook: dated notes from real operating work, including property ops and automation incidents.
   - Roadmap: Now / Next / Later by domain, with WIP limits.
   - This turns the site from a static catalog into a living operating memory.

5. **Clarify private/public boundaries.**
   - Some items are public products, some are private tenant systems, some are internal automation, and some are trusted-collaborator-visible only.
   - Add clear visibility badges: `Public`, `Trusted`, `Private`, `Tenant-only`, `Internal-only`.
   - Avoid leaking operational internals while still giving Carson and collaborators enough orientation.

## Suggested information architecture

### 1. Home / Command Center

Purpose: the default dashboard.

Recommended modules:
- Current focus: 3–5 active priorities
- Today / this week: near-term operational items
- At risk / blocked: items needing intervention
- Recent changes: last 5 logbook entries
- Quick filters: Properties, Automation, Apps, Personal systems, Tenant tools, Public, Private, Trusted

### 2. Workstreams

Purpose: domain-level tracking.

Suggested domains:
- Property Operations
- Workflow Automation / OpenClaw
- Transfer Portal
- HabitForge
- KnowYourHome
- TodoToNotes
- Palmer Construction / property web surfaces
- Experiments / parked ideas

Each workstream should include:
- Priority: P0/P1/P2/Parked
- Phase: Operating / Building / Maintenance / Paused / Archived
- Status: On track / Watch / Blocked
- Next action
- Owner / collaborator
- Links
- Visibility
- Last updated

### 3. Roadmap

Purpose: planning without pretending everything is equally active.

Structure:
- Now: committed current work
- Next: queued but not active
- Later: possible future work
- Parked: intentionally not being worked
- Done: completed milestones

### 4. Logbook / Changelog

Purpose: preserve decisions and operating history.

Entry format:
- Date
- Domain
- Type: shipped / decision / incident / note / blocked / maintenance
- Summary
- Links / artifacts
- Follow-up

### 5. Directory / Links

Purpose: trusted collaborator orientation.

Group links by:
- Public sites
- Internal dashboards
- Repos
- App Store / product surfaces
- Property sites
- Automation maps
- Docs / runbooks

### 6. Search + Filters

Purpose: make the dashboard useful once it grows.

Recommended filters:
- Domain
- Priority
- Phase
- Visibility
- Status
- Owner/collaborator
- Last updated
- Needs attention

## Quick wins

1. Rename the footer/contact section to something dashboard-native.
   - Replace “Work with ACP Designs Studio” with “Trusted collaborator access” or “Dashboard notes.”
   - Replace “Email the studio” with “Contact Carson” only if this remains public.

2. Add lightweight badges to project cards.
   - Example: `P1`, `Building`, `Trusted`, `Last updated Apr 28`, `Next: finish tenant guide content`.

3. Add a small “Current focus” block before the cards.
   - This is likely the highest-value change for Carson’s actual use.

4. Add data objects instead of hardcoded prose-only cards.
   - Extend `Project` in `src/app/home-client.tsx` with `priority`, `phase`, `visibility`, `lastUpdated`, `nextAction`, `roadmap`, and `links`.

5. Split public-safe vs trusted-only copy.
   - Keep public pages broad.
   - Add optional trusted-collaborator sections later behind auth or a private route if sensitive operational details are needed.

6. Update metadata away from “product studio” language.
   - Current metadata and JSON-LD still position ACP Designs as a public studio/organization.
   - If this is intended as a dashboard, metadata should be more neutral and less acquisition/collaboration-oriented.

## Notes from current implementation

- Project is a Next.js app with most content centralized in `src/app/home-client.tsx`.
- Current tab/query-param system is useful for deep-linking domains and should be kept.
- Current project cards already provide a foundation for a dashboard but need operating fields, not more marketing copy.
- Current live site includes agency/conversion-adjacent language in the footer and hero framing; that should be removed or softened.
- KnowYourHome already correctly signals tenant-only/private boundaries; replicate that clarity across every workstream.
- The README is still default create-next-app boilerplate; replace it with project purpose, local dev commands, content model, deployment notes, and dashboard/privacy rules.

## Non-goals / avoid

- Case studies
- Testimonials
- Client logos
- Engagement types
- Agency positioning
- Portfolio conversion flows
- “Hire us” copy
- Long polished product narratives that hide WIP state

## Recommended first implementation pass

1. Add a typed `workstreams` data model in `home-client.tsx` or a separate `src/data/workstreams.ts`.
2. Add `CurrentFocus`, `WorkstreamCard`, `Roadmap`, and `Logbook` components.
3. Replace footer CTA with trusted-collaborator/dashboard context.
4. Add filtering UI for domain/status/visibility.
5. Replace README with dashboard maintenance instructions.

