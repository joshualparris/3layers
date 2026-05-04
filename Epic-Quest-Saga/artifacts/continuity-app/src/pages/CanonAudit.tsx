import { useMemo, useState } from "react";
import { FileSearch } from "lucide-react";
import { CanonBadge, CANON_OPTIONS } from "@/components/CanonBadge";
import type { AppState, CanonStatus, Layer } from "@/data/initialState";

interface CanonAuditProps {
  state: AppState;
}

type AuditRow = {
  id: string;
  kind: "quest" | "note" | "fact";
  title: string;
  layer: Layer;
  canonStatus: CanonStatus;
};

export function CanonAudit({ state }: CanonAuditProps) {
  const [layerFilter, setLayerFilter] = useState<Layer | "all">("all");
  const [canonFilter, setCanonFilter] = useState<CanonStatus | "all">("all");

  const rows = useMemo<AuditRow[]>(() => {
    const quests: AuditRow[] = state.quests.map((q) => ({
      id: `quest-${q.id}`,
      kind: "quest",
      title: q.title,
      layer: q.layer,
      canonStatus: q.canonStatus,
    }));
    const notes: AuditRow[] = state.notes.map((n) => ({
      id: `note-${n.id}`,
      kind: "note",
      title: n.title,
      layer: n.layer,
      canonStatus: n.canonStatus,
    }));
    const facts: AuditRow[] = state.canonFacts.map((f) => ({
      id: `fact-${f.id}`,
      kind: "fact",
      title: f.title,
      layer: f.layer,
      canonStatus: f.canonStatus,
    }));
    return [...quests, ...notes, ...facts];
  }, [state]);

  const filteredRows = rows.filter((r) => {
    if (layerFilter !== "all" && r.layer !== layerFilter) return false;
    if (canonFilter !== "all" && r.canonStatus !== canonFilter) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <FileSearch size={18} className="text-primary" />
        <div>
          <h1 className="text-xl font-semibold">Canon Audit</h1>
          <p className="text-xs text-muted-foreground">Unified view across quests, notes, and canon facts.</p>
        </div>
      </div>

      <div className="rounded border border-border bg-card p-3 flex flex-wrap gap-2">
        <select
          className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
          value={layerFilter}
          onChange={(e) => setLayerFilter(e.target.value as Layer | "all")}
          data-testid="select-canon-audit-layer"
        >
          <option value="all">All layers</option>
          <option value="L1">L1</option>
          <option value="L2">L2</option>
          <option value="L3">L3</option>
        </select>
        <select
          className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
          value={canonFilter}
          onChange={(e) => setCanonFilter(e.target.value as CanonStatus | "all")}
          data-testid="select-canon-audit-status"
        >
          <option value="all">All statuses</option>
          {CANON_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground self-center ml-auto">{filteredRows.length} records</span>
      </div>

      <div className="space-y-2">
        {filteredRows.map((row) => (
          <div key={row.id} className="rounded border border-border bg-card px-3 py-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-muted-foreground font-mono uppercase">{row.kind}</span>
                <span className="text-[11px] text-muted-foreground font-mono">{row.layer}</span>
              </div>
              <p className="text-sm font-medium truncate">{row.title}</p>
            </div>
            <CanonBadge status={row.canonStatus} />
          </div>
        ))}
        {filteredRows.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-8">No records match the selected filters.</div>
        )}
      </div>
    </div>
  );
}
