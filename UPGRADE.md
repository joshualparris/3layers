# Epic Quest Saga Upgrade Plan

## Purpose

This document proposes a faithful, high-impact upgrade path for the Epic Quest Saga continuity app at:

`C:\Users\joshua.parris\Downloads\Epic-Quest-Saga`

The goal is not to turn the app into a generic fantasy dashboard. The strongest version of this app is a living continuity tool for Josh's Alfie/Alphie D&D material: strict about source truth, generous with table-specific meaning, and practical enough to use before and during play.

## Source Material Reviewed

Primary source folders and files checked:

- `C:\Users\joshua.parris\OneDrive - Dubbo Christian School\Documents\03_Projects\__Alfie Dnd`
- `Alphie_Complete_Inventory.md`
- `ChatGPThandover27042026.md`
- `ClaudeHandover27042026.md`
- `docs\Checkpoints\SKT_Dubbo_Resume_Checkpoint_4_Handover.md`
- `chatGPT\Alfie_DnD_Website_Upgraded_Bookmark5\__Alfie Dnd\CURRENT_STATE.md`
- `chatGPT\Alfie_DnD_Website_Upgraded_Bookmark5\__Alfie Dnd\WEBSITE_README.md`
- `chatGPT\Alfie_DnD_Website_V3_Chapter2_Goldenfields\Alfie Dnd\CURRENT_STATE.md`
- `chatGPT\Alfie_DnD_Website_V3_Chapter2_Goldenfields\Alfie Dnd\VERSION_3_CHANGELOG.md`
- `C:\Users\joshua.parris\Downloads\Epic-Quest-Saga\Epic-Quest-Saga\attached_assets\Three_Layer_Continuity_Handover_MASTER_(1)_(1)_1777889813316.pdf`
- Current app seed data in `artifacts\continuity-app\src\data\initialState.ts`

Important context:

- The older Alfie source archive contains Bookmark 4 and Bookmark 5 material around Nightstone, Rillix, Goldenfields being chosen, and the 2014 vs 2024 rules conflict.
- The current Epic Quest Saga app has already advanced to the later three-layer continuity state: L2 Saturday 9 May 2026 at 92 Lakeside Circuit, and L3 late night at Northfurrow's End, Goldenfields, after Alphie's apology to Wren.
- The app currently acts as a frontend-only React/Vite continuity dashboard with `localStorage` persistence.

## Fidelity Standard

For this project, "100 percent faithful" should mean:

- Every important fact has a visible provenance: source document, bookmark, layer, canon status, and whether it is player-facing or DM-private.
- Official adventure material is treated as the source of record for L3, but the app should summarize and reference it rather than reproduce full copyrighted text, maps, room text, or stat blocks.
- Table-canon additions are first-class, but they must never overwrite source-canon silently.
- Contradictions stay visible until resolved. The biggest example is the 2014 Divination Wizard continuity versus the 2024 Evocation D&D Beyond sheet.
- L1, L2, and L3 facts never bleed together. A social fact in L2 should not become an in-game truth, and an in-game romance beat should not create an L2 obligation.
- Josh/Alphie agency is protected. The app can recommend, warn, and track, but it must not decide Josh's character choices or other players' choices.
- DM-private information must be gated, hidden from player-facing views, and never exposed in generated summaries unless explicitly requested.
- Safety and tone rules are preserved: "Pause" stops the scene, no PvP, romance is opt-in, Marcus's voice stays calm and practical, and the tone stays serious without becoming grim.

## Current App Baseline

The current app already has a strong foundation:

- Three-layer model: L1 OOG, L2 OG Table, L3 In-Game.
- Canon statuses: `source-canon`, `table-canon`, `player-choice`, `inferred`, `unresolved`, `retconned`, `DM-private`.
- Seeded characters, special NPCs, quests, and canon notes.
- Editable resources for PCs and special NPCs.
- Quest checklist tracking.
- Notes and canon log.
- Local-only storage, which is good for privacy and fast iteration.

Main limitation:

