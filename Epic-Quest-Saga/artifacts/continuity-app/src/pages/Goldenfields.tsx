import { useState } from "react";
import { Heart, Eye, EyeOff, Shield, Users, Target, Clock, AlertTriangle } from "lucide-react";

export function Goldenfields() {
  const [showDMOnly, setShowDMOnly] = useState(false);
  const [expandedNPC, setExpandedNPC] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Goldenfields Session Center</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Chapter 2 — Late night at Northfurrow's End, post-apology</p>
      </div>

      {/* Scene anchor */}
      <div className="rounded border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-emerald-400" />
          <h2 className="text-sm font-semibold text-emerald-400">Scene Anchor</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-1">
          <span className="font-mono text-emerald-300">Late night, Northfurrow's End, Goldenfields</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Party sleeping after Alphie's apology to Wren. Giant attack has not begun. Miros news delivery ready to begin after rest.
        </p>
      </div>

      {/* DM Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowDMOnly(!showDMOnly)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded ${
            showDMOnly
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-slate-600 hover:bg-slate-700 text-white"
          }`}
        >
          {showDMOnly ? <EyeOff size={12} /> : <Eye size={12} />}
          {showDMOnly ? "DM-Only Visible" : "Show DM Material"}
        </button>
      </div>

      {/* Miros Delivery Quest */}
      <div className="rounded border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart size={14} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-blue-400">Miros Delivery</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Wren delivers news of Lathan and Melantha Xelbrin's deaths. Alphie supports quietly. Rillix (tressym) is returned.
        </p>

        <div className="space-y-2">
          <div className="rounded bg-background/50 border border-blue-500/20 p-2">
            <p className="text-xs font-semibold text-blue-300 mb-1">Emotional Beats:</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Wren takes the lead; Alphie stands nearby, quiet and supportive</li>
              <li>• Miros deserves a clean hour to grieve before the world makes him do anything else</li>
              <li>• Rillix will reach for Miros after grief acknowledgement</li>
              <li>• Let natural silence happen — don't fill it</li>
            </ul>
          </div>

          <div className="rounded bg-background/50 border border-blue-500/20 p-2">
            <p className="text-xs font-semibold text-blue-300 mb-1">Tactical Notes:</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Ben controls Miros during Goldenfields attack</li>
              <li>• Miros is NPC paired with Ben's Dorrin (initiative linked)</li>
              <li>• If Miros dies during attack: major consequence for party relationships</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special NPC Assignments */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Users size={14} />
          Special NPCs — Player Control
        </h2>

        <div className="grid gap-2">
          {SPECIAL_NPCS.map((npc) => (
            <button
              key={npc.id}
              onClick={() => setExpandedNPC(expandedNPC === npc.id ? null : npc.id)}
              className={`text-left rounded border p-3 transition-all ${
                npc.dmPrivate && !showDMOnly
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              style={{
                borderColor: npc.dmPrivate && !showDMOnly ? undefined : "rgba(59, 130, 246, 0.3)",
                backgroundColor: npc.dmPrivate && !showDMOnly ? undefined : "rgba(59, 130, 246, 0.05)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{npc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Controlled by: <span className="font-mono">{npc.controlledBy}</span> • Paired with{" "}
                    <span className="font-mono">{npc.pairedWith}</span>
                  </p>
                </div>
                <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                  {npc.type}
                </span>
              </div>

              {expandedNPC === npc.id && (
                <div className="mt-3 pt-3 border-t border-current border-opacity-10 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">AC / HP</p>
                      <p className="font-mono">{npc.ac} / {npc.hp}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Speed</p>
                      <p className="font-mono">{npc.speed}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-300 mb-1">Notes:</p>
                    <p className="text-xs text-muted-foreground">{npc.notes}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Goldenfields Defence */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Shield size={14} />
          Goldenfields Defence Objectives
        </h2>

        <div className="space-y-2">
          {DEFENCE_OBJECTIVES.map((obj) => (
            <div key={obj.id} className="rounded border border-amber-500/30 bg-amber-500/5 p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold">{obj.title}</h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  obj.status === "active" ? "bg-emerald-500/20 text-emerald-300" :
                  obj.status === "threatened" ? "bg-yellow-500/20 text-yellow-300" :
                  "bg-slate-500/20 text-slate-300"
                }`}>
                  {obj.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{obj.description}</p>
              {obj.consequence && (
                <p className="text-xs text-red-300">If lost: {obj.consequence}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DM-Private Section */}
      {showDMOnly && (
        <div className="rounded border border-red-500/30 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-red-400" />
            <h2 className="text-sm font-semibold text-red-400">DM-Private Material</h2>
          </div>

          <div className="space-y-3">
            {/* Shalvus */}
            <div className="rounded border border-red-500/30 bg-background/50 p-3">
              <h3 className="text-xs font-semibold text-red-300 mb-1">Shalvus Martholio</h3>
              <p className="text-xs text-muted-foreground mb-2">Suspected traitor. DM decision on involvement.</p>
              <p className="text-xs text-red-200">
                Do not reveal in player-facing narration. Marcus to handle implementation per campaign logic.
              </p>
            </div>

            {/* Naxene */}
            <div className="rounded border border-red-500/30 bg-background/50 p-3">
              <h3 className="text-xs font-semibold text-red-300 mb-1">Naxene Drathkala</h3>
              <p className="text-xs text-muted-foreground">
                Currently off-board unless needed. Summon only if party requires reinforcement or plot demands.
              </p>
            </div>

            {/* Giant Strategy */}
            <div className="rounded border border-red-500/30 bg-background/50 p-3">
              <h3 className="text-xs font-semibold text-red-300 mb-1">Giant Attack Trigger</h3>
              <p className="text-xs text-muted-foreground">
                Waiting for: [Party rest completion / Morning sun / Specific event]. Marcus controls timing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Combat Mode Notice */}
      <div className="rounded border border-yellow-500/30 bg-yellow-500/5 p-3">
        <p className="text-xs font-semibold text-yellow-400 mb-1">Session Mode Prep</p>
        <p className="text-xs text-muted-foreground">
          When attack begins: Switch to large text layout with active NPC status, party HP, and initiative tracker visible.
        </p>
      </div>
    </div>
  );
}

const SPECIAL_NPCS = [
  {
    id: "lifferlas",
    name: "Lifferlas",
    controlledBy: "Josh (Alphie player)",
    pairedWith: "Alphie (Josh's PC)",
    type: "Special NPC",
    ac: 14,
    hp: 22,
    speed: "30 ft.",
    dmPrivate: false,
    notes:
      "Alphie's special NPC during Goldenfields attack. Acts on Alphie's initiative, immediately after Alphie's action. Survives = unlocked relationship.",
  },
  {
    id: "miros",
    name: "Miros Xelbrin",
    controlledBy: "Ben (Dorrin player)",
    pairedWith: "Dorrin (Ben's PC)",
    type: "Special NPC (Neutral)",
    ac: 12,
    hp: 18,
    speed: "30 ft.",
    dmPrivate: false,
    notes:
      "Ben's special NPC during Goldenfields attack. Acts on Dorrin's initiative, immediately after. Miros is grieving and reluctant to fight — but will defend. If killed: major party consequence.",
  },
  {
    id: "oren",
    name: "Oren Yogilvy",
    controlledBy: "Talia (Wren player)",
    pairedWith: "Wren (Talia's PC)",
    type: "Special NPC",
    ac: 16,
    hp: 27,
    speed: "30 ft.",
    dmPrivate: false,
    notes:
      "Talia's special NPC during Goldenfields attack. Acts on Wren's initiative, immediately after. Oren is a fighter — confident and skilled.",
  },
  {
    id: "zi_liang",
    name: "Zi Liang",
    controlledBy: "Naomi (Kella player)",
    pairedWith: "Kella (Naomi's PC)",
    type: "Special NPC",
    ac: 15,
    hp: 20,
    speed: "30 ft.",
    dmPrivate: false,
    notes:
      "Naomi's special NPC during Goldenfields attack. Acts on Kella's initiative, immediately after. Zi Liang is a mage-warrior hybrid.",
  },
];

const DEFENCE_OBJECTIVES = [
  {
    id: "obj-tower",
    title: "Tower of Zephyros — Evacuate",
    status: "active",
    description: "Zephyros stays in tower. Party must secure safe evacuation. Tower is 1,000 feet up — fall damage is catastrophic.",
    consequence: "Zephyros trapped or killed; loss of ally and resource hub",
  },
  {
    id: "obj-villagers",
    title: "Town Villagers — Defend",
    status: "active",
    description: "Goldenfields villagers huddle in town square. Giant attack targets them.",
    consequence: "Civilian casualties; town morale broken; future quest complications",
  },
  {
    id: "obj-granary",
    title: "Granary — Protect Supplies",
    status: "active",
    description: "Winter stores in granary. Giants will target food supplies.",
    consequence: "Starvation risk for Goldenfields through winter; town owes party major debt",
  },
  {
    id: "obj-party",
    title: "Party Survival",
    status: "threatened",
    description: "Party is level 5 facing giants. Ensure engagement is survivable.",
    consequence: "Party wipe or major character death; campaign pause or pivot needed",
  },
];
