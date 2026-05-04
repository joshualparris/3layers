# Game Design Document (GDD)

## Product Type

Single-user, frontend-first campaign continuity dashboard for a Storm King's Thunder table, with extensible architecture for future campaigns.

## Experience Goals

- Make continuity retrieval faster than table debate.
- Preserve tone, safety, and player agency in gameplay support tools.
- Support both narrative flow (notes/relationships) and tactical flow (quests/resources).

## Gameplay/Usage Loops

1. Pre-Session Loop
   - Review dashboard anchors.
   - Resolve open canon conflicts.
   - Confirm quest priorities and party resource states.
2. In-Session Loop
   - Track character/NPC/resource changes.
   - Add notes tagged by layer and canon status.
   - Progress quest tasks in real time.
3. Post-Session Loop
   - Promote temporary notes to canonical entries.
   - Reconcile unresolved contradictions.
   - Prepare next session checklist.

## Layer Model

- L1 (meta): facilitator constraints and style rules.
- L2 (table reality): player dynamics, scheduling, social context.
- L3 (in-world): campaign facts, quests, NPCs, tactical state.

Layer separation is a design requirement to prevent cross-layer contamination.

## Systems

- Canon Tagging System
  - `source-canon`, `table-canon`, `player-choice`, `inferred`, `unresolved`, `retconned`, `DM-private`.
- Quest System
  - Active/pending/resolved/failed states with atomic tasks.
- Character State System
  - Full stat blocks, resources, spell slots, equipment notes.
- Notes System
  - Layer-aware, taggable, canon-classified timeline notes.
- Special NPC Control System
  - Paired control assignments and survival-sensitive scenario outcomes.

## Rules And Constraints (Must Enforce)

- No unauthorized choices for player-controlled characters.
- Romance remains opt-in.
- No PvP.
- Ruleset disputes (2014 vs 2024) are explicit unresolved items until agreement.
- DM-private data remains protected from player-facing presentations.

## Content Priorities

1. Goldenfields transition and Miros delivery arc.
2. Build/ruleset resolution for Alphie.
3. Nightstone restitution and open obligations.
4. Campaign chronology integrity from checkpoints and handovers.

## UX Priorities

- One-screen "session start readiness" view.
- Fast filters by layer + canon status.
- Conflict indicators for unresolved items.
- High readability in dark theme and mobile fallback.
