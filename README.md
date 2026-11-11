# ACP Designs Studio

The public site at [acpdesigns.studio](https://www.acpdesigns.studio): Carson Palmer's
property-operations systems, the Hermes operating map, and the build-your-own playbook.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. `pnpm build` makes a production build; `pnpm lint` checks the code.

## Where things live

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Home page (renders `FieldManualPage`) |
| `src/app/systems/` | Operating map and the four playbook pages |
| `src/app/privacy/` | Privacy policy (also the Google OAuth app policy) |
| `src/components/field-manual/` | Page sections and their styles |
| `src/components/field-manual/FieldManual.module.css` | Design tokens (colors, type, spacing) and home-page styles |
| `src/content/` | Hermes lanes, jobs, and section copy |
| `scripts/gen-hermes-data.mjs` | Regenerates `src/content/hermes-live.json` from the live Hermes setup (run from the repo root) |
| `public/downloads/` | Starter-pack and vault-template zips linked from the playbook |

## Design system

Cream paper, charcoal ink, a signal-orange accent, blueprint blue, serif display headlines, and a faint blueprint grid on dark bands.
Every color and spacing value is a CSS variable on `.manual` in `FieldManual.module.css`;
dark bands flip the `--fg`, `--fg-muted`, `--rule`, and `--card` tokens instead of restyling children.

## Deploy

Hosted on Vercel (project `acpdesigns-studio`).
