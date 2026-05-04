import type { Layer } from "./initialState";

export interface TimelineSnapshot {
  id: string;
  bookmark: string;
  label: string;
  description: string;
  occurredAt: string;
  layer: Layer;
  location: string;
  partyLevel: number;
  activeQuests: string[];
  keyEvents: string[];
  unresolved: string[];
  sourceId?: string;
}

export const TIMELINE_SNAPSHOTS: TimelineSnapshot[] = [
  {
    id: "snapshot-bookmark5-nightstone",
    bookmark: "Bookmark 5",
    label: "Nightstone Recovery",
    description: "Party defeated Xolkin's raiders. Villagers rescued. Rillix secured. Kella joined. Party prepares to leave for Goldenfields.",
    occurredAt: "Chapter 1, late day",
    layer: "L3",
    location: "Nightstone",
    partyLevel: 5,
    activeQuests: ["Deliver Rillix to Miros", "Recover the nightstone"],
    keyEvents: [
      "Xolkin negotiations (temporary alliance)",
      "Ear Seekers defence",
      "Dripping Caves rescue",
      "Kella joins under terms",
    ],
    unresolved: ["Nightstone stone location", "Xolkin follow-up"],
    sourceId: "bookmark5-current-state",
  },
  {
    id: "snapshot-bookmark6-travel",
    bookmark: "Bookmark 6",
    label: "Zephyros Tower Transit",
    description: "72 hours in tower floating 1,000 feet. Party learns Levitate. Alphie admitted feelings to Wren. Zephyros hospitality established.",
    occurredAt: "Chapter 1 → Chapter 2 transition",
    layer: "L3",
    location: "Tower of Zephyros",
    partyLevel: 5,
    activeQuests: ["Deliver Rillix to Miros", "Reach Goldenfields"],
    keyEvents: [
      "Alphie learns Levitate from Zephyros",
      "Alphie's poem to Wren",
      "Dorrin's blessing for slow pursuit",
      "Zephyros gift: hospitality notebook",
    ],
    unresolved: ["Alphie-Wren romantic progression", "Zephyros correspondence promise"],
    sourceId: "bookmark6",
  },
  {
    id: "snapshot-bookmark8-goldenfields",
    bookmark: "Bookmark 8",
    label: "Goldenfields Arrival",
    description: "Party arrives at Goldenfields. Meets Altheryax. Prepares for defence. Special NPC assignments confirmed. Attack imminent.",
    occurredAt: "Chapter 2, morning",
    layer: "L3",
    location: "Goldenfields",
    partyLevel: 5,
    activeQuests: [
      "Deliver Rillix to Miros",
      "Defend Goldenfields",
      "Locate Shalvus Martholio",
    ],
    keyEvents: [
      "Party meets Altheryax",
      "Special NPC pairings: Josh→Lifferlas, Ben→Miros, Talia→Oren, Naomi→Zi Liang",
      "Goldenfields defences reviewed",
      "Attack orders from giants incoming",
    ],
    unresolved: ["Shalvus traitor status", "Giant attack timing", "Miros grief delivery"],
    sourceId: "bookmark8",
  },
  {
    id: "snapshot-current-northfurrow",
    bookmark: "Current Live",
    label: "Northfurrow's End — Post-Apology",
    description: "Party sleeping at Northfurrow's End after Alphie's apology to Wren. Giant attack not yet begun. Miros delivery quest ready to begin.",
    occurredAt: "Chapter 2, late night",
    layer: "L3",
    location: "Northfurrow's End, Goldenfields",
    partyLevel: 5,
    activeQuests: [
      "Deliver Rillix to Miros (urgent)",
      "Defend Goldenfields",
    ],
    keyEvents: [
      "Alphie publicly apologized to Wren (after first encounter)",
      "Party secured rest at Northfurrow's End",
      "Wren and Rillix secure",
      "Miros news delivery ready after rest",
    ],
    unresolved: [
      "2014 vs 2024 build conflict (must resolve before combat)",
      "Giant attack start condition",
      "Shalvus traitor status",
    ],
  },
];

export interface ContinuityConflict {
  id: string;
  title: string;
  severity: "blocker" | "warning" | "note";
  description: string;
  affectedSnapshots: string[];
  resolution?: string;
  notes: string;
}

export const CONTINUITY_CONFLICTS: ContinuityConflict[] = [
  {
    id: "conflict-build-2014-2024",
    title: "2014 vs 2024 Alphie Build",
    severity: "blocker",
    description:
      "Table continuity runs strict 2014 D&D 5e Divination Wizard. Josh's D&D Beyond shows 2024 Evocation Wizard. Build difference affects spell selection, proficiencies, and combat readiness.",
    affectedSnapshots: [
      "snapshot-bookmark5-nightstone",
      "snapshot-bookmark6-travel",
      "snapshot-bookmark8-goldenfields",
      "snapshot-current-northfurrow",
    ],
    notes: "Must be locked before Tower of Zephyros leads into Chapter 2 combat. Marcus and Josh need to agree: 2014 Divination, 2024 Evocation, or deliberate conversion mid-campaign.",
  },
  {
    id: "conflict-shalvus-traitor",
    title: "Shalvus Traitor Status (DM-Private)",
    severity: "warning",
    description: "Shalvus Martholio suspected traitor. DM-private information not revealed to players. Marcus to handle implementation.",
    affectedSnapshots: [
      "snapshot-bookmark8-goldenfields",
      "snapshot-current-northfurrow",
    ],
    notes: "Do not reveal in player-facing narration. DM handling only.",
  },
  {
    id: "conflict-rillix-attachment",
    title: "Rillix Attachment Chain",
    severity: "note",
    description:
      "Rillix found at Xelbrin Residence, secured by Alphie/Wren. Most attached to Wren. Travelling in carrier to be delivered to Miros Xelbrin. Dependency chain: Rillix→Wren→Miros.",
    affectedSnapshots: [
      "snapshot-bookmark5-nightstone",
      "snapshot-bookmark6-travel",
      "snapshot-bookmark8-goldenfields",
      "snapshot-current-northfurrow",
    ],
    notes: "If Wren is incapacitated, Rillix delivery becomes impossible. Track attachment in all scenes.",
  },
];
