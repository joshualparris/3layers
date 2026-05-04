import { Link } from "wouter";
import { useState, useRef } from "react";
import { AlertTriangle, Clock, Map, Users, ChevronRight, Lock, Download, Upload } from "lucide-react";
import { CanonBadge } from "@/components/CanonBadge";
import { downloadBackup, readBackupFile } from "@/lib/backup";
import type { AppState } from "@/data/initialState";

interface DashboardProps {
  state: AppState;
}

export function Dashboard({ state }: DashboardProps) {
  const activeQuests = state.quests.filter((q) => q.status === "active");
  const unresolvedNotes = state.notes.filter((n) => n.canonStatus === "unresolved" || n.canonStatus === "DM-private");
  const unresolvedQuests = state.quests.filter((q) => q.status === "active" && q.canonStatus === "unresolved");
  const pendingQuests = state.quests.filter((q) => q.status === "pending");
  const lowHpCharacters = state.characters.filter((c) => (c.hp / c.maxHp) <= 0.5);
  const sessionReady = unresolvedQuests.length === 0 && unresolvedNotes.filter((n) => n.canonStatus === "unresolved").length === 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Three-layer continuity — current anchors at a glance</p>
      </div>

      {/* Layer anchors */}
      <div className="grid gap-3 md:grid-cols-3">
        {/* L1 */}
        <div className="rounded border border-slate-500/30 bg-slate-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-slate-400 border border-slate-500/50 rounded px-1.5 py-0.5">L1 · OOG</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Real Josh using Claude. Minimal focus — used for current requests, artifact creation, and meta direction.
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">Distinction: Real Josh ≠ OG Josh</p>
        </div>

        {/* L2 */}
        <Link
          href="/l2"
          className="block rounded border border-amber-500/30 bg-amber-500/5 p-4 hover:bg-amber-500/10 transition-colors"
          data-testid="anchor-l2"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-amber-400 border border-amber-500/40 rounded px-1.5 py-0.5">L2 · OG Table</span>
            <ChevronRight size={14} className="text-amber-400/60" />
          </div>
          <div className="flex items-start gap-1.5 mb-2">
            <Clock size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-200/80 leading-relaxed">{state.l2.anchor}</p>
          </div>
          <p className="text-xs text-amber-300/60">{state.l2.schedule}</p>
        </Link>

        {/* L3 */}
        <Link
          href="/l3"
          className="block rounded border border-emerald-500/30 bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition-colors"
          data-testid="anchor-l3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-emerald-400 border border-emerald-500/40 rounded px-1.5 py-0.5">L3 · In-Game</span>
            <ChevronRight size={14} className="text-emerald-400/60" />
          </div>
          <div className="flex items-start gap-1.5 mb-2">
            <Map size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-emerald-200/80 leading-relaxed">{state.l3.anchor}</p>
          </div>
          <p className="text-xs text-emerald-300/60">{state.l3.chapter} — {state.l3.location}</p>
          {!state.l3.attackStarted && (
            <p className="text-xs text-yellow-400/80 mt-1 font-mono">Giant attack: NOT started</p>
          )}
        </Link>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link
          href="/characters"
          className="rounded border border-border bg-card p-3 hover:bg-secondary/50 transition-colors block"
          data-testid="stat-characters"
        >
          <div className="flex items-center gap-2 mb-1">
            <Users size={13} className="text-primary" />
            <span className="text-xs text-muted-foreground">Characters</span>
          </div>
          <p className="text-lg font-semibold">{state.characters.length}</p>
          <p className="text-xs text-muted-foreground">PCs + {state.specialNPCs.length} special NPCs</p>
        </Link>
        <Link
          href="/quests"
          className="rounded border border-border bg-card p-3 hover:bg-secondary/50 transition-colors block"
          data-testid="stat-quests"
        >
          <div className="flex items-center gap-2 mb-1">
            <Map size={13} className="text-primary" />
            <span className="text-xs text-muted-foreground">Active Quests</span>
          </div>
          <p className="text-lg font-semibold">{activeQuests.length}</p>
          <p className="text-xs text-muted-foreground">{state.quests.filter((q) => q.status === "pending").length} pending</p>
        </Link>
        <Link
          href="/notes"
          className="rounded border border-border bg-card p-3 hover:bg-secondary/50 transition-colors block"
          data-testid="stat-notes"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={13} className="text-orange-400" />
            <span className="text-xs text-muted-foreground">Unresolved</span>
          </div>
          <p className="text-lg font-semibold text-orange-400">{unresolvedNotes.length}</p>
          <p className="text-xs text-muted-foreground">facts need attention</p>
        </Link>
        <div className="rounded border border-border bg-card p-3" data-testid="stat-layer">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={13} className="text-slate-400" />
            <span className="text-xs text-muted-foreground">DM-Private</span>
          </div>
          <p className="text-lg font-semibold text-slate-400">
            {state.notes.filter((n) => n.canonStatus === "DM-private").length}
          </p>
          <p className="text-xs text-muted-foreground">hidden from players</p>
        </div>
      </div>

      {/* Active quests summary */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Active Quests</h2>
          <Link href="/quests" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
            All quests <ChevronRight size={12} />
          </Link>
        </div>
        <div className="space-y-2">
          {activeQuests.map((quest) => (
            <div key={quest.id} className="rounded border border-border bg-card px-3 py-2.5 flex items-start justify-between gap-3" data-testid={`quest-card-${quest.id}`}>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-mono px-1 rounded ${quest.layer === "L3" ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>{quest.layer}</span>
                  <span className="text-sm font-medium truncate">{quest.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{quest.description}</p>
              </div>
              <CanonBadge status={quest.canonStatus} className="flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Session readiness */}
      <div className={`rounded border p-3 ${sessionReady ? "border-emerald-500/30 bg-emerald-500/5" : "border-orange-500/30 bg-orange-500/5"}`} data-testid="session-readiness">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs font-semibold ${sessionReady ? "text-emerald-300" : "text-orange-300"}`}>
            Session Readiness: {sessionReady ? "Ready" : "Blocked"}
          </p>
          <span className="text-[11px] font-mono text-muted-foreground">
            {sessionReady ? "No unresolved blockers" : `${unresolvedQuests.length + unresolvedNotes.filter((n) => n.canonStatus === "unresolved").length} blocker(s)`}
          </span>
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <Link href="/quests" className="rounded border border-border bg-card/40 px-2.5 py-2 hover:bg-card/70 transition-colors block">
            <p className="text-[11px] text-muted-foreground">Unresolved active quests</p>
            <p className="text-sm font-semibold text-orange-300">{unresolvedQuests.length}</p>
          </Link>
          <Link href="/notes" className="rounded border border-border bg-card/40 px-2.5 py-2 hover:bg-card/70 transition-colors block">
            <p className="text-[11px] text-muted-foreground">Unresolved canon notes</p>
            <p className="text-sm font-semibold text-orange-300">{unresolvedNotes.filter((n) => n.canonStatus === "unresolved").length}</p>
          </Link>
          <Link href="/quests" className="rounded border border-border bg-card/40 px-2.5 py-2 hover:bg-card/70 transition-colors block">
            <p className="text-[11px] text-muted-foreground">Pending quests</p>
            <p className="text-sm font-semibold text-yellow-300">{pendingQuests.length}</p>
          </Link>
          <Link href="/characters" className="rounded border border-border bg-card/40 px-2.5 py-2 hover:bg-card/70 transition-colors block">
            <p className="text-[11px] text-muted-foreground">Party members at 50% HP or lower</p>
            <p className="text-sm font-semibold text-red-300">{lowHpCharacters.length}</p>
          </Link>
        </div>
      </div>

      {/* Party HP quick view */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Party HP</h2>
          <Link href="/characters" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
            Full sheets <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {state.characters.map((c) => {
            const pct = Math.round((c.hp / c.maxHp) * 100);
            const barColor = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500";
            return (
              <div key={c.id} className="rounded border border-border bg-card p-2.5" data-testid={`hp-card-${c.id}`}>
                <p className="text-xs font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.player}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{c.hp}/{c.maxHp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup and restore */}
      <BackupCard state={state} />

      {/* Continuity warning */}
      <div className="rounded border border-yellow-500/30 bg-yellow-500/5 p-3">
        <p className="text-xs font-semibold text-yellow-400 mb-1">Continuity Safety</p>
        <p className="text-xs text-muted-foreground">
          Safety word: <span className="font-mono text-yellow-300">"Pause"</span> — scene stops immediately.
          Style correction: <span className="font-mono text-yellow-300">"less prestige drama mode please"</span>.
          Do not make choices for Josh's or other players' characters.
        </p>
      </div>
    </div>
  );
}

function BackupCard({ state }: { state: AppState }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = () => {
    downloadBackup(state);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      const backup = await readBackupFile(file);
      if (backup) {
        // Store the imported backup in localStorage with a flag
        localStorage.setItem("continuity-state-import", JSON.stringify(backup.data));
        alert(`✓ Backup imported successfully from ${file.name}.\n\nRefresh the page to apply changes.`);
      } else {
        alert("✗ Failed to import backup file. Make sure it's a valid JSON export from this app.");
      }
    } catch (error) {
      console.error("Import error:", error);
      alert("✗ Error importing backup. Check the browser console for details.");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="rounded border border-blue-500/30 bg-blue-500/5 p-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-blue-400">💾 Backup & Restore</p>
        <span className="text-[11px] font-mono text-muted-foreground">Before major changes</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExport}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
        >
          <Download size={12} />
          Export JSON
        </button>
        <button
          onClick={handleImportClick}
          disabled={isLoading}
          className="text-xs bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
        >
          <Upload size={12} />
          {isLoading ? "Loading..." : "Import JSON"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleFileSelected}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Exports your entire continuity state. Always backup before major updates.
      </p>
    </div>
  );
}
