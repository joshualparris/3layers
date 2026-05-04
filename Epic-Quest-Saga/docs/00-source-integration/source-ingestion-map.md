# Source Ingestion And Traceability Map

Purpose: ensure every critical statement in product, design, and engineering docs can be traced to a real source artifact.

## Mapping Table

| Knowledge Domain | Primary Source(s) | Current Destination Docs | Confidence |
|---|---|---|---|
| Three-layer model (L1/L2/L3) | `replit.md`, `initialState.ts` | `vision-and-pillars.md`, `game-design-document.md`, `technical-architecture.md` | High |
| Canon status taxonomy | `replit.md`, `initialState.ts` | `narrative-canon-bible.md`, `qa-test-strategy.md` | High |
| Campaign pause points and chronology | `SKT_Dubbo_Resume_Checkpoint_4_Handover.md`, `ClaudeHandover27042026.md`, `ChatGPThandover27042026.md` | `narrative-canon-bible.md`, `master-backlog.md` | High |
| Character and inventory state | `alfie-current-inventory.md`, `Alphie_Complete_Inventory.md`, `initialState.ts` | `game-design-document.md`, `narrative-canon-bible.md`, `qa-test-strategy.md` | High |
| Tactical and scenario constraints | `SKT_Dubbo_Resume_Checkpoint_4_Handover.md`, `ClaudeHandover27042026.md` | `game-design-document.md`, `risk-register.md` | Medium-High |
| Build/runtime setup | `progress.md`, root `package.json` | `technical-architecture.md`, `live-ops-and-release.md` | High |
| Full corpus inventory | `docs/repo/repository-inventory.md` | `source-index.md`, this file | High |
| PDF dossier details not yet transcribed | PDF files listed in repository inventory | Future extraction tickets in `master-backlog.md` | Medium |

## Ingestion Workflow

1. Add or update source files in `__Alfie Dnd`.
2. Re-run source inventory there (`scripts/build-repo-browser.ps1` in the upstream project).
3. Update this mapping table with any new source classes.
4. Create or update conversion tasks in `03-production/master-backlog.md`.
5. Validate app data schema implications in `02-engineering/technical-architecture.md`.

## Evidence Rules

- Any new canon, quest, or character fact must cite at least one source artifact.
- Conflicts between sources must be logged as `unresolved` until adjudicated.
- DM-private facts can exist in internal docs but must be tagged and protected from player-facing UI surfaces.