- The app has hand-entered seed data, but it does not yet have a disciplined source-ingestion, provenance, contradiction, or session-resume workflow. That is where the biggest upgrade value lives.

## Five Highest-Impact Features

### 1. Canon Source Ledger and Import Queue

Build a structured source ledger that lets the app track where every fact came from.

What it adds:

- A "Sources" page listing PDFs, Markdown files, DOCX files, screenshots, character sheets, and app-imported notes.
- Fact cards with fields for `layer`, `canonStatus`, `sourcePath`, `bookmark`, `pageOrSection`, `confidence`, `playerFacing`, and `lastReviewed`.
- An import queue where a new handover can be reviewed before it changes live continuity.
- A "promote to canon" action for approved facts.
- A "mark unresolved" action for conflicts.

Why it is high impact:

- It is the backbone for being faithful. The user can always ask, "Where did this come from?"
- It prevents accidental drift when multiple handovers disagree.
- It makes future upgrades safer because content becomes data, not scattered prose.

Implementation notes:

- Add types such as `SourceDocument`, `CanonFact`, `CanonConflict`, and `ImportBatch`.
- Store reviewed facts separately from raw imported notes.
- Keep raw documents outside the app bundle where possible, and store references plus curated summaries.
- Start with Markdown and manually curated PDF extracts. Full automatic PDF parsing can come later.

Bang for buck:

- Very high impact.
- Medium implementation effort.
- Best first major upgrade.

### 2. Bookmark Timeline and Continuity Diff

Create a timeline that can move through Bookmark 4, Bookmark 5, Bookmark 6, Bookmark 8, Bookmark 9, and later sessions without losing the path between them.

What it adds:

- A chronological "Bookmarks" page.
- Snapshot cards for each checkpoint: current location, party level, active quests, unresolved issues, resources, relationships, and DM-private flags.
- A diff view that shows what changed between two bookmarks.
- A conflict panel for contradictions such as level, spell slots, subclass, current location, party roster, and resource state.
- A "current live state" selector that explains why the app is presently anchored at Goldenfields rather than the older Nightstone checkpoint.

Why it is high impact:

- The source archive has older states, while the current app is later. A timeline keeps both true without confusion.
- It makes resuming the campaign much easier because you can see exactly how the table got here.
- It gives meaning to consequence: promises, debts, wounds, relationships, and choices can carry forward.

Implementation notes:

- Add a `TimelineEvent` model with date/time, layer, location, source, summary, affected entities, and consequence links.
- Add `StateSnapshot` records for major bookmarks.
- Let current app state reference a snapshot ID plus local edits.
- Use migrations so existing `localStorage` saves remain usable.

Bang for buck:

- Very high impact.
- Medium implementation effort.
- Best second upgrade after the source ledger.

### 3. Rules and Character Reconciliation Center

Build a focused rules audit screen for the campaign's most dangerous mechanical conflicts.

What it adds:

- A dedicated "Rules Audit" page.
- A 2014 vs 2024 Alfie/Alphie build comparison.
- Character-sheet version tracking for Alphie, Wren, Dorrin, and Kella.
- Resource validation for spell slots, cantrips, HP, class features, and rest state.
- A "must resolve before combat" queue.
- A signed-off ruling field: who decided, when, and whether it is source-canon, table-canon, or player-choice.

Why it is high impact:

- The source material repeatedly flags the 2014 Divination vs 2024 Evocation issue as a hard blocker.
- A wrong build infects combat, resources, prepared spells, and character identity.
- This feature improves play immediately because it prevents table time from being eaten by avoidable confusion.

Implementation notes:

- Do not try to clone D&D Beyond first. Begin with manual structured fields and import references.
- Add `RulesIssue`, `Ruling`, `CharacterSheetVersion`, and `ResourceSnapshot` types.
- Show clear warnings but do not auto-convert the character.
- Make the 2014 build the default continuity until Marcus and Josh explicitly choose otherwise.

Bang for buck:

- High impact.
- Low to medium implementation effort.
- Best mechanical upgrade.

### 4. Goldenfields Session Command Center

