Original prompt: Help me test this app and get it working in Chrome with a double-click launcher, then upgrade it with source-faithful D&D continuity features and links to the Alfie DnD sub-apps.

# Progress

## 2026-05-04

- Fixed Chrome local-resource errors on the Sources page by replacing `file://` hrefs with safe localhost routes.
- Added `local_sources.json` as the manifest that maps source IDs and sub-app IDs to Josh's real local files.
- Updated `serve_epic_quest_saga.py` so `/source/<id>` serves local source documents and `/subapp/<id>/` serves local HTML sub-apps through `http://127.0.0.1:4173`.
- Updated `Launch Epic Quest Saga.cmd` to pass the manifest, check the source route properly, cache-bust the app URL, and restart stale Python servers on the app port.
- Hardened `vite.config.ts` with local defaults: `PORT=4173` and `BASE_PATH=/`.
- Fixed two `RulesIssue` seed rows that were missing required `options` arrays.
- Verified `pnpm --filter @workspace/continuity-app typecheck` passes.
- Verified `pnpm --filter @workspace/continuity-app build` passes.
- Verified `http://127.0.0.1:4173/sources`, `/source/upgrade-plan`, `/subapp/chatgpt-bookmark5/`, and generated CSS/JS assets return `200`.
- Ran the web-game Playwright browser check against `/sources`; screenshot rendered correctly and no browser console/page errors were recorded.
- Ran a targeted browser check: 34 anchors, 0 `file://` hrefs, source route contains `# Epic Quest Saga Upgrade Plan`, sub-app route returned `200`, and no console errors.

## Next TODO

- If a sub-app has its own internal `file://` links, convert those specific internal links to relative or proxied localhost routes too.
- Continue Sprint 1 by making the source ledger persisted app state with reviewed/imported flags.
- Add the Canon Facts page and expand from starter facts toward at least twenty structured provenance-backed canon facts.

## 2026-05-04 Vercel Prep

- Added Vercel deployment config at the repository root and inner app root.
- Added hosted-mode behavior for the Sources page so Vercel uses GitHub-backed links for repository files and marks PC-only archive/sub-app files as local-only.
- Verified hosted-mode locally with a non-local test hostname: no `file://`, `/source/`, or `/subapp/` links; no browser console errors.
