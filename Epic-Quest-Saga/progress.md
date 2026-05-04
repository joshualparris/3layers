Original prompt: Help me test this app please -C:\Users\joshua.parris\Downloads\Epic-Quest-Saga.zip

Get it working in a web browser on my pc in chrome, make me a file i can double click and it launches this app / game please

2026-05-04:
- Confirmed the zip extracted into C:\Users\joshua.parris\Downloads\Epic-Quest-Saga\Epic-Quest-Saga.
- Found the actual app files were missing from the working tree even though the repo metadata and docs reference a frontend app under artifacts/continuity-app.
- Verified the embedded Git history still contains the missing tracked files, so the next step is to restore them and boot the app locally.
- Restored the frontend workspace folders from the bundled Git snapshot so the app source is present again.
- Patched the root setup for Windows by replacing the Unix-only `sh` preinstall hook and allowing Windows native package variants in `pnpm-workspace.yaml`.
- Rebuilt dependencies from a fresh Windows-specific pnpm store after the archived `node_modules` proved incomplete.
- Confirmed the continuity app now produces a successful production build; cleaned up one remaining shared-type mismatch (`equipment` should be `string`, matching the UI and seeded data).
- Verified the built app serves successfully at http://127.0.0.1:4173/ and renders correctly in Chrome.
- Added a double-click launcher at C:\Users\joshua.parris\Downloads\Epic-Quest-Saga\Launch Epic Quest Saga.cmd that starts a local static server and opens Chrome automatically.
- Started the upgrade roadmap by adding a Sources page, static source ledger, sub-app links, and canon fact starters.
- Replaced the launcher's plain Python static server with a small SPA-aware local server so routes such as /sources work directly and on refresh.
- Implemented low-effort/high-impact UX upgrades:
  - Dashboard now has a Session Readiness panel with blockers (unresolved quests/notes), pending quest count, and low HP party count.
  - Quest Tracker now includes one-click "Complete all" and "Sync status" actions per quest.
  - Notes now has an "Open canon only" quick toggle (unresolved + inferred focus).
- Verified TypeScript typecheck passed.
- Verified production build passes when required env vars are provided (PORT and BASE_PATH).
- Could not run the skill Playwright client due missing resolvable `playwright` package in this workspace environment; `npx playwright --version` is available but direct script import failed.
- Fixed Sources page local file access errors by removing `file:///` link attempts and replacing them with "Copy Path" actions.
- Hardened local static server cache behavior (`serve_epic_quest_saga.py`) to disable stale cache that can cause hashed CSS/JS 404 after rebuilds.
- Updated launcher URL to include a cache-busting query parameter each launch.
- Rebuilt continuity app successfully after fixes (new assets include `index-ImPrxBl0.js`).
- Implemented persistence hardening backlog:
  - Added `schemaVersion` to `AppState` and seeded `INITIAL_STATE`.
  - Added migration pipeline (`src/data/migrations.ts`) and wired it into localStorage hydration.
  - Added backup export/import controls in header for `continuity-state`.
- Implemented additional P1 backlog pages:
  - New `Session Readiness` page (`/session-readiness`).
  - New `Canon Audit` page (`/canon-audit`) with layer/status filters across quests, notes, and canon facts.
- Updated `docs/03-production/master-backlog.md` checkboxes for all completed items above.