Build a practical, table-ready Goldenfields prep and session screen.

What it adds:

- Player-safe and DM-private tabs.
- Current scene anchor: Northfurrow's End, late night, post-apology, attack not begun.
- Miros/Rillix delivery tracker with emotional beats, not just task checkboxes.
- Special NPC tracker for Lifferlas, Miros, Oren, and Zi Liang.
- Initiative pairing: each special NPC acts after the paired player's PC.
- Goldenfields defence objectives with status, risks, and consequences.
- Shalvus/Naxene handling as DM-gated material.

Why it is high impact:

- The current app is already at Goldenfields. This is the next playable content surface.
- It gives Josh fast situational awareness without spoiling DM-only material.
- It supports the special NPC mechanic, which is one of Chapter 2's biggest table-facing systems.

Implementation notes:

- Avoid reproducing official room text or maps. Use short table summaries and source references.
- Build around objectives, NPC survival, faction reactions, and consequences.
- Add a "start attack" state transition that snapshots pre-attack conditions.
- Add a "session mode" layout with large, readable active items.

Bang for buck:

- Very high impact.
- Medium implementation effort.
- Best play-session upgrade.

### 5. Consequence Web: Promises, Debts, Relationships, and Threads

Create a relationship and consequence graph that tracks what choices mean later.

What it adds:

- A linked web of promises, debts, loyalties, unresolved emotional threads, and faction standings.
- Records for Nightstone horse restitution, Morak's Potion of Heroism, Kella's party terms, Rillix/Miros, Zephyros correspondence, Wren/Alphie slow-burn boundaries, Dorrin's blessing, Romi's L2 thread, and Shalvus DM-private risk.
- Each thread has owner, layer, status, stakes, next trigger, and possible consequences.
- "Do not forget" prompts before a session.
- Optional "what changes if resolved this way?" planning notes.

Why it is high impact:

- The campaign's strength is not just plot; it is remembered consequence.
- This feature turns the app from a static reference into a continuity conscience.
- It protects the moral texture of the campaign: oaths, costs, restraint, grief, trust, and recovery.

Implementation notes:

- Add `ConsequenceThread`, `RelationshipThread`, `Promise`, and `FactionStanding`.
- Let quests link to threads, characters, notes, and timeline events.
- Add filters by layer, urgency, privacy, and next session relevance.
- Keep suggestions as prompts, never forced outcomes.

Bang for buck:

- High impact.
- Medium implementation effort.
- Best narrative upgrade.

## Recommended Build Order

1. Canon Source Ledger and Import Queue.
2. Bookmark Timeline and Continuity Diff.
3. Rules and Character Reconciliation Center.
4. Goldenfields Session Command Center.
5. Consequence Web.

Reasoning:

- Source fidelity comes first.
- Timeline comes second because it explains why older and newer facts can both exist.
- Rules audit comes third because it blocks combat readiness.
- Goldenfields command mode comes fourth because it converts the data into table utility.
- Consequence web comes fifth because it becomes more powerful once facts, snapshots, and rules are stable.

## Data Model Additions

Suggested new core types:

```ts
type SourceKind = "markdown" | "pdf" | "docx" | "image" | "character-sheet" | "manual-note";

interface SourceDocument {
  id: string;
  title: string;
  kind: SourceKind;
  path: string;
  importedAt: string;
  layerScope: Layer[];
  notes: string;
}

interface CanonFact {
  id: string;
  title: string;
  summary: string;
  layer: Layer;
  canonStatus: CanonStatus;
  sourceIds: string[];
  bookmark?: string;
  playerFacing: boolean;
  confidence: "confirmed" | "likely" | "unresolved";
  affectedEntities: string[];
}

interface TimelineEvent {
  id: string;
  layer: Layer;
  bookmark?: string;
  title: string;
  summary: string;
  occurredAtLabel: string;
  sourceIds: string[];
  consequenceThreadIds: string[];
}

interface RulesIssue {
  id: string;
  title: string;
  severity: "blocker" | "warning" | "note";
  status: "open" | "ruled" | "retconned";
  summary: string;
  options: string[];
  ruling?: string;
  sourceIds: string[];
}

interface ConsequenceThread {
  id: string;
  title: string;
  layer: Layer;
  status: "active" | "resolved" | "dormant" | "blocked";
  stakes: string;
  nextTrigger: string;
  linkedCharacterIds: string[];
  linkedQuestIds: string[];
  sourceIds: string[];
}
```

