# QA And Test Strategy

## Quality Objectives

- Preserve narrative and canon integrity.
- Prevent regressions in session-critical workflows.
- Protect safety and privacy constraints (especially DM-private).

## Test Layers

1. Type Safety
   - Strict TypeScript checks on all app packages.
2. Unit Tests (target additions)
   - Canon status logic.
   - Conflict detection.
   - Import parsing and normalization.
3. Integration Tests
   - localStorage load/save lifecycle.
   - migration compatibility across schema versions.
4. Scenario Tests
   - Session start flow with unresolved items.
   - Quest progression and note tagging.
5. Regression Tests
   - Known canon-critical cases from checkpoint docs.

## Canon Integrity Test Cases

- Conflicting build states must remain unresolved until manual adjudication.
- DM-private notes must never appear in player-safe surfaces.
- Layer mismatches must be flagged.
- Quest status transitions must not erase canonical notes.

## Data Reliability Test Cases

- Corrupted local state handling and safe recovery.
- Backward compatibility after schema changes.
- Import failures should degrade gracefully with clear errors.

## Manual QA Checklist (Per Release)

- [ ] Open app and verify all pages render.
- [ ] Verify characters, quests, notes are loaded and editable.
- [ ] Verify filters by layer and canon status.
- [ ] Verify unresolved items are visible.
- [ ] Verify DM-private protection behavior.
- [ ] Verify build and production preview.
