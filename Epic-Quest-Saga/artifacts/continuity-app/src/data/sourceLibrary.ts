import type { CanonStatus, Layer } from "./initialState";

export type SourceKind = "html" | "markdown" | "pdf" | "docx" | "image" | "zip";
export type SubAppStatus = "current" | "active" | "legacy" | "backup";

export interface SourceDocument {
  id: string;
  title: string;
  kind: SourceKind;
  path: string;
  url: string;
  layerScope: Layer[];
  canonStatus: CanonStatus;
  priority: "primary" | "supporting" | "archive";
  notes: string;
}

export interface SubAppLink {
  id: string;
  title: string;
  family: string;
  status: SubAppStatus;
  path: string;
  url: string;
  notes: string;
}

export interface CanonFactPreview {
  id: string;
  title: string;
  layer: Layer;
  canonStatus: CanonStatus;
  sourceId: string;
  summary: string;
}

const alfieRoot =
  "C:\\Users\\joshua.parris\\OneDrive - Dubbo Christian School\\Documents\\03_Projects\\__Alfie Dnd";
const epicRoot = "C:\\Users\\joshua.parris\\Downloads\\Epic-Quest-Saga";
const appRoot = `${epicRoot}\\Epic-Quest-Saga`;

function source(
  id: string,
  title: string,
  kind: SourceKind,
  path: string,
  layerScope: Layer[],
  canonStatus: CanonStatus,
  priority: SourceDocument["priority"],
  notes: string,
): SourceDocument {
  return { id, title, kind, path, url: `/source/${id}`, layerScope, canonStatus, priority, notes };
}

function subApp(
  id: string,
  title: string,
  family: string,
  status: SubAppStatus,
  path: string,
  notes: string,
): SubAppLink {
  return { id, title, family, status, path, url: `/subapp/${id}/`, notes };
}

export const SUB_APP_LINKS: SubAppLink[] = [
  subApp(
    "alfie-root-dashboard",
    "Alfie DnD Root Dashboard",
    "Root",
    "active",
    `${alfieRoot}\\index.html`,
    "Main local HTML dashboard for the Alfie source archive.",
  ),
  subApp(
    "gemini-doctype",
    "Gemini HTML Dashboard",
    "Gemini",
    "active",
    `${alfieRoot}\\gemeni\\!DOCTYPE.html`,
    "Gemini-generated dashboard variant specifically requested for quick access.",
  ),
  subApp(
    "gemini-index",
    "Gemini Index",
    "Gemini",
    "legacy",
    `${alfieRoot}\\gemeni\\index.html`,
    "Alternate Gemini index kept as a comparison point.",
  ),
  subApp(
    "claude-index",
    "Claude Dashboard",
    "Claude",
    "active",
    `${alfieRoot}\\claude\\index.html`,
    "Claude-built dashboard variant for source review.",
  ),
  subApp(
    "claude-v2-index",
    "Claude v2 Dashboard",
    "Claude",
    "legacy",
    `${alfieRoot}\\claude\\indexv2\\index.html`,
    "Second Claude dashboard pass preserved for comparison.",
  ),
  subApp(
    "chatgpt-bookmark5",
    "ChatGPT Bookmark 5 Dashboard",
    "ChatGPT",
    "active",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_Upgraded_Bookmark5\\__Alfie Dnd\\index.html`,
    "Bookmark 5 Nightstone/Rillix dashboard with embedded document reader.",
  ),
  subApp(
    "chatgpt-bookmark5-backup",
    "ChatGPT Bookmark 5 Backup",
    "ChatGPT",
    "backup",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_Upgraded_Bookmark5\\__Alfie Dnd\\index.backup-before-upgrade.html`,
    "Pre-upgrade backup for the Bookmark 5 dashboard.",
  ),
  subApp(
    "chatgpt-goldenfields-v3",
    "ChatGPT Goldenfields v3 Dashboard",
    "ChatGPT",
    "active",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_V3_Chapter2_Goldenfields\\Alfie Dnd\\index.html`,
    "Chapter 2 Goldenfields prep hub and defence tracker.",
  ),
  subApp(
    "chatgpt-goldenfields-backup",
    "ChatGPT Goldenfields Backup",
    "ChatGPT",
    "backup",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_V3_Chapter2_Goldenfields\\Alfie Dnd\\index.backup-before-upgrade.html`,
    "Backup retained before the Goldenfields upgrade.",
  ),
  subApp(
    "chatgpt-goldenfields-v2-backup",
    "ChatGPT Goldenfields v2 Backup",
    "ChatGPT",
    "backup",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_V3_Chapter2_Goldenfields\\Alfie Dnd\\index.v2-backup-before-chapter2.html`,
    "Older Chapter 2 backup kept for timeline comparison.",
  ),
];

export const SOURCE_DOCUMENTS: SourceDocument[] = [
  source(
    "upgrade-plan",
    "Epic Quest Saga Upgrade Plan",
    "markdown",
    `${epicRoot}\\UPGRADE.md`,
    ["L1", "L2", "L3"],
    "table-canon",
    "primary",
    "Roadmap for faithful app upgrades and feature order.",
  ),
  source(
    "master-three-layer-handover",
    "Three-Layer Continuity Master Handover",
    "pdf",
    `${appRoot}\\attached_assets\\Three_Layer_Continuity_Handover_MASTER_(1)_(1)_1777889813316.pdf`,
    ["L1", "L2", "L3"],
    "table-canon",
    "primary",
    "Current three-layer source of truth for the app build.",
  ),
  source(
    "bookmark8",
    "Bookmark 8 Handover",
    "pdf",
    `${appRoot}\\attached_assets\\H_-_Bookmark_8_1777889813582.pdf`,
    ["L3"],
    "table-canon",
    "primary",
    "Later in-game continuity handover used by the current app seed.",
  ),
  source(
    "bookmark6",
    "Bookmark 6 Handover",
    "pdf",
    `${appRoot}\\attached_assets\\F_SKT_Dubbo_Bookmark_6_1777889813560.pdf`,
    ["L3"],
    "table-canon",
    "supporting",
    "Intermediate in-game continuity handover between Nightstone and Goldenfields.",
  ),
  source(
    "bookmark5-current-state",
    "Bookmark 5 Current State",
    "markdown",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_Upgraded_Bookmark5\\__Alfie Dnd\\CURRENT_STATE.md`,
    ["L3"],
    "table-canon",
    "supporting",
    "Nightstone recovery, Rillix, and Goldenfields chosen.",
  ),
  source(
    "goldenfields-v3-current-state",
    "Goldenfields v3 Current State",
    "markdown",
    `${alfieRoot}\\chatGPT\\Alfie_DnD_Website_V3_Chapter2_Goldenfields\\Alfie Dnd\\CURRENT_STATE.md`,
    ["L3"],
    "table-canon",
    "supporting",
    "Chapter 2 Goldenfields dashboard state before the current three-layer app.",
  ),
  source(
    "checkpoint4",
    "Resume Checkpoint 4 Handover",
    "markdown",
    `${alfieRoot}\\docs\\Checkpoints\\SKT_Dubbo_Resume_Checkpoint_4_Handover.md`,
    ["L3"],
    "table-canon",
    "archive",
    "Nightstone, Ear Seekers, Ardeep, and Dripping Caves tactical handover.",
  ),
  source(
    "alphie-inventory",
    "Alphie Complete Inventory",
    "markdown",
    `${alfieRoot}\\Alphie_Complete_Inventory.md`,
    ["L3"],
    "table-canon",
    "supporting",
    "Detailed inventory and resource snapshot around Bookmark 4.",
  ),
  source(
    "chatgpt-handover",
    "ChatGPT Handover",
    "markdown",
    `${alfieRoot}\\ChatGPThandover27042026.md`,
    ["L3"],
    "table-canon",
    "archive",
    "Earlier continuity handover for cross-checking drift.",
  ),
  source(
    "claude-handover",
    "Claude Handover",
    "markdown",
    `${alfieRoot}\\ClaudeHandover27042026.md`,
    ["L3"],
    "table-canon",
    "archive",
    "Earlier continuity handover with extensive session history.",
  ),
  source(
    "gemini-handover",
    "Gemini Handover",
    "markdown",
    `${alfieRoot}\\GemeniHandover27042026.md`,
    ["L3"],
    "table-canon",
    "archive",
    "Earlier Gemini handover used as a comparison source.",
  ),
  source(
    "root-repository-tree",
    "Alfie Repository File Tree",
    "markdown",
    `${alfieRoot}\\REPOSITORY_FILE_TREE.md`,
    ["L1"],
    "table-canon",
    "supporting",
    "Inventory of the source archive and major document locations.",
  ),
];

