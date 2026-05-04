export type CanonStatus =
  | "source-canon"
  | "table-canon"
  | "player-choice"
  | "inferred"
  | "unresolved"
  | "retconned"
  | "DM-private";

export type Layer = "L1" | "L2" | "L3";

export interface SpellSlots {
  "1st": { used: number; total: number };
  "2nd": { used: number; total: number };
  "3rd": { used: number; total: number };
}

export interface Character {
  id: string;
  name: string;
  player: string;
  race: string;
  class: string;
  level: number;
  subclass: string;
  background: string;
  alignment: string;
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  profBonus: number;
  initiative: number;
  str: number; dex: number; con: number; int: number; wis: number; cha: number;
  savingThrows: string[];
  skills: string[];
  passivePerception: number;
  senses: string[];
  attacks: { name: string; bonus: string; damage: string; notes: string }[];
  cantrips: string[];
  spells?: { level: string; spells: string }[];
  spellDC?: number;
  spellAttack?: string;
  spellcastingAbility?: string;
  spellSlots?: SpellSlots;
  features: { name: string; description: string }[];
  resources: { name: string; used: number; total: number; refreshOn: string }[];
  portentDice?: [number | null, number | null];
  arcaneRecoveryUsed?: boolean;
  equipment: string;
  notes: string;
  roleplayNotes: string;
}

export interface SpecialNPC {
  id: string;
  name: string;
  controlledBy: string;
  pairedWith: string;
  type: string;
  ac: number;
  hp: number;
  maxHp: number;
  speed: number;
  keyStats: string;
  attacks: { name: string; bonus: string; damage: string; notes: string }[];
  features: string[];
  notes: string;
  roleplay: string;
}

export interface Quest {
  id: string;
  title: string;
  layer: Layer;
  status: "active" | "resolved" | "failed" | "pending";
  description: string;
  tasks: { text: string; done: boolean }[];
  canonStatus: CanonStatus;
  notes: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  layer: Layer;
  canonStatus: CanonStatus;
  tags: string[];
  createdAt: string;
}

export interface L2State {
  anchor: string;
  schedule: string;
  joshSummary: string;
  tablemembers: { name: string; character: string; role: string; notes: string }[];
  relationships: { name: string; status: string; notes: string }[];
  houseNotes: string;
}

export interface L3State {
  anchor: string;
  campaign: string;
  chapter: string;
  location: string;
  attackStarted: boolean;
  activeQuest: string;
  moralFraming: string;
  npcMechanicNotes: string;
  sessionNotes: string;
}

export interface SourceRecord {
  id: string;
  title: string;
  path: string;
  kind: "html" | "markdown" | "pdf" | "docx" | "image" | "zip";
  reviewed: boolean;
  imported: boolean;
  importedAt?: string;
  reviewedAt?: string;
  notes: string;
}

export interface CanonFactRecord {
  id: string;
  title: string;
  summary: string;
  layer: Layer;
  canonStatus: CanonStatus;
  sourceIds: string[];
  bookmark?: string;
  playerFacing: boolean;
  reviewed: boolean;
  createdAt: string;
}

export interface AppState {
  schemaVersion: number;
  activeLayer: Layer;
  characters: Character[];
  specialNPCs: SpecialNPC[];
  quests: Quest[];
  notes: Note[];
  sourceRecords: SourceRecord[];
  canonFacts: CanonFactRecord[];
  l2: L2State;
  l3: L3State;
}

export const CURRENT_SCHEMA_VERSION = 1;

