# Live Ops And Release Management

## Release Goals

- Ship reliable continuity updates without canon regressions.
- Keep a predictable cadence for feature and lore/data updates.

## Environments

- Local dev: Windows + Chrome.
- Local production preview: static build served locally.
- Future (optional): hosted preview and production deployment.

## Release Cadence

- Patch: urgent correctness fixes (canon/rules/bug).
- Minor: feature and UX additions.
- Major: structural data model or workflow changes.

## Release Checklist

1. Update docs affected by changes.
2. Run typecheck/build.
3. Execute QA smoke and canon integrity checks.
4. Verify no DM-private leak paths.
5. Record release notes and migration notes.

## Incident Classes

- P0: data loss or canon corruption.
- P1: major feature unusable during session.
- P2: non-blocking incorrect display/state.
- P3: polish defects.

## Recovery Playbook

- Keep periodic exported snapshots of `continuity-state`.
- Maintain rollback-friendly release tags.
- For canon corruption:
  - freeze edits
  - restore latest clean snapshot
  - replay validated deltas only

## Observability (Current And Future)

- Current: manual validation and browser inspection.
- Future:
  - lightweight event audit log
  - schema migration telemetry
  - conflict detection metrics
