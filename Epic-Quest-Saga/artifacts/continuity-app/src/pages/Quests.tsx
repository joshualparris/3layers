import { useState } from "react";
import { CheckSquare, Plus, Circle, CheckCircle2 } from "lucide-react";
import { CanonBadge, CANON_OPTIONS } from "@/components/CanonBadge";
import type { AppState, Quest, Layer, CanonStatus } from "@/data/initialState";

interface QuestsProps {
  state: AppState;
  onUpdateQuests: (quests: Quest[]) => void;
}

const STATUS_STYLES: Record<Quest["status"], string> = {
  active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  pending: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  resolved: "text-muted-foreground bg-secondary border-border",
  failed: "text-red-400 bg-red-500/10 border-red-500/30",
};

const LAYER_STYLES: Record<Layer, string> = {
  L1: "text-slate-400 bg-slate-500/10",
  L2: "text-amber-400 bg-amber-500/10",
  L3: "text-emerald-400 bg-emerald-500/10",
};

export function Quests({ state, onUpdateQuests }: QuestsProps) {
  const [filterStatus, setFilterStatus] = useState<Quest["status"] | "all">("all");
  const [filterLayer, setFilterLayer] = useState<Layer | "all">("all");
  const [showNew, setShowNew] = useState(false);
  const [newQuest, setNewQuest] = useState<Partial<Quest>>({
    title: "", layer: "L3", status: "active", description: "", canonStatus: "table-canon", tasks: [], notes: "",
  });
  const [newTaskText, setNewTaskText] = useState("");

  const filtered = state.quests.filter((q) => {
    if (filterStatus !== "all" && q.status !== filterStatus) return false;
    if (filterLayer !== "all" && q.layer !== filterLayer) return false;
    return true;
  });

  const updateQuest = (updated: Quest) => {
    onUpdateQuests(state.quests.map((q) => (q.id === updated.id ? updated : q)));
  };

  const toggleTask = (quest: Quest, taskIdx: number) => {
    const tasks = quest.tasks.map((t, i) => (i === taskIdx ? { ...t, done: !t.done } : t));
    updateQuest({ ...quest, tasks });
  };

  const completeAllTasks = (quest: Quest) => {
    if (quest.tasks.length === 0) return;
    const tasks = quest.tasks.map((t) => ({ ...t, done: true }));
    updateQuest({ ...quest, tasks, status: "resolved" });
  };

  const syncQuestStatus = (quest: Quest) => {
    if (quest.tasks.length === 0) return;
    const doneTasks = quest.tasks.filter((t) => t.done).length;
    if (doneTasks === quest.tasks.length) {
      updateQuest({ ...quest, status: "resolved" });
      return;
    }
    if (doneTasks > 0 && quest.status === "resolved") {
      updateQuest({ ...quest, status: "active" });
    }
  };

  const saveNew = () => {
    if (!newQuest.title) return;
    const q: Quest = {
      id: `quest-${Date.now()}`,
      title: newQuest.title!,
      layer: newQuest.layer as Layer,
      status: newQuest.status as Quest["status"],
      description: newQuest.description || "",
      canonStatus: newQuest.canonStatus as CanonStatus,
      tasks: newQuest.tasks || [],
      notes: newQuest.notes || "",
    };
    onUpdateQuests([...state.quests, q]);
    setShowNew(false);
    setNewQuest({ title: "", layer: "L3", status: "active", description: "", canonStatus: "table-canon", tasks: [], notes: "" });
  };

  const addNewTask = () => {
    if (!newTaskText.trim()) return;
    setNewQuest((prev) => ({ ...prev, tasks: [...(prev.tasks || []), { text: newTaskText.trim(), done: false }] }));
    setNewTaskText("");
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <CheckSquare size={18} className="text-primary" />
          <div>
            <h1 className="text-xl font-semibold">Quest Tracker</h1>
            <p className="text-xs text-muted-foreground">{state.quests.filter((q) => q.status === "active").length} active, {state.quests.filter((q) => q.status === "pending").length} pending</p>
          </div>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded"
          data-testid="button-new-quest"
        >
          <Plus size={13} /> New Quest
        </button>
      </div>

      {/* New quest form */}
      {showNew && (
        <div className="rounded border border-primary/30 bg-card p-4 space-y-3">
          <p className="text-sm font-semibold">New Quest</p>
          <input
            type="text"
            placeholder="Quest title"
            className="w-full text-sm bg-secondary border border-border rounded px-3 py-1.5 text-foreground"
            value={newQuest.title || ""}
            onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
            data-testid="input-new-quest-title"
          />
          <textarea
            placeholder="Description..."
            className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
            rows={2}
            value={newQuest.description || ""}
            onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
            data-testid="input-new-quest-desc"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Layer</label>
              <select className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground" value={newQuest.layer} onChange={(e) => setNewQuest({ ...newQuest, layer: e.target.value as Layer })} data-testid="select-new-quest-layer">
                <option value="L1">L1 — OOG</option>
                <option value="L2">L2 — OG Table</option>
                <option value="L3">L3 — In-Game</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Status</label>
              <select className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground" value={newQuest.status} onChange={(e) => setNewQuest({ ...newQuest, status: e.target.value as Quest["status"] })} data-testid="select-new-quest-status">
                <option value="active">active</option>
                <option value="pending">pending</option>
                <option value="resolved">resolved</option>
                <option value="failed">failed</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Canon</label>
              <select className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground" value={newQuest.canonStatus} onChange={(e) => setNewQuest({ ...newQuest, canonStatus: e.target.value as CanonStatus })} data-testid="select-new-quest-canon">
                {CANON_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {/* Tasks */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Tasks</p>
            {(newQuest.tasks || []).map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs py-0.5">
                <Circle size={11} className="text-muted-foreground" />
                <span>{t.text}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Add task..."
                className="flex-1 text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addNewTask(); } }}
                data-testid="input-new-task"
              />
              <button className="text-xs bg-secondary border border-border px-2 rounded hover:bg-border" onClick={addNewTask} data-testid="button-add-task">Add</button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded disabled:opacity-50" onClick={saveNew} disabled={!newQuest.title} data-testid="button-save-quest">Save Quest</button>
            <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => setShowNew(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <select className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as Quest["status"] | "all")} data-testid="select-filter-status">
          <option value="all">All status</option>
          <option value="active">active</option>
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
          <option value="failed">failed</option>
        </select>
        <select className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground" value={filterLayer} onChange={(e) => setFilterLayer(e.target.value as Layer | "all")} data-testid="select-filter-layer">
          <option value="all">All layers</option>
          <option value="L1">L1 — OOG</option>
          <option value="L2">L2 — OG Table</option>
          <option value="L3">L3 — In-Game</option>
        </select>
      </div>

      {/* Quests list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-xs text-muted-foreground">No quests match the current filters.</div>
        )}
        {filtered.map((quest) => {
          const doneTasks = quest.tasks.filter((t) => t.done).length;
          return (
            <div key={quest.id} className={`rounded border bg-card p-4 ${quest.canonStatus === "DM-private" ? "border-slate-500/30" : "border-border"}`} data-testid={`quest-card-${quest.id}`}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${STATUS_STYLES[quest.status]}`}>{quest.status}</span>
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${LAYER_STYLES[quest.layer]}`}>{quest.layer}</span>
                    <span className="text-sm font-semibold">{quest.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{quest.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CanonBadge status={quest.canonStatus} />
                  <select
                    className="text-xs bg-secondary border border-border rounded px-1.5 py-0.5 text-foreground"
                    value={quest.status}
                    onChange={(e) => updateQuest({ ...quest, status: e.target.value as Quest["status"] })}
                    data-testid={`select-quest-status-${quest.id}`}
                  >
                    <option value="active">active</option>
                    <option value="pending">pending</option>
                    <option value="resolved">resolved</option>
                    <option value="failed">failed</option>
                  </select>
                </div>
              </div>

              {quest.tasks.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <span className="text-xs font-mono text-muted-foreground">{doneTasks}/{quest.tasks.length}</span>
                    <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: quest.tasks.length > 0 ? `${Math.round((doneTasks / quest.tasks.length) * 100)}%` : "0%" }}
                      />
                    </div>
                    <button
                      className="text-[11px] text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 rounded px-1.5 py-0.5"
                      onClick={() => completeAllTasks(quest)}
                      data-testid={`button-complete-all-${quest.id}`}
                    >
                      Complete all
                    </button>
                    <button
                      className="text-[11px] text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5"
                      onClick={() => syncQuestStatus(quest)}
                      data-testid={`button-sync-status-${quest.id}`}
                    >
                      Sync status
                    </button>
                  </div>
                  {quest.tasks.map((task, i) => (
                    <button
                      key={i}
                      className="flex items-start gap-2 text-left w-full"
                      onClick={() => toggleTask(quest, i)}
                      data-testid={`task-toggle-${quest.id}-${i}`}
                    >
                      {task.done
                        ? <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        : <Circle size={14} className="text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                      }
                      <span className={`text-xs ${task.done ? "line-through text-muted-foreground/50" : "text-foreground/80"}`}>{task.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {quest.notes && (
                <div className="mt-3 border-t border-border pt-2.5">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">{quest.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