export const INITIAL_STATE: AppState = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  activeLayer: "L3",

  l2: {
    anchor: "Saturday morning, 9 May 2026 — 92 Lakeside Circuit, Dubbo NSW. After Friday dinner/spa/sleepover.",
    schedule: "Breakfast first. D&D session at 1pm Saturday.",
    joshSummary:
      "Josh Parris, 36, single, Christian. Senior Stakeholder Engagement Coordinator (forced leave until mid-June 2026). Also runs Parris Tech Services (~$20k/month net) and Currawong AI (40% equity, CTO-ish). Cat: Bast (grey tabby, 4yo). Net worth ~$5.5m (mostly illiquid). Inherited $500k from great-uncle Mal this week — not fully processed emotionally.",
    tablemembers: [
      { name: "Marcus", character: "DM", role: "Dungeon Master — Storm King's Thunder", notes: "Calm, grounded, slightly dry. Willing to acknowledge mistakes openly." },
      { name: "Ben", character: "Dorrin Stonebrook", role: "Player — Cleric 5", notes: "Moral anchor at the table." },
      { name: "Talia", character: "Wren", role: "Player — Bard 5", notes: "Warm, emotionally perceptive. Squeamish — avoid body horror." },
      { name: "Naomi / Romi", character: "Kella Darkhope", role: "Player — Rogue 5", notes: "Controls Kella. Kella is NOT a romance option for Alphie." },
      { name: "Josh (OG)", character: "Alphie J. Roane", role: "Player — Wizard 5", notes: "Also controls Lifferlas in the Goldenfields battle." },
    ],
    relationships: [
      { name: "Romi", status: "unresolved — romantic", notes: "Crossed a private romantic line Friday night. Tuesday coffee and group normality still matter. No decisions forced." },
      { name: "Marcus", status: "close friend / DM", notes: "Long-standing friendship and campaign partnership." },
      { name: "Ben", status: "close friend", notes: "Solid, reliable. No complications." },
      { name: "Talia", status: "close friend", notes: "Warm relationship. Respect her squeamishness." },
    ],
    houseNotes:
      "92 Lakeside Circuit: master bedroom (Josh), guest bedroom (Ben used), library (floor-to-ceiling shelves), writing room (locked — J.A. Roane pseudonym work), study (Currawong AI / government work), rumpus/D&D room (custom 6-person table, minis, terrain).",
  },

  l3: {
    anchor: "Late night, Northfurrow's End, Goldenfields. Party is asleep after Alphie's apology to Wren. Giant attack has NOT yet begun.",
    campaign: "Storm King's Thunder — Dubbo table",
    chapter: "Chapter 2 — Goldenfields",
    location: "Northfurrow's End, Goldenfields",
    attackStarted: false,
    activeQuest: "Find Miros Xelbrin. Tell him his parents (Lathan and Melantha Xelbrin) died in Nightstone. Deliver Rillix (their tressym, currently attached to Wren).",
    moralFraming: "\"The boy deserves a clean hour to grieve before the world makes him do anything else.\"",
    npcMechanicNotes:
      "Chapter 2 special NPC mechanic: each player controls a special NPC during the giant attack. NPCs act on same initiative as their player's PC, immediately after. Keep them alive — they unlock quests/rewards if they survive.\n\nAssignments: Josh → Lifferlas | Ben → Miros Xelbrin | Talia → Oren Yogilvy | Naomi → Zi Liang\nUnused (off the board unless needed): Naxene Drathkala, Shalvus Martholio",
    sessionNotes:
      "Wren should deliver the news to Miros. Alphie stands nearby, quiet and supportive. Miros needs a clean hour to grieve first.\n\nUNRESOLVED: 2014 Divination Wizard (table build) vs 2024 Evocation Wizard (Josh's D&D Beyond screenshots). Must resolve before next combat.",
  },

  characters: [
    {
      id: "alphie",
      name: "Alphie J. Roane",
      player: "Josh",
      race: "Human",
      class: "Wizard",
      level: 5,
      subclass: "School of Divination",
      background: "Noble (House Roane cider trade)",
      alignment: "Lawful Good",
      hp: 32,
      maxHp: 32,
      ac: 12,
      speed: 30,
      profBonus: 3,
      initiative: 2,
      str: 8, dex: 14, con: 14, int: 18, wis: 12, cha: 12,
      savingThrows: ["INT +7", "WIS +4"],
      skills: ["Arcana +7", "History +7", "Investigation +7", "Insight +4", "Persuasion +4"],
      passivePerception: 11,
      senses: ["Passive Perception 11"],
      attacks: [
        { name: "Fire Bolt", bonus: "+7", damage: "2d10 fire", notes: "Cantrip, 120ft, spell attack" },
        { name: "Quarterstaff", bonus: "+2", damage: "1d6-1 bludgeoning (1d8-1 versatile)", notes: "" },
        { name: "Dagger", bonus: "+5", damage: "1d4+2 piercing", notes: "Finesse, thrown 20/60" },
      ],
      cantrips: ["Fire Bolt (+7, 2d10 fire)", "Mage Hand", "Prestidigitation", "Minor Illusion"],
      spells: [
        { level: "1st", spells: "Mage Armor, Shield, Magic Missile, Grease" },
        { level: "2nd", spells: "Misty Step, Mirror Image, Detect Thoughts, Levitate (table-canon, from Zephyros)" },
        { level: "3rd", spells: "Fireball" },
        { level: "Spellbook extras", spells: "Comprehend Languages, Detect Magic, Feather Fall, Identify | Invisibility, Web | Counterspell, Dispel Magic, Hypnotic Pattern" },
      ],
      spellDC: 15,
      spellAttack: "+7",
      spellcastingAbility: "INT",
      spellSlots: {
        "1st": { used: 0, total: 4 },
        "2nd": { used: 0, total: 3 },
        "3rd": { used: 0, total: 2 },
      },
      features: [
        { name: "Spellcasting", description: "Prepares 9 wizard spells per day from spellbook. Ritual casting. 4 cantrips." },
        { name: "Arcane Recovery", description: "Once per day after a short rest: recover expended spell slots totalling up to 3 levels." },
        { name: "Portent (Divination 2)", description: "After a long rest, roll 2 d20s. Replace any attack roll, save, or ability check you can see with one of those rolls before or after the roll is made." },
        { name: "Noble Position of Privilege", description: "People are inclined to think the best of your station." },
      ],
      resources: [
        { name: "Arcane Recovery", used: 0, total: 1, refreshOn: "Once per day (after short rest)" },
      ],
      portentDice: [null, null],
      arcaneRecoveryUsed: false,
      equipment: "Spellbook, component pouch, quarterstaff, 2 daggers, fine clothes, Roane signet ring, noble papers, calligraphy supplies, ink/quills/parchment, dragonchess set, Roane correspondence, Zephyros hospitality notebook, Goldenfields letter, wagon with 2 cider casks + 6 sample bottles.",
      notes: "Speaks Giant. AC 15 with Mage Armor (not currently active). UNRESOLVED: 2014 Divination vs 2024 Evocation build — must resolve with Marcus before next combat. Owes horse restitution to Nightstone.",
      roleplayNotes: "Warm, precise, oath-minded noble wizard. Party negotiator and public face. Learned 'not all at once' from Zephyros. Slow-burn romance with Wren — Talia must opt in, Goldenfields first. Kella is kinship/banter only. Carries the weight of Orven, Wren, Dorrin's blessing.",
    },
    {
      id: "wren",
      name: "Wren",
      player: "Talia",
      race: "Half-elf (assumed)",
      class: "Bard",
      level: 5,
      subclass: "College of Lore (assumed)",
      background: "Entertainer / traveller (assumed)",
      alignment: "Good-leaning",
      hp: 33,
      maxHp: 33,
      ac: 13,
      speed: 30,
      profBonus: 3,
      initiative: 2,
      str: 8, dex: 14, con: 12, int: 12, wis: 13, cha: 18,
      savingThrows: ["DEX +5", "CHA +7"],
      skills: ["Performance +10 (expertise)", "Persuasion +10 (expertise)", "Insight +4", "Perception +4", "Deception +7", "Acrobatics +5"],
      passivePerception: 14,
      senses: ["Darkvision 60ft (if half-elf)", "Passive Perception 14"],
      attacks: [
        { name: "Vicious Mockery", bonus: "WIS DC 15", damage: "2d4 psychic", notes: "Cantrip — target has disadvantage on next attack if it fails" },
        { name: "Rapier", bonus: "+5", damage: "1d8+2 piercing", notes: "Finesse" },
        { name: "Dagger", bonus: "+5", damage: "1d4+2 piercing", notes: "Finesse, thrown 20/60" },
      ],
      cantrips: ["Vicious Mockery (WIS DC15, 2d4 psychic)", "Minor Illusion", "Mage Hand"],
      spells: [
        { level: "1st (known)", spells: "Healing Word, Faerie Fire, Dissonant Whispers, Feather Fall" },
        { level: "2nd (known)", spells: "Suggestion, Invisibility, Shatter" },
        { level: "3rd (known)", spells: "Hypnotic Pattern" },
      ],
      spellDC: 15,
      spellAttack: "+7",
      spellcastingAbility: "CHA",
      spellSlots: {
        "1st": { used: 0, total: 4 },
        "2nd": { used: 0, total: 3 },
        "3rd": { used: 0, total: 2 },
      },
      features: [
        { name: "Bardic Inspiration (d8)", description: "Bonus action. Give one creature a d8 inspiration die to add to one roll within 10 minutes. 4 uses. Refreshes on short or long rest (Font of Inspiration, level 5)." },
        { name: "Jack of All Trades", description: "Add half proficiency bonus to ability checks not already proficient." },
        { name: "Song of Rest", description: "d6 extra healing during a short rest." },
        { name: "Expertise", description: "Performance and Persuasion at double proficiency." },
        { name: "College of Lore: Cutting Words", description: "Reaction: subtract a Bardic Inspiration die from a creature's attack, ability check, or damage roll." },
        { name: "Font of Inspiration (level 5)", description: "Bardic Inspiration refreshes on short or long rest." },
      ],
      resources: [
        { name: "Bardic Inspiration (d8)", used: 0, total: 4, refreshOn: "Short or long rest" },
        { name: "Song of Rest", used: 0, total: 1, refreshOn: "Short rest" },
      ],
      equipment: "Leather armor, rapier, daggers, viol/instrument case, entertainer/traveller gear, bedroll, pack, journal/songbook, Rillix's carrier, Alphie's poem (kept).",
      notes: "Bards know spells rather than preparing them. Confirm race and exact instrument/tool choices with Talia.",
      roleplayNotes: "Observant, warm, emotionally precise. She hears the hidden part of a story. Currently carries Rillix. Will deliver the news to Miros — she knows what it feels like to receive devastating news. Slow-burn with Alphie: has a mother/grief thread. 'Goldenfields first.' Uses song to move grief through the body.",
    },
    {
      id: "dorrin",
      name: "Dorrin Stonebrook",
      player: "Ben",
      race: "Hill Dwarf",
      class: "Cleric",
      level: 5,
      subclass: "Life Domain",
      background: "Acolyte / temple guardian (assumed)",
      alignment: "Lawful Good",
      hp: 48,
      maxHp: 48,
      ac: 18,
      speed: 25,
      profBonus: 3,
      initiative: 0,
      str: 14, dex: 10, con: 16, int: 10, wis: 18, cha: 10,
      savingThrows: ["WIS +7", "CHA +3"],
      skills: ["Medicine +7", "Religion +3", "Insight +7", "Persuasion +3"],
      passivePerception: 14,
      senses: ["Darkvision 60ft", "Passive Perception 14"],
      attacks: [
        { name: "Warhammer", bonus: "+5", damage: "1d8+2 bludgeoning (1d10+2 versatile)", notes: "" },
        { name: "Sacred Flame", bonus: "DEX DC 15", damage: "2d8 radiant", notes: "Cantrip — target gains no benefit from cover" },
        { name: "Guiding Bolt", bonus: "+7", damage: "4d6 radiant", notes: "1st-level spell — next attack against target has advantage" },
      ],
      cantrips: ["Sacred Flame (DEX DC15, 2d8 radiant)", "Guidance", "Spare the Dying", "Thaumaturgy"],
      spells: [
        { level: "Domain 1st (always prepared)", spells: "Bless, Cure Wounds" },
        { level: "Domain 2nd (always prepared)", spells: "Lesser Restoration, Spiritual Weapon" },
        { level: "Domain 3rd (always prepared)", spells: "Beacon of Hope, Revivify (requires 300gp diamond)" },
        { level: "Prepared 1st", spells: "Healing Word, Guiding Bolt, Sanctuary" },
        { level: "Prepared 2nd", spells: "Aid, Hold Person, Prayer of Healing" },
        { level: "Prepared 3rd", spells: "Spirit Guardians, Dispel Magic, Mass Healing Word" },
      ],
      spellDC: 15,
      spellAttack: "+7",
      spellcastingAbility: "WIS",
      spellSlots: {
        "1st": { used: 0, total: 4 },
        "2nd": { used: 0, total: 3 },
        "3rd": { used: 0, total: 2 },
      },
      features: [
        { name: "Spellcasting", description: "Prepares 9 cleric spells/day + domain spells (always prepared). Domain spells don't count toward limit." },
        { name: "Disciple of Life", description: "Healing spells of 1st level or higher restore extra HP equal to 2 + spell level." },
        { name: "Channel Divinity (1/rest)", description: "Turn Undead or Preserve Life (restore up to 25 HP total among creatures below half HP)." },
        { name: "Destroy Undead (level 5)", description: "When Turn Undead works, destroys CR 1/2 or lower undead instead of turning them." },
        { name: "Dwarven Resilience", description: "Advantage on saving throws vs poison, resistance to poison damage." },
      ],
      resources: [
        { name: "Channel Divinity", used: 0, total: 1, refreshOn: "Short or long rest" },
        { name: "Preserve Life Pool (25 HP)", used: 0, total: 25, refreshOn: "Short or long rest (with Channel Divinity)" },
      ],
      equipment: "Chain mail, shield, warhammer, holy symbol of Berronar Truesilver, priest gear, prayer book, pack, bedroll. Currently holding Morak's Potion of Heroism — status needs to be settled before departure.",
      notes: "Prepare 9 cleric spells/day (adjust after long rest). Revivify requires 300gp diamond component. Morak's Potion of Heroism status unresolved.",
      roleplayNotes: "Hearth, covenant, oaths, family, protection. Speaks rarely but meaningfully. He has given Alphie a conditional blessing for Wren. Taught Zephyros that a hearth is an act. Likely crucial when delivering news to Miros. 'Those horses bought lives. Still hurts. It should.'",
    },
    {
      id: "kella",
      name: "Kella Darkhope",
      player: "Naomi",
      race: "Human",
      class: "Rogue",
      level: 5,
      subclass: "Thief archetype",
      background: "Spy / criminal specialist",
      alignment: "Neutral",
      hp: 38,
      maxHp: 38,
      ac: 16,
      speed: 30,
      profBonus: 3,
      initiative: 4,
      str: 10, dex: 18, con: 14, int: 12, wis: 14, cha: 12,
      savingThrows: ["DEX +7", "INT +4"],
      skills: ["Stealth +10 (expertise)", "Perception +8 (expertise)", "Deception +4", "Insight +5", "Investigation +4", "Sleight of Hand +7", "Acrobatics +7"],
      passivePerception: 18,
      senses: ["Passive Perception 18"],
      attacks: [
        { name: "Shortsword/Rapier", bonus: "+7", damage: "1d6+4 or 1d8+4 piercing", notes: "Finesse. Sneak Attack 3d6 once/turn when conditions met." },
        { name: "Shortbow", bonus: "+7", damage: "1d6+4 piercing", notes: "Range 80/320. Sneak Attack eligible." },
        { name: "Dagger", bonus: "+7", damage: "1d4+4 piercing", notes: "Finesse, thrown 20/60." },
      ],
      cantrips: [],
      features: [
        { name: "Sneak Attack (3d6)", description: "Once per turn when an ally is adjacent to the target or you have advantage, deal 3d6 extra damage." },
        { name: "Expertise", description: "Stealth and Perception (or Thieves' Tools) at double proficiency." },
        { name: "Cunning Action", description: "Bonus action: Dash, Disengage, or Hide." },
        { name: "Thief: Fast Hands", description: "Use Cunning Action for Sleight of Hand, thieves' tools, disarm/trap, or Use an Object." },
        { name: "Thief: Second-Story Work", description: "Climb without extra movement cost. Running jump distance +DEX modifier." },
        { name: "Uncanny Dodge", description: "Reaction: halve damage from an attack that hits you and that you can see." },
      ],
      resources: [
        { name: "Uncanny Dodge (reaction)", used: 0, total: 1, refreshOn: "Each round (reaction)" },
      ],
      equipment: "Studded leather armor, rapier or shortsword, daggers, shortbow and arrows, thieves' tools, hooded cloak, practical travelling clothes, disguise/spy kit, small knife, rope, pack.",
      notes: "Thieves' tools: +10 with expertise if chosen. Arcane Trickster or Assassin subclass would require rebuild — confirm Thief with Naomi before combat.",
      roleplayNotes: "Former Zhentarim specialist, now Naomi's character. Party terms: no PvP, no secret Zhentarim messages, no selling party movements/plans. Not a romance option for Alphie — kinship, banter, sharp honesty, trust-testing. 'Started quietly belonging to the group without admitting it.' Night 1 sky-watch: nearly broke at the third name in Wren's song. Has a name she cannot yet say softly.",
    },
  ],

  specialNPCs: [
    {
      id: "lifferlas",
      name: "Lifferlas",
      controlledBy: "Josh",
      pairedWith: "Alphie J. Roane",
      type: "Huge plant (awakened tree), Unaligned",
      ac: 13,
      hp: 59,
      maxHp: 59,
      speed: 20,
      keyStats: "STR 19, DEX 6, CON 15 | Vulnerable: fire | Resistant: bludgeoning and piercing | Speaks Common",
      attacks: [
        { name: "Slam (x2 Multiattack)", bonus: "+6", damage: "14 bludgeoning", notes: "Reach 10ft" },
      ],
      features: [
        "False Appearance: indistinguishable from a normal tree while motionless",
        "Multiattack: two slam attacks",
        "Speaks Common",
      ],
      notes: "Acts on Josh's initiative, immediately after Alphie.",
      roleplay: "Goldenfields is his home. Its people are his friends. Children carve names and initials into him and hang from his boughs — he is happy with that. Ideal: protect people and plants of Goldenfields. Bond: children are wonderful; would do anything for them. Flaw: cannot remember people's names, often mixes them up. Josh likes him a lot.",
    },
    {
      id: "miros",
      name: "Miros Xelbrin",
      controlledBy: "Ben",
      pairedWith: "Dorrin Stonebrook",
      type: "Medium humanoid (Damaran human), Neutral Good",
      ac: 10,
      hp: 22,
      maxHp: 22,
      speed: 30,
      keyStats: "STR 16, CON 15, CHA 14 | Skills: Intimidation +4, Perception +3",
      attacks: [
        { name: "Bearhug", bonus: "+5", damage: "bludgeoning (ongoing while grappled)", notes: "Grapples target" },
        { name: "Club", bonus: "+5", damage: "1d4+3 bludgeoning", notes: "" },
        { name: "Heavy Crossbow", bonus: "+2", damage: "1d10 piercing", notes: "10 bolts" },
      ],
      features: [
        "Bearhug: grapples and deals ongoing bludgeoning damage while grappled",
      ],
      notes: "Acts on Ben's initiative, immediately after Dorrin. Narrative complication: party is bringing him news his parents (Lathan and Melantha Xelbrin) died in Nightstone. Rillix is being delivered. Ben plays Miros while Dorrin helps with the grief delivery.",
      roleplay: "Innkeeper. Retired carnival attraction called 'the Yeti' — barrel-shaped body, thick white hair. When Goldenfields suffers, his business suffers. Ideal: civilisation and wilderness coexist. Bond: don't speak ill of his inn or employees. Flaw: when upset, can fly into a rage.",
    },
    {
      id: "oren",
      name: "Oren Yogilvy",
      controlledBy: "Talia",
      pairedWith: "Wren",
      type: "Small humanoid (strongheart halfling), Chaotic Good",
      ac: 11,
      hp: 9,
      maxHp: 9,
      speed: 25,
      keyStats: "CHA 16 | Skills: Perception +2, Performance +7, Persuasion +5 | Poison resistance | Halfling Nimbleness, Lucky",
      attacks: [
        { name: "Dagger (x4)", bonus: "+3", damage: "1d4+1 piercing", notes: "Four daggers" },
      ],
      features: [
        "Halfling Nimbleness: can move through space of larger creatures",
        "Lucky: reroll 1s on attack/ability/save rolls",
        "Stout Resilience: advantage on poison saves, resistance to poison damage",
      ],
      notes: "Acts on Talia's initiative, immediately after Wren.",
      roleplay: "Came to Northfurrow's End looking for easy work, found it. Sings for supper, drinks like a fish, wanders fields at night dreaming up lyrics. Likes to stir up trouble but doesn't have a mean bone. Ideal: music is food for the soul. Bond: 'You had me at Can I buy you a drink?' Flaw: knack for putting himself in harm's way. Talia immediately clocked him as very playable.",
    },
    {
      id: "ziliang",
      name: "Zi Liang",
      controlledBy: "Naomi",
      pairedWith: "Kella Darkhope",
      type: "Medium humanoid (Shou human), Chaotic Good",
      ac: 15,
      hp: 22,
      maxHp: 22,
      speed: 40,
      keyStats: "DEX 15, WIS 16 | Skills: Acrobatics +4, Athletics +3, Perception +5, Stealth +4 | Languages: Common, Elvish, Goblin",
      attacks: [
        { name: "Quarterstaff (x2 Multiattack)", bonus: "+4", damage: "1d6+2 bludgeoning", notes: "" },
        { name: "Sling", bonus: "+4", damage: "1d4+2 bludgeoning", notes: "20 stones" },
      ],
      features: [
        "AC 15 from Unarmored Defense",
        "Multiattack: two melee attacks",
        "Speed 40ft",
      ],
      notes: "Acts on Naomi's initiative, immediately after Kella.",
      roleplay: "Devout worshiper of Chauntea, the Earth Mother. Has less faith in Goldenfields' defenders. Patrols the temple-farm during off-duty hours. Ideal: if fields and gardens are faithfully tended, Chauntea will smile. Bond: Goldenfields is the breadbasket of the North — she will protect it. Flaw: does not trust authority; follows her heart. Naomi liked her immediately.",
    },
  ],

  quests: [
    {
      id: "goldenfields-main",
      title: "Deliver the News to Miros Xelbrin",
      layer: "L3",
      status: "active",
      description:
        "Morak asked the party to travel to Goldenfields and tell Miros Xelbrin that his parents, Lathan and Melantha Xelbrin, died in Nightstone when the giants attacked.",
      tasks: [
        { text: "Find Miros Xelbrin at Goldenfields / Northfurrow's End", done: false },
        { text: "Give Miros a clean hour to grieve before anything else", done: false },
        { text: "Wren delivers the news (Alphie stands quietly nearby)", done: false },
        { text: "Deliver Rillix (tressym) safely to Miros", done: false },
      ],
      canonStatus: "table-canon",
      notes:
        "Moral framing: 'The boy deserves a clean hour to grieve before the world makes him do anything else.' Rillix is alive, attached to Wren. Miros is currently unaware of his parents' deaths.",
    },
    {
      id: "goldenfields-battle",
      title: "Defend Goldenfields (Giant Attack)",
      layer: "L3",
      status: "pending",
      description:
        "The giant attack on Goldenfields is imminent (source-canon Chapter 2 event). Party needs to defend the settlement and keep the special NPCs alive.",
      tasks: [
        { text: "Wait for the attack to begin", done: false },
        { text: "Coordinate Lifferlas (Josh), Miros (Ben), Oren (Talia), Zi Liang (Naomi)", done: false },
        { text: "Keep all four special NPCs alive for quest rewards", done: false },
        { text: "Decide Shalvus Martholio situation", done: false },
      ],
      canonStatus: "source-canon",
      notes: "Attack has NOT started yet. Shalvus Martholio is DM-private — suspected traitor. Naxene Drathkala is off the board unless needed.",
    },
    {
      id: "horse-restitution",
      title: "Horse Restitution — Nightstone",
      layer: "L3",
      status: "active",
      description:
        "Alphie traded six Nightstone horses to the ogres for the safe release of villagers. He owes restitution to Nightstone for those horses.",
      tasks: [
        { text: "Settle the Nightstone horse debt", done: false },
      ],
      canonStatus: "table-canon",
      notes: "Dorrin: 'Those horses bought lives. Still hurts. It should.'",
    },
    {
      id: "morak-potion",
      title: "Return Morak's Potion of Heroism",
      layer: "L3",
      status: "active",
      description:
        "Dorrin is holding Morak's Potion of Heroism with permission 'until the roads are safe.' The status needs to be settled before departure.",
      tasks: [
        { text: "Decide: return the potion or keep it formally", done: false },
      ],
      canonStatus: "table-canon",
      notes: "Currently with Dorrin.",
    },
    {
      id: "l2-romi-thread",
      title: "Romi Romantic Thread",
      layer: "L2",
      status: "active",
      description:
        "Josh and Romi crossed a romantic line privately on Friday night. The situation is unresolved. Tuesday coffee and group normality still matter.",
      tasks: [
        { text: "Breakfast Saturday morning — keep group dynamic comfortable", done: false },
        { text: "D&D session at 1pm — maintain table normality", done: false },
        { text: "No forced decisions — let things settle", done: false },
      ],
      canonStatus: "player-choice",
      notes: "No PvP. Romance is opt-in. No forced choices for Josh.",
    },
    {
      id: "resolve-build",
      title: "Resolve Alphie's Build (2014 vs 2024)",
      layer: "L3",
      status: "active",
      description:
        "Unresolved: table runs 2014 5e with Alphie as Divination Wizard, but Josh's D&D Beyond shows a 2024 Evocation Wizard. Must be locked before next combat.",
      tasks: [
        { text: "Marcus and Josh agree: 2014 Divination, 2024 Evocation, or deliberate conversion?", done: false },
      ],
      canonStatus: "unresolved",
      notes: "Must be resolved before Tower of Zephyros travel leads into Chapter 2 combat.",
    },
  ],

  notes: [
    {
      id: "note-rules",
      title: "Non-Negotiable Continuity Rules",
      content:
        "PLAYER AGENCY:\n• Do not make choices for Josh's controlled characters (OG Josh in L2, Alphie in L3)\n• Do not make choices for other players' PCs\n• Romance is opt-in only. No PvP. No betrayal arcs unless every affected player opts in\n• NPCs only speak about scenes they could have witnessed\n\nSOURCE/CANON:\n• Storm King's Thunder is the sourcebook of record for L3\n• Strict 2014 D&D 5e RAW only (unless Marcus and Josh explicitly agree to convert)\n• Tag every fact: source-canon / table-canon / player-choice / inferred / unresolved / retconned / DM-private\n• Separate DM-private source structure from player-facing narration\n\nTONE:\n• Style correction switch: 'less prestige drama mode please'\n• Do not call Josh 'mate'\n• Natural Australian English. Concise, warm, honest, practical\n• M-rated but serious. Wonder and danger both. No graphic torture. No on-screen harm to children. Fade-to-black. Avoid body horror (Talia is squeamish)\n• Marcus's voice: calm, grounded, slightly dry\n\nSAFETY:\n• 'Pause' is the safety word — scene stops immediately\n• Don't fudge dice to save characters. Don't target them unfairly either. The world responds honestly\n• Alcohol is NOT an automatic courage/romance escalation device — realistic guardrails (food, water, consent, transport, next-day consequences)",
      layer: "L1",
      canonStatus: "table-canon",
      tags: ["rules", "meta"],
      createdAt: "2026-05-09T09:00:00Z",
    },
    {
      id: "note-zephyros",
      title: "Tower of Zephyros — Summary",
      content:
        "Party travelled 72 hours in Zephyros's tower from Nightstone to Goldenfields.\n\nCORRECTED SOURCE FACTS:\n• Tower appears after Morak's quest acceptance. Floats 1,000 feet up.\n• Cloud stairs descend to the road. Zephyros stays in tower; does not descend to road.\n• Characters climb the cloud stairs. Zephyros greets them inside. He descends from second floor using Levitate.\n• Purple robe with gold stars. Eccentric, kind, Neutral Good, lonely.\n• Aerie: four griffons; 1d4 present at any time (Marcus rolled three present, one out hunting).\n• Party found on first floor. Alphie had supervised second-floor access to learn Levitate — TABLE-CANON exception.\n\nGIFTS/EXCHANGES:\n• Alphie gifted Zephyros a small bottle of Roane cider. Zephyros kept it carefully.\n• Alphie gave his family address — invited Zephyros to visit the Roane cider farm one day.\n• Zephyros said he would write first and not surprise an orchard with a cloud giant tower.\n• Alphie joked about growing one giant cider tree. Zephyros loves the idea — may correspond.\n\nFAREWELL:\n• To Dorrin: thanked him for teaching that a hearth is an act.\n• To Alphie: gave the hospitality notebook and Goldenfields letter.\n\nALPHIE ON THE TOWER:\n• Wrote a poem for Wren and gave it to her.\n• Admitted feelings for Wren.\n• Received Dorrin's conditional blessing to pursue Wren slowly and honourably.\n• Resolved not to pursue Kella romantically.",
      layer: "L3",
      canonStatus: "table-canon",
      tags: ["Zephyros", "travel", "relationships"],
      createdAt: "2026-05-09T09:01:00Z",
    },
    {
      id: "note-nightstone",
      title: "Nightstone Arc — Key Events",
      content:
        "CLOUD GIANT ATTACK: Dropped rocks, killed Lady Velrosa and others, took the nightstone. Villagers fled north to Dripping Caves.\n\nKEY ACHIEVEMENTS:\n• Negotiated with Xolkin (Seven Snakes) rather than fighting — temporary alliance, public oath witnessed by party + Lady Velrosa's body\n• Defended Nightstone from Ear Seekers: raised drawbridge, manned towers, used Portent tactically, broke Norgra's Bless, killed Gurrash with Fire Bolt\n• Spoke Giant to ogres — traded 6 Nightstone horses for safe release of villagers\n• Negotiated Hark's surrender and safe passage\n• Interrogated and released Gum-Gum (goblin) — later publicly credited by name before Hark\n• Rescued all villagers from Dripping Caves\n• Kella joined the party under explicit terms (no PvP, no Zhentarim messages, etc.)\n\nKELLA TERMS:\n• Shared goals. Shared resources with records. No party theft. No secret Zhentarim messages. No selling movements/plans. No PvP. Party does not treat Kella as prisoner or charity case. Dorrin doesn't trust her yet but accepts terms.\n\nMORAK'S BREAKFAST (morning after):\nAlphie made: cider oat porridge, toasted village bread, scrambled eggs with onion/cheese/ham, weak black tea. Wren came first, said 'Oh' at the cider in the oats. Kella called it 'acceptable' then corrected that to 'praise'. Dorrin said 'Good'. Morak topped up hot water without comment.",
      layer: "L3",
      canonStatus: "table-canon",
      tags: ["Nightstone", "Chapter 1", "Kella", "history"],
      createdAt: "2026-05-09T09:02:00Z",
    },
    {
      id: "note-shalvus",
      title: "Shalvus Martholio — DM Private",
      content:
        "Suspected traitor. DM-private information — do not reveal in player-facing narration. Marcus to handle as needed.",
      layer: "L3",
      canonStatus: "DM-private",
      tags: ["Shalvus", "DM-private", "traitor"],
      createdAt: "2026-05-09T09:03:00Z",
    },
    {
      id: "note-rillix",
      title: "Rillix the Tressym",
      content:
        "Ash-grey tressym with darker stripes, green-gold eyes, feathered wings. Suspicious, dignified, judgmental.\n\nFound at Xelbrin Residence (Area 4H) in Nightstone.\n\nHow secured: Alphie softened dried beef and offered it gently. Animal Handling: 14+0=14. Wren helped with gentle voice. Rillix took the beef, then glided to Wren's shoulder.\n\nCurrent status: Alive. Secured. Most attached to Wren. Travelling in carrier to be delivered to Miros Xelbrin at Goldenfields.\n\nNOTE: Miros is not present in Nightstone — he lives in Goldenfields. Rillix only reacted to the sound of Miros's name.",
      layer: "L3",
      canonStatus: "source-canon",
      tags: ["Rillix", "tressym", "Miros", "quest"],
      createdAt: "2026-05-09T09:04:00Z",
    },
  ],

  sourceRecords: [
    {
      id: "source-upgrade-plan",
      title: "Epic Quest Saga Upgrade Plan",
      path: "C:\\Users\\joshua.parris\\Downloads\\Epic-Quest-Saga\\UPGRADE.md",
      kind: "markdown",
      reviewed: true,
      imported: true,
      importedAt: "2026-05-04T00:00:00Z",
      reviewedAt: "2026-05-04T00:00:00Z",
      notes: "Roadmap for faithful app upgrades and feature order.",
    },
    {
      id: "source-master-three-layer",
      title: "Three-Layer Continuity Master Handover",
      path: "C:\\Users\\joshua.parris\\Downloads\\Epic-Quest-Saga\\Epic-Quest-Saga\\attached_assets\\Three_Layer_Continuity_Handover_MASTER_(1)_(1)_1777889813316.pdf",
      kind: "pdf",
      reviewed: true,
      imported: true,
      importedAt: "2026-05-04T00:00:00Z",
      reviewedAt: "2026-05-04T00:00:00Z",
      notes: "Current three-layer source of truth for the app build.",
    },
    {
      id: "source-bookmark8",
      title: "Bookmark 8 Handover",
      path: "C:\\Users\\joshua.parris\\Downloads\\Epic-Quest-Saga\\Epic-Quest-Saga\\attached_assets\\H_-_Bookmark_8_1777889813582.pdf",
      kind: "pdf",
      reviewed: false,
      imported: false,
      notes: "Later in-game continuity handover used by the current app seed.",
    },
    {
      id: "source-bookmark6",
      title: "Bookmark 6 Handover",
      path: "C:\\Users\\joshua.parris\\Downloads\\Epic-Quest-Saga\\Epic-Quest-Saga\\attached_assets\\F_SKT_Dubbo_Bookmark_6_1777889813560.pdf",
      kind: "pdf",
      reviewed: false,
      imported: false,
      notes: "Intermediate in-game continuity handover between Nightstone and Goldenfields.",
    },
  ],

  canonFacts: [
    {
      id: "fact-current-anchor",
      title: "Current L3 Anchor",
      summary: "The live in-game state is Northfurrow's End, Goldenfields, late night, after Alphie's apology to Wren; the attack has not begun.",
      layer: "L3",
      canonStatus: "table-canon",
      sourceIds: ["source-master-three-layer"],
      playerFacing: true,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
    {
      id: "fact-layer-separation",
      title: "Layer Separation",
      summary: "L1, L2, and L3 facts must remain separate to prevent layer bleed.",
      layer: "L1",
      canonStatus: "table-canon",
      sourceIds: ["source-master-three-layer"],
      playerFacing: false,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
    {
      id: "fact-rules-conflict",
      title: "2014 vs 2024 Build Conflict",
      summary: "Table continuity uses strict 2014 5e Divination Wizard, while D&D Beyond material shows a 2024 Evocation Wizard.",
      layer: "L3",
      canonStatus: "unresolved",
      sourceIds: ["source-bookmark8"],
      playerFacing: false,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
    {
      id: "fact-rillix",
      title: "Rillix Delivery",
      summary: "Rillix is alive, attached to Wren, and should be delivered to Miros Xelbrin at Goldenfields.",
      layer: "L3",
      canonStatus: "source-canon",
      sourceIds: ["source-master-three-layer"],
      playerFacing: true,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
    {
      id: "fact-miros",
      title: "Miros News Delivery",
      summary: "Wren should deliver the news of Lathan and Melantha Xelbrin's deaths while Alphie supports quietly.",
      layer: "L3",
      canonStatus: "table-canon",
      sourceIds: ["source-master-three-layer"],
      playerFacing: true,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
    {
      id: "fact-shalvus-private",
      title: "Shalvus DM-Private",
      summary: "Shalvus material is DM-private and must not appear in player-facing summaries.",
      layer: "L3",
      canonStatus: "DM-private",
      sourceIds: ["source-master-three-layer"],
      playerFacing: false,
      reviewed: true,
      createdAt: "2026-05-04T00:00:00Z",
    },
  ],
};
