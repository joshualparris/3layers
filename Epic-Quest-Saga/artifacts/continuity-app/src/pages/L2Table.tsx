import { useState } from "react";
import { Users, Home, Clock, Heart, AlertTriangle } from "lucide-react";
import type { AppState, L2State } from "@/data/initialState";

interface L2TableProps {
  state: AppState;
  onUpdateL2: (l2: L2State) => void;
}

export function L2Table({ state, onUpdateL2 }: L2TableProps) {
  const { l2 } = state;
  const [editingAnchor, setEditingAnchor] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [anchorValue, setAnchorValue] = useState(l2.anchor);
  const [scheduleValue, setScheduleValue] = useState(l2.schedule);
  const [editingHouse, setEditingHouse] = useState(false);
  const [houseValue, setHouseValue] = useState(l2.houseNotes);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-amber-400 border border-amber-500/40 rounded px-2 py-0.5 bg-amber-500/10">L2 · OG Table</span>
        <div>
          <h1 className="text-xl font-semibold">Simulated Table — Dubbo</h1>
          <p className="text-xs text-muted-foreground">Parallel-timeline Josh Parris in Dubbo with friends</p>
        </div>
      </div>

      {/* Anchor + Schedule */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border border-amber-500/30 bg-card p-4" data-testid="l2-anchor">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Current Anchor</span>
            </div>
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => { setEditingAnchor(!editingAnchor); setAnchorValue(l2.anchor); }}
              data-testid="button-edit-anchor"
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
                data-testid="input-anchor"
              />
              <button
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
                onClick={() => { onUpdateL2({ ...l2, anchor: anchorValue }); setEditingAnchor(false); }}
                data-testid="button-save-anchor"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-sm text-amber-200/90 leading-relaxed">{l2.anchor}</p>
          )}
        </div>

        <div className="rounded border border-border bg-card p-4" data-testid="l2-schedule">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold">Schedule</span>
            </div>
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => { setEditingSchedule(!editingSchedule); setScheduleValue(l2.schedule); }}
              data-testid="button-edit-schedule"
            >
              {editingSchedule ? "cancel" : "edit"}
            </button>
          </div>
          {editingSchedule ? (
            <div className="space-y-2">
              <textarea
                className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
                rows={2}
                value={scheduleValue}
                onChange={(e) => setScheduleValue(e.target.value)}
                data-testid="input-schedule"
              />
              <button
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
                onClick={() => { onUpdateL2({ ...l2, schedule: scheduleValue }); setEditingSchedule(false); }}
                data-testid="button-save-schedule"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{l2.schedule}</p>
          )}
        </div>
      </div>

      {/* OG Josh summary */}
      <div className="rounded border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-primary" />
          <h2 className="text-sm font-semibold">OG Josh — Josh Parris</h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{l2.joshSummary}</p>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="bg-secondary/50 rounded p-2">
            <p className="text-muted-foreground">Work status</p>
            <p className="font-medium">Forced leave</p>
            <p className="text-muted-foreground">until mid-June 2026</p>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <p className="text-muted-foreground">Parris Tech</p>
            <p className="font-medium">~$20k/month</p>
            <p className="text-muted-foreground">net income</p>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <p className="text-muted-foreground">Currawong AI</p>
            <p className="font-medium">40% equity</p>
            <p className="text-muted-foreground">CTO-ish role</p>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <p className="text-muted-foreground">Inheritance</p>
            <p className="font-medium">$500k</p>
            <p className="text-muted-foreground">from great-uncle Mal</p>
          </div>
        </div>
      </div>

      {/* Table members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-primary" />
          <h2 className="text-sm font-semibold">Table Members</h2>
        </div>
        <div className="space-y-2">
          {l2.tablemembers.map((member, i) => (
            <div key={i} className="rounded border border-border bg-card px-3 py-2.5" data-testid={`member-card-${i}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-xs text-primary font-mono">{member.character}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              {member.notes && (
                <p className="text-xs text-muted-foreground mt-1.5 border-t border-border pt-1.5">{member.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Relationships */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={14} className="text-rose-400" />
          <h2 className="text-sm font-semibold">Relationships</h2>
        </div>
        <div className="space-y-2">
          {l2.relationships.map((rel, i) => (
            <div key={i} className={`rounded border px-3 py-2.5 ${rel.status.includes("romantic") ? "border-rose-500/30 bg-rose-500/5" : "border-border bg-card"}`} data-testid={`relationship-card-${i}`}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{rel.name}</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${rel.status.includes("romantic") ? "text-rose-300 bg-rose-500/15" : "text-muted-foreground bg-secondary"}`}>
                  {rel.status}
                </span>
                {rel.status.includes("unresolved") && <AlertTriangle size={12} className="text-orange-400" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{rel.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* House */}
      <div className="rounded border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Home size={14} className="text-primary" />
            <h2 className="text-sm font-semibold">92 Lakeside Circuit</h2>
          </div>
          <button
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => { setEditingHouse(!editingHouse); setHouseValue(l2.houseNotes); }}
            data-testid="button-edit-house"
          >
            {editingHouse ? "cancel" : "edit"}
          </button>
        </div>
        {editingHouse ? (
          <div className="space-y-2">
            <textarea
              className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
              rows={5}
              value={houseValue}
              onChange={(e) => setHouseValue(e.target.value)}
              data-testid="input-house"
            />
            <button
              className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
              onClick={() => { onUpdateL2({ ...l2, houseNotes: houseValue }); setEditingHouse(false); }}
              data-testid="button-save-house"
            >
              Save
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{l2.houseNotes}</p>
        )}
      </div>

      {/* Layer bleed warning */}
      <div className="rounded border border-yellow-500/30 bg-yellow-500/5 p-3">
        <p className="text-xs font-semibold text-yellow-400 mb-1">Layer separation reminder</p>
        <p className="text-xs text-muted-foreground">Real Josh ≠ OG Josh. Do not collapse L1 and L2. OG Josh's life (house, wealth, relationships, cat) does not belong to the real user.</p>
      </div>
    </div>
  );
}
