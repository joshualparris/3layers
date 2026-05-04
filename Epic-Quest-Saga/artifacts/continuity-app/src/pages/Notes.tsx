import { useState } from "react";
import { FileText, Plus, Trash2, Lock } from "lucide-react";
import { CanonBadge, CANON_OPTIONS } from "@/components/CanonBadge";
import type { AppState, Note, Layer, CanonStatus } from "@/data/initialState";

interface NotesProps {
  state: AppState;
  onUpdateNotes: (notes: Note[]) => void;
}

const LAYER_LABELS: Record<Layer, string> = { L1: "OOG", L2: "OG Table", L3: "In-Game" };
const LAYER_STYLES: Record<Layer, string> = {
  L1: "text-slate-400 bg-slate-500/10",
  L2: "text-amber-400 bg-amber-500/10",
  L3: "text-emerald-400 bg-emerald-500/10",
};

export function Notes({ state, onUpdateNotes }: NotesProps) {
  const [filterLayer, setFilterLayer] = useState<Layer | "all">("all");
  const [filterCanon, setFilterCanon] = useState<CanonStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showOnlyOpenCanon, setShowOnlyOpenCanon] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newNote, setNewNote] = useState<Partial<Note>>({ layer: "L3", canonStatus: "table-canon", title: "", content: "", tags: [] });

  const filtered = state.notes.filter((n) => {
    if (filterLayer !== "all" && n.layer !== filterLayer) return false;
    if (filterCanon !== "all" && n.canonStatus !== filterCanon) return false;
    if (showOnlyOpenCanon && !["unresolved", "inferred"].includes(n.canonStatus)) return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const saveNew = () => {
    if (!newNote.title || !newNote.content) return;
    const note: Note = {
      id: `note-${Date.now()}`,
      title: newNote.title!,
      content: newNote.content!,
      layer: newNote.layer as Layer,
      canonStatus: newNote.canonStatus as CanonStatus,
      tags: newNote.tags || [],
      createdAt: new Date().toISOString(),
    };
    onUpdateNotes([...state.notes, note]);
    setShowNew(false);
    setNewNote({ layer: "L3", canonStatus: "table-canon", title: "", content: "", tags: [] });
  };

  const deleteNote = (id: string) => {
    onUpdateNotes(state.notes.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-primary" />
          <div>
            <h1 className="text-xl font-semibold">Notes &amp; Canon Log</h1>
            <p className="text-xs text-muted-foreground">{state.notes.length} entries — tagged by layer and canon status</p>
          </div>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded"
          data-testid="button-new-note"
        >
          <Plus size={13} /> New Note
        </button>
      </div>

      {/* New note form */}
      {showNew && (
        <div className="rounded border border-primary/30 bg-card p-4 space-y-3">
          <p className="text-sm font-semibold">New Note</p>
          <input
            type="text"
            placeholder="Title"
            className="w-full text-sm bg-secondary border border-border rounded px-3 py-1.5 text-foreground"
            value={newNote.title || ""}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            data-testid="input-new-note-title"
          />
          <textarea
            placeholder="Content..."
            className="w-full text-xs bg-secondary border border-border rounded p-2 text-foreground resize-none"
            rows={5}
            value={newNote.content || ""}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            data-testid="input-new-note-content"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Layer</label>
              <select
                className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground"
                value={newNote.layer}
                onChange={(e) => setNewNote({ ...newNote, layer: e.target.value as Layer })}
                data-testid="select-new-note-layer"
              >
                <option value="L1">L1 — OOG</option>
                <option value="L2">L2 — OG Table</option>
                <option value="L3">L3 — In-Game</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Canon Status</label>
              <select
                className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground"
                value={newNote.canonStatus}
                onChange={(e) => setNewNote({ ...newNote, canonStatus: e.target.value as CanonStatus })}
                data-testid="select-new-note-canon"
              >
                {CANON_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded disabled:opacity-50"
              onClick={saveNew}
              disabled={!newNote.title || !newNote.content}
              data-testid="button-save-new-note"
            >
              Save Note
            </button>
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setShowNew(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <input
          type="search"
          placeholder="Search notes..."
          className="text-xs bg-secondary border border-border rounded px-3 py-1.5 text-foreground flex-1 min-w-40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="input-search-notes"
        />
        <select
          className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
          value={filterLayer}
          onChange={(e) => setFilterLayer(e.target.value as Layer | "all")}
          data-testid="select-filter-layer"
        >
          <option value="all">All layers</option>
          <option value="L1">L1 — OOG</option>
          <option value="L2">L2 — OG Table</option>
          <option value="L3">L3 — In-Game</option>
        </select>
        <select
          className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
          value={filterCanon}
          onChange={(e) => setFilterCanon(e.target.value as CanonStatus | "all")}
          data-testid="select-filter-canon"
        >
          <option value="all">All canon</option>
          {CANON_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          className={`text-xs border rounded px-2 py-1.5 ${showOnlyOpenCanon ? "border-orange-500/40 text-orange-300 bg-orange-500/10" : "border-border text-muted-foreground hover:text-foreground"}`}
          onClick={() => setShowOnlyOpenCanon((prev) => !prev)}
          data-testid="button-filter-open-canon"
        >
          {showOnlyOpenCanon ? "Showing open canon" : "Open canon only"}
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-xs text-muted-foreground">No notes match the current filters.</div>
        )}
        {filtered.map((note) => (
          <div key={note.id} className="rounded border border-border bg-card" data-testid={`note-card-${note.id}`}>
            <button
              className="w-full px-4 py-3 flex items-start justify-between gap-2 text-left"
              onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
              data-testid={`button-expand-note-${note.id}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${LAYER_STYLES[note.layer]}`}>{note.layer} · {LAYER_LABELS[note.layer]}</span>
                  {note.canonStatus === "DM-private" && <Lock size={11} className="text-slate-400" />}
                  <span className="text-sm font-medium">{note.title}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <CanonBadge status={note.canonStatus} />
                  {note.tags.map((t) => (
                    <span key={t} className="text-xs text-muted-foreground bg-secondary/50 px-1 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {expandedId === note.id ? "▲" : "▼"}
              </span>
            </button>

            {expandedId === note.id && (
              <div className="px-4 pb-4 border-t border-border">
                <pre className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap pt-3 font-sans">{note.content}</pre>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{new Date(note.createdAt).toLocaleDateString("en-AU")}</span>
                  {!["note-rules", "note-zephyros", "note-nightstone", "note-shalvus", "note-rillix"].includes(note.id) && (
                    <button
                      className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1"
                      onClick={() => deleteNote(note.id)}
                      data-testid={`button-delete-note-${note.id}`}
                    >
                      <Trash2 size={11} /> Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Canon reference */}
      <div className="rounded border border-border bg-card p-4">
        <p className="text-xs font-semibold mb-2">Canon Status Reference</p>
        <div className="flex flex-wrap gap-2">
          {CANON_OPTIONS.map((s) => (
            <CanonBadge key={s} status={s} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          If unsure where a fact belongs, default to <span className="font-mono text-orange-300">unresolved</span> rather than guessing. Every fact in this system has a layer tag and a canon-status tag.
        </p>
      </div>
    </div>
  );
}
