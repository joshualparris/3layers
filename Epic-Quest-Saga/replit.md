# Three-Layer RPG Continuity Dashboard

A personal continuity tracker for Josh's Storm King's Thunder D&D campaign, built as a dark-themed React + Vite web app with localStorage persistence.

## What It Is

Keeps three nested storytelling layers cleanly separated so facts don't bleed between them:

- **L1 (OOG)** — Real Josh using Claude. Meta/direction layer.
- **L2 (OG Table)** — Simulated Dubbo table with Josh Parris, Marcus (DM), Ben, Talia, Naomi/Romi. Saturday 9 May 2026, 92 Lakeside Circuit.
- **L3 (In-Game)** — Storm King's Thunder campaign. Chapter 2, Goldenfields. Party asleep at Northfurrow's End after Alphie's apology to Wren.

## Architecture

**Frontend-only. No backend.** All state stored in `localStorage` under key `continuity-state`.

```
artifacts/continuity-app/
├── src/
│   ├── App.tsx                    # Routing + state wiring
│   ├── data/initialState.ts       # All seeded campaign data (types + defaults)
│   ├── hooks/useLocalStorage.ts   # Typed localStorage hook
│   ├── components/
│   │   ├── Layout.tsx             # Sidebar nav + layer selector header
│   │   └── CanonBadge.tsx         # Canon status badge component
│   └── pages/
│       ├── Dashboard.tsx          # Overview — all three layer anchors at a glance
│       ├── L2Table.tsx            # OG Table layer — Josh Parris state, table members, relationships
│       ├── L3InGame.tsx           # In-Game layer — campaign anchor, active quest, NPC mechanic
│       ├── Characters.tsx         # Full character sheets + editable resources (HP, slots, etc.)
│       ├── Notes.tsx              # Notes & canon log — filterable, taggable, addable
│       └── Quests.tsx             # Quest tracker — active/pending/resolved, task checkboxes
```

## Stack

- React 18 + Vite 7 (TypeScript)
- Tailwind CSS v4 with custom dark theme (deep slate/amber/parchment)
- Wouter for routing
- Lucide React for icons
- localStorage for all persistence (no backend)
- Runs on port 23835 (mapped to externalPort 3000)

## Data Model

`AppState` (in `src/data/initialState.ts`):
- `activeLayer: "L1" | "L2" | "L3"` — current layer selector state
- `characters: Character[]` — 4 PCs (Alphie, Wren, Dorrin, Kella) with full stat blocks + editable resources
- `specialNPCs: SpecialNPC[]` — 4 Chapter 2 NPCs (Lifferlas, Miros, Oren, Zi Liang) with editable HP
- `quests: Quest[]` — active/pending quests with task checklists and canon status
- `notes: Note[]` — canon log entries tagged by layer and canon status
- `l2: L2State` — OG table anchor, schedule, members, relationships, house notes
- `l3: L3State` — campaign anchor, chapter, location, attack toggle, active quest, session notes

## Canon Status System

Every note and quest has a canon status tag:
`source-canon` | `table-canon` | `player-choice` | `inferred` | `unresolved` | `retconned` | `DM-private`

DM-private items (e.g. Shalvus Martholio) show a lock indicator.

## Key Campaign Facts Seeded

- Party: Alphie (Josh, Wizard 5 Divination), Wren (Talia, Bard 5 Lore), Dorrin (Ben, Cleric 5 Life), Kella (Naomi, Rogue 5 Thief)
- Chapter 2 special NPC assignments: Josh→Lifferlas, Ben→Miros, Talia→Oren, Naomi→Zi Liang
- Active quest: Deliver news of Lathan & Melantha Xelbrin's death to Miros; deliver Rillix
- Moral framing: "The boy deserves a clean hour to grieve before the world makes him do anything else."
- Giant attack: NOT yet started (toggleable)
- Romi romantic thread: L2, unresolved
- Alphie's 2014 vs 2024 build: unresolved, must resolve before combat

## Rules Enforced by Design

- No choices made for Josh's or any other player's characters
- Romance is opt-in only
- No PvP
- 2014 D&D 5e RAW unless Marcus and Josh agree to convert
- Safety word: "Pause"
- Style correction: "less prestige drama mode please"

## Compatibility

Works on Windows Chrome and Android Chrome. Responsive layout with mobile sidebar overlay.