export const CANON_FACT_PREVIEWS: CanonFactPreview[] = [
  {
    id: "fact-current-anchor",
    title: "Current L3 Anchor",
    layer: "L3",
    canonStatus: "table-canon",
    sourceId: "master-three-layer-handover",
    summary: "The live in-game state is Northfurrow's End, Goldenfields, late night, after Alphie's apology to Wren; the attack has not begun.",
  },
  {
    id: "fact-layer-separation",
    title: "Layer Separation",
    layer: "L1",
    canonStatus: "table-canon",
    sourceId: "master-three-layer-handover",
    summary: "L1, L2, and L3 facts must remain separate to prevent layer bleed.",
  },
  {
    id: "fact-rules-conflict",
    title: "2014 vs 2024 Build Conflict",
    layer: "L3",
    canonStatus: "unresolved",
    sourceId: "bookmark5-current-state",
    summary: "Table continuity uses strict 2014 5e Divination Wizard, while D&D Beyond material shows a 2024 Evocation Wizard.",
  },
  {
    id: "fact-rillix",
    title: "Rillix Delivery",
    layer: "L3",
    canonStatus: "source-canon",
    sourceId: "goldenfields-v3-current-state",
    summary: "Rillix is alive, attached to Wren, and should be delivered to Miros Xelbrin at Goldenfields.",
  },
  {
    id: "fact-miros",
    title: "Miros News Delivery",
    layer: "L3",
    canonStatus: "table-canon",
    sourceId: "master-three-layer-handover",
    summary: "Wren should deliver the news of Lathan and Melantha Xelbrin's deaths while Alphie supports quietly.",
  },
  {
    id: "fact-kella-terms",
    title: "Kella Party Terms",
    layer: "L3",
    canonStatus: "table-canon",
    sourceId: "claude-handover",
    summary: "Kella travels under explicit terms: shared goals, no party theft, no PvP, no secret Zhentarim messages, and no selling party plans.",
  },
  {
    id: "fact-goldenfields-npcs",
    title: "Goldenfields Special NPCs",
    layer: "L3",
    canonStatus: "source-canon",
    sourceId: "master-three-layer-handover",
    summary: "Lifferlas, Miros, Oren, and Zi Liang are paired to the players for the Goldenfields attack mechanic.",
  },
  {
    id: "fact-shalvus-private",
    title: "Shalvus DM-Private",
    layer: "L3",
    canonStatus: "DM-private",
    sourceId: "master-three-layer-handover",
    summary: "Shalvus material is DM-private and must not appear in player-facing summaries.",
  },
];
