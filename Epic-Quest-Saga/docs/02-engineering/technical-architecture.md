# Technical Architecture

## Current Architecture

- Monorepo with root workspace scripts (`pnpm` + TypeScript).
- Primary product artifact: `artifacts/continuity-app` (React + Vite + TypeScript).
- Data persistence: browser `localStorage` using key `continuity-state`.
- Supporting artifacts include API and library packages, but continuity app currently operates frontend-only.

## Core Domain Model

Defined in `artifacts/continuity-app/src/data/initialState.ts`:

- `AppState`
- `Character`
- `SpecialNPC`
- `Quest`
- `Note`
- `L2State`
- `L3State`
- Canon and layer enums/types

## Data Principles

- Strong typing for all persisted state.
- Backward-compatible migrations for schema evolution.
- Canon metadata treated as required, not optional.
- Explicit unresolved state support to avoid silent corruption.

## Recommended Next Engineering Upgrades

1. Schema Versioning
   - Add `schemaVersion` at root state.
   - Implement migration utilities per version.
2. Import Pipeline
   - Build parser utilities for markdown handovers/inventory docs.
   - Produce normalized JSON import bundles.
3. Validation Layer
   - Runtime validators (zod or equivalent) before saving.
4. Canon Conflict Engine
   - Detect contradictory facts in quests/notes/character state.
5. Snapshot/Backup
   - Export and import local snapshots to avoid browser data loss.

## Integration Plan For Alfie Dnd Corpus

- Phase 1: maintain manual curated ingestion via docs and checklist.
- Phase 2: add scripted extractors from key markdown files.
- Phase 3: optional PDF extraction pipeline for character sheet parity checks.

## Non-Functional Requirements

- Fast local startup on Windows.
- Zero-network core functionality.
- Readable and maintainable TypeScript.
- Safe behavior under malformed imported content.