## Faithful Content Rules for Future Development

- Use `Alphie J. Roane` for the in-game character unless a source explicitly uses `Alfie` as an alias or file naming convention.
- Treat `Storm King's Thunder` as the L3 sourcebook of record, but keep official material as references and summaries.
- Treat handovers as table-canon unless they quote or summarize sourcebook facts.
- Never hide conflicts by picking whichever fact is newest.
- Preserve the exact current live anchor: L3 is late night at Northfurrow's End, Goldenfields, after the apology to Wren, with the attack not begun.
- Preserve the older bookmarks as history, not as the current state.
- Keep Rillix alive and attached to Wren unless later table events change that.
- Keep the Miros news-delivery quest emotionally structured: Wren leads, Alphie supports quietly, and Miros gets a clean hour to grieve.
- Keep Kella's party terms explicit. Do not turn her into either instant family or inevitable betrayal.
- Keep L2 romance and L3 romance separate. Both can matter, but they are not the same layer.

## What Not To Build First

- Do not build a full virtual tabletop before the continuity foundations are solid.
- Do not add AI auto-DM output that can mutate canon without review.
- Do not attempt full D&D Beyond syncing before the 2014 vs 2024 rules decision is resolved.
- Do not paste official adventure text, full maps, or full stat blocks into the app.
- Do not turn DM-private material into normal searchable player-facing notes.
- Do not over-focus on visual polish before the source ledger, timeline, and rules audit exist.

## Definition of Done for the First Upgrade Sprint

The first sprint should be considered successful when:

- `UPGRADE.md` is committed to the project folder.
- The app has a Sources page with at least five source records from the Alfie DnD folder and attached assets.
- At least twenty canon facts are represented as structured records with source links.
- The current live state clearly explains that older Bookmark 4/5 content is historical and the app is now anchored later at Goldenfields.
- The 2014 vs 2024 rules conflict is visible as a blocker.
- DM-private facts can be hidden from player-facing views.
- Existing localStorage data still loads after migration.

## Best Next Step

Start with a small vertical slice:

1. Add source and fact types.
2. Seed five source documents.
3. Seed ten critical canon facts.
4. Build a simple Sources page and a Canon Facts page.
5. Add one conflict card for the 2014 Divination vs 2024 Evocation issue.
6. Add an export/import JSON button so the continuity can be backed up before larger changes.

This gives the app a faithful spine. Once that spine exists, the Goldenfields command center and consequence web will have something trustworthy to stand on.

## Sprint 1 Progress

Started on 2026-05-04.

Implemented first slice:

- Added a first-class Sources page to the React app.
- Added localhost-served Open links and Copy Path buttons for discovered local HTML sub apps, including the root Alfie DnD dashboard, Gemini variants, Claude variants, ChatGPT Bookmark 5, and ChatGPT Goldenfields v3.
- Added a starter source ledger for the upgrade plan, master three-layer handover, Bookmark 6/8 PDFs, Bookmark 5 current state, Goldenfields v3 current state, Checkpoint 4, inventory, and older handovers.
- Added canon fact starters for the current L3 anchor, layer separation, 2014 vs 2024 build conflict, Rillix delivery, Miros news delivery, Kella terms, Goldenfields special NPCs, and Shalvus DM-private gating.
- Fixed Chrome's blocked `file://` local-resource errors by routing source documents and sub apps through the local Python server (`/source/<id>` and `/subapp/<id>/`).
- Rebuilt and verified the launcher with the fresh production assets and no browser console errors on the Sources page.

Next practical continuation:

- Convert the static source ledger into persisted app state with reviewed/imported flags.
- Add backup/export JSON before changing the existing continuity data model.
