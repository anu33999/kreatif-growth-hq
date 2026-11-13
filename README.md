# Kreatif Atelier Growth HQ

The Content, Creative & Client Growth Operating System — one internal web app for planning, producing,
publishing and measuring content on Instagram, LinkedIn, Facebook and YouTube, running lead generation, and
researching the Asha NGO.

React 19 + TypeScript + Vite. Data lives in the browser's IndexedDB (via Dexie). No server, no API keys.

## Run

```bash
npm install
npm run dev        # http://localhost:5320
npm run build      # static site in dist/
npm run preview    # serve dist/ on http://localhost:5321
```

## Where things are

| Path | What |
| --- | --- |
| `src/lib/types.ts` | Record types (master ideas, platform posts, assets, leads, campaigns, research, NGO facts) |
| `src/lib/db.ts` | IndexedDB schema, backup/restore, CSV helpers |
| `src/lib/workflow.ts` | Checklists, completion gating, adaptation scaffolds, Guide-me steps |
| `src/content/` | Reference content: platform guides, tools research, learning modules, templates, help |
| `src/seed/` | Starter data loaded on first run (50 ideas, 31-post launch plan, strategy, NGO candidates, templates) |
| `src/pages/` | One file per section |

## Data and deployment

- Each browser has its own data. Use Help → Backup & restore weekly.
- The built site contains strategy text, so deploy it behind access control (Help → Launch & deploy explains
  Cloudflare Pages + Cloudflare Access). The in-app passcode is a privacy screen, not security.
- Not built in: AI generation, auto-publishing, analytics sync, cloud sync. See Help → What's built / not built.

Tool prices and platform specs were researched on 2026-10-28 and carry confidence levels; confirm on official pages.
