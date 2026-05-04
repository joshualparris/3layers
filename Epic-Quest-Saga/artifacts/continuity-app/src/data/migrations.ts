import { CURRENT_SCHEMA_VERSION, INITIAL_STATE, type AppState } from "@/data/initialState";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function migrateAppState(raw: unknown): AppState {
  if (!isObject(raw)) {
    return INITIAL_STATE;
  }

  const maybeVersion = raw.schemaVersion;
  const sourceVersion = typeof maybeVersion === "number" ? maybeVersion : 0;
  let working: Record<string, unknown> = { ...raw };

  if (sourceVersion < 1) {
    working = { ...working, schemaVersion: 1 };
  }

  return {
    ...INITIAL_STATE,
    ...working,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    l2: {
      ...INITIAL_STATE.l2,
      ...(isObject(working.l2) ? working.l2 : {}),
    },
    l3: {
      ...INITIAL_STATE.l3,
      ...(isObject(working.l3) ? working.l3 : {}),
    },
    characters: Array.isArray(working.characters) ? (working.characters as AppState["characters"]) : INITIAL_STATE.characters,
    specialNPCs: Array.isArray(working.specialNPCs) ? (working.specialNPCs as AppState["specialNPCs"]) : INITIAL_STATE.specialNPCs,
    quests: Array.isArray(working.quests) ? (working.quests as AppState["quests"]) : INITIAL_STATE.quests,
    notes: Array.isArray(working.notes) ? (working.notes as AppState["notes"]) : INITIAL_STATE.notes,
    sourceRecords: Array.isArray(working.sourceRecords) ? (working.sourceRecords as AppState["sourceRecords"]) : INITIAL_STATE.sourceRecords,
    canonFacts: Array.isArray(working.canonFacts) ? (working.canonFacts as AppState["canonFacts"]) : INITIAL_STATE.canonFacts,
  };
}
