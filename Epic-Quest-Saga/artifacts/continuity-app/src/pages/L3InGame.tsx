import { useState } from "react";
import { Map, AlertTriangle, Clock, Shield } from "lucide-react";
import { CanonBadge } from "@/components/CanonBadge";
import type { AppState, L3State } from "@/data/initialState";

interface L3InGameProps {
  state: AppState;
  onUpdateL3: (l3: L3State) => void;
}

export function L3InGame({ state, onUpdateL3 }: L3InGameProps) {
  const { l3 } = state;
  const [editingAnchor, setEditingAnchor] = useState(false);
  const [editingSession, setEditingSession] = useState(false);
  const [anchorValue, setAnchorValue] = useState(l3.anchor);
  const [sessionValue, setSessionValue] = useState(l3.sessionNotes);

  const l3Quests = state.quests.filter((q) => q.layer === "L3");

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-emerald-400 border border-emerald-500/40 rounded px-2 py-0.5 bg-emerald-500/10">L3 · In-Game</span>
        <div>
          <h1 className="text-xl font-semibold">Storm King's Thunder</h1>
          <p className="text-xs text-muted-foreground">{l3.campaign} — {l3.chapter}</p>
        </div>
      </div>

      {/* Anchor + status */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border border-emerald-500/30 bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Scene Anchor</span>
            </div>
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => { setEditingAnchor(!editingAnchor); setAnchorValue(l3.anchor); }}
              data-testid="button-edit-l3-anchor"
            >
              {editingAnchor ? "cancel" : "edit"}
            </button>
          </div>
          {editingAnchor ? (
            <div className="space-y-2">
              <textarea
                className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
                rows={3}
                value={anchorValue}
                onChange={(e) => setAnchorValue(e.target.value)}
                data-testid="input-l3-anchor"
              />
              <button
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
                onClick={() => { onUpdateL3({ ...l3, anchor: anchorValue }); setEditingAnchor(false); }}
                data-testid="button-save-l3-anchor"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-sm text-emerald-200/90 leading-relaxed">{l3.anchor}</p>
          )}
        </div>

        <div className="rounded border border-border bg-card p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{l3.location}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Chapter</p>
            <p className="text-sm font-medium">{l3.chapter}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">Giant attack</p>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${l3.attackStarted ? "text-red-300 bg-red-500/15" : "text-yellow-300 bg-yellow-500/15"}`}>
              {l3.attackStarted ? "ACTIVE" : "not started"}
            </span>
            <button
              className="text-xs text-muted-foreground hover:text-foreground underline"
              onClick={() => onUpdateL3({ ...l3, attackStarted: !l3.attackStarted })}
              data-testid="button-toggle-attack"
            >
              toggle
            </button>
          </div>
        </div>
      </div>

      {/* Active quest */}
      <div className="rounded border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Map size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">Active Quest</span>
          <CanonBadge status="table-canon" />
        </div>
        <p className="text-sm leading-relaxed">{l3.activeQuest}</p>
        <div className="mt-3 border-t border-emerald-500/20 pt-3">
          <p className="text-xs text-emerald-300/80 italic">{l3.moralFraming}</p>
        </div>
      </div>

      {/* Special NPC mechanic */}
      <div className="rounded border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-primary" />
          <h2 className="text-sm font-semibold">Special NPC Mechanic — Chapter 2</h2>
          <CanonBadge status="source-canon" />
        </div>
        <p className="text-xs text-muted-foreground whitespace-pre-line mb-4">{l3.npcMechanicNotes}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {state.specialNPCs.map((npc) => {
            const pct = Math.round((npc.hp / npc.maxHp) * 100);
            const barColor = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500";
            return (
              <div key={npc.id} className="rounded border border-border bg-secondary/30 p-2.5" data-testid={`npc-card-${npc.id}`}>
                <p className="text-xs font-medium leading-tight">{npc.name}</p>
                <p className="text-xs text-muted-foreground">{npc.controlledBy} → {npc.pairedWith.split(" ")[0]}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{npc.hp}/{npc.maxHp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* L3 quests */}
      <div>
        <h2 className="text-sm font-semibold mb-3">In-Game Quests</h2>
        <div className="space-y-2">
          {l3Quests.map((quest) => (
            <div key={quest.id} className="rounded border border-border bg-card p-3" data-testid={`l3-quest-${quest.id}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-1 rounded font-mono ${
                      quest.status === "active" ? "text-emerald-400 bg-emerald-500/10" :
                      quest.status === "pending" ? "text-yellow-400 bg-yellow-500/10" :
                      "text-muted-foreground bg-secondary"
                    }`}>{quest.status}</span>
                    <span className="text-sm font-medium">{quest.title}</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    {quest.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className={task.done ? "text-emerald-400" : "text-border"}>
                          {task.done ? "✓" : "○"}
                        </span>
                        <span className={task.done ? "line-through text-muted-foreground/50" : ""}>{task.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <CanonBadge status={quest.canonStatus} className="flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session notes */}
      <div className="rounded border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Session Notes</h2>
          <button
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => { setEditingSession(!editingSession); setSessionValue(l3.sessionNotes); }}
            data-testid="button-edit-session"
          >
            {editingSession ? "cancel" : "edit"}
          </button>
        </div>
        {editingSession ? (
          <div className="space-y-2">
            <textarea
              className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
              rows={5}
              value={sessionValue}
              onChange={(e) => setSessionValue(e.target.value)}
              data-testid="input-session-notes"
            />
            <button
              className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
              onClick={() => { onUpdateL3({ ...l3, sessionNotes: sessionValue }); setEditingSession(false); }}
              data-testid="button-save-session"
            >
              Save
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{l3.sessionNotes}</p>
        )}
      </div>

      {/* DM private warning */}
      <div className="rounded border border-slate-500/30 bg-slate-500/5 p-3 flex items-start gap-2">
        <AlertTriangle size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-slate-400">DM-Private</p>
          <p className="text-xs text-muted-foreground">Shalvus Martholio: suspected traitor. Do not reveal in player-facing narration. Marcus handles as needed.</p>
        </div>
      </div>
    </div>
  );
}
