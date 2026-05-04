export interface RulesIssue {
  id: string;
  title: string;
  severity: "blocker" | "warning" | "note";
  status: "open" | "ruled" | "retconned";
  summary: string;
  options: string[];
  ruling?: string;
  ruledBy?: string;
  ruledAt?: string;
  notes: string;
}

export interface CharacterSheetVersion {
  id: string;
  characterName: string;
  playerId: string;
  source: "2014-table" | "2024-beyond" | "official" | "custom";
  class: string;
  subclass: string;
  level: number;
  capturedAt: string;
  notes: string;
}

export interface ResourceSnapshot {
  id: string;
  characterId: string;
  timestamp: string;
  hp: number;
  maxHp: number;
  spellSlots?: Record<string, { used: number; total: number }>;
  resources?: Record<string, { used: number; total: number }>;
  features?: string[];
}

export const RULES_ISSUES: RulesIssue[] = [
  {
    id: "rules-alphie-build",
    title: "Alphie/Alphie J. Roane Build Conflict (BLOCKER)",
    severity: "blocker",
    status: "open",
    summary:
      "Table continuity runs strict 2014 D&D 5e Divination Wizard. Josh's D&D Beyond shows 2024 Evocation Wizard. Affects spells, proficiencies, and combat mechanics.",
    options: [
      "Stick with 2014 Divination as table canon",
      "Convert to 2024 Evocation retroactively",
      "Deliberate mid-campaign build conversion (with mechanical rationale)",
    ],
    notes:
      "This is the single biggest mechanical blocker. Must be decided before Goldenfields combat begins. Affects spell selection (Divination gets Portent mechanics, Evocation gets Evocation Savant), prepared spells, and player agency.",
  },
  {
    id: "rules-spell-slots",
    title: "Spell Slot Tracking",
    severity: "warning",
    status: "open",
    summary: "Alphie has used 1st, 2nd, 3rd level spell slots. Verify total slots for Wizard 5 and refresh rules.",
    options: [
      "Verify 1st level: 4 total (currently 0 used per app)",
      "Verify 2nd level: 3 total (currently 0 used per app)",
      "Verify 3rd level: 2 total (currently 0 used per app)",
    ],
    notes:
      "Per official 5e Wizard table: Level 5 = 4 × 1st, 3 × 2nd, 2 × 3rd. App shows zeroed. Likely not tracked in local storage during play.",
  },
  {
    id: "rules-portent-dice",
    title: "Portent Dice (Divination Feature)",
    severity: "note",
    status: "open",
    summary:
      "If Divination is canon: Portent dice are rolled, stored, and can replace any ability check, attack, or save within 1 minute of rolling.",
    options: [
      "App shows: [null, null] — dice not yet rolled this session",
      "Roll two d20s at session start",
      "Use existing rolls if session is mid-roll",
    ],
    notes: "Only applies if 2014 Divination build is confirmed canon. Critical for Alphie's tactical toolkit.",
  },
  {
    id: "rules-levitate-spell",
    title: "Levitate Spell Acquisition (TABLE-CANON)",
    severity: "note",
    status: "ruled",
    summary: "Alphie learned Levitate from Zephyros during Tower transit. Not normally available to Divination Wizard.",
    options: ["Keep Levitate as a table-canon exception"],
    ruling:
      "Table-canon exception. Zephyros offered knowledge. Marcus and Josh agreed it was narratively significant and wouldn't break balance. Added to Alphie's spell list.",
    ruledBy: "Josh and Marcus",
    ruledAt: "2026-05-03",
    notes: "This precedent means house rules exist. If 2024 Evocation conversion is chosen, verify Evocation can access Levitate too.",
  },
  {
    id: "rules-ac",
    title: "Armor Class Verification",
    severity: "note",
    status: "ruled",
    summary: "AC 12 (no armor, DEX +2). Mage Armor not cast.",
    options: ["Use AC 12 until Mage Armor or another defense is active"],
    ruling: "Correct for Wizard without armor/shield. If Mage Armor cast (+5), becomes AC 17.",
    ruledBy: "Official 5e",
    ruledAt: "2026-05-03",
    notes: "Check if Mage Armor is active/prepared for Goldenfields combat.",
  },
];

export const CHARACTER_SHEET_VERSIONS: CharacterSheetVersion[] = [
  {
    id: "alphie-2014-table",
    characterName: "Alphie J. Roane (Alphie) — 2014 Build",
    playerId: "josh",
    source: "2014-table",
    class: "Wizard",
    subclass: "School of Divination",
    level: 5,
    capturedAt: "2026-05-04",
    notes:
      "Table canon per UPGRADE.md and handovers. Divination Wizard with Portent, Expertise Die, prepared spells. Levitate acquired from Zephyros (table-canon exception).",
  },
  {
    id: "alphie-2024-beyond",
    characterName: "Alphie J. Roane — 2024 Evocation Build (D&D Beyond)",
    playerId: "josh",
    source: "2024-beyond",
    class: "Wizard",
    subclass: "Evocation",
    level: 5,
    capturedAt: "2026-04-20",
    notes:
      "Josh's D&D Beyond shows Evocation Wizard. Discrepancy from table canon. Must be resolved before Goldenfields combat. Evocation grants Sculpt Spells, not Portent.",
  },
  {
    id: "wren-official",
    characterName: "Wren — Bard 5",
    playerId: "talia",
    source: "official",
    class: "Bard",
    subclass: "College of Lore",
    level: 5,
    capturedAt: "2026-05-04",
    notes: "College of Lore grants Jack of All Trades, Expertise, Bardic Inspiration. Built from official 5e.",
  },
  {
    id: "dorrin-official",
    characterName: "Dorrin Stonebrook — Cleric 5",
    playerId: "ben",
    source: "official",
    class: "Cleric",
    subclass: "Knowledge Domain",
    level: 5,
    capturedAt: "2026-05-04",
    notes: "Knowledge Domain Cleric. Blessed by Alphie after Tower of Zephyros. Official 5e build.",
  },
  {
    id: "kella-official",
    characterName: "Kella Darkhope — Rogue 5",
    playerId: "naomi",
    source: "official",
    class: "Rogue",
    subclass: "Arcane Trickster",
    level: 5,
    capturedAt: "2026-05-04",
    notes: "Arcane Trickster Rogue. Joined at Nightstone under explicit terms. Official 5e build.",
  },
];
