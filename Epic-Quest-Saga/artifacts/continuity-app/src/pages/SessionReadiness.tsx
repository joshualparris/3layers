import { Link } from "wouter";
import { AlertTriangle, CheckCircle2, HeartPulse, ListChecks } from "lucide-react";
import type { AppState } from "@/data/initialState";

interface SessionReadinessProps {
  state: AppState;
}

export function SessionReadiness({ state }: SessionReadinessProps) {
  const unresolvedQuestBlockers = state.quests.filter((q) => q.status === "active" && q.canonStatus === "unresolved");
  const unresolvedNoteBlockers = state.notes.filter((n) => n.canonStatus === "unresolved");
  const pendingQuests = state.quests.filter((q) => q.status === "pending");
  const lowHpCharacters = state.characters.filter((c) => (c.hp / c.maxHp) <= 0.5);
  const ready = unresolvedQuestBlockers.length === 0 && unresolvedNoteBlockers.length === 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Session Readiness</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Open blockers, pending work, and immediate party risk.</p>
        </div>
        <div className={`rounded border px-3 py-1.5 text-sm font-semibold ${ready ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-orange-500/30 bg-orange-500/10 text-orange-300"}`}>
          {ready ? "Ready" : "Blocked"}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/quests" className="rounded border border-border bg-card p-3 hover:bg-secondary/40 transition-colors block">
          <p className="text-xs text-muted-foreground">Unresolved active quests</p>
          <p className="text-2xl font-semibold text-orange-300">{unresolvedQuestBlockers.length}</p>
        </Link>
        <Link href="/notes" className="rounded border border-border bg-card p-3 hover:bg-secondary/40 transition-colors block">
          <p className="text-xs text-muted-foreground">Unresolved canon notes</p>
          <p className="text-2xl font-semibold text-orange-300">{unresolvedNoteBlockers.length}</p>
        </Link>
        <Link href="/quests" className="rounded border border-border bg-card p-3 hover:bg-secondary/40 transition-colors block">
          <p className="text-xs text-muted-foreground">Pending quests</p>
          <p className="text-2xl font-semibold text-yellow-300">{pendingQuests.length}</p>
        </Link>
        <Link href="/characters" className="rounded border border-border bg-card p-3 hover:bg-secondary/40 transition-colors block">
          <p className="text-xs text-muted-foreground">Party 50% HP or lower</p>
          <p className="text-2xl font-semibold text-red-300">{lowHpCharacters.length}</p>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-orange-300" />
            <h2 className="text-sm font-semibold">Blockers</h2>
          </div>
          {unresolvedQuestBlockers.length === 0 && unresolvedNoteBlockers.length === 0 ? (
            <p className="text-xs text-muted-foreground">No unresolved blockers found.</p>
          ) : (
            <div className="space-y-2">
              {unresolvedQuestBlockers.map((q) => (
                <p key={q.id} className="text-xs text-foreground/80">Quest blocker: {q.title}</p>
              ))}
              {unresolvedNoteBlockers.map((n) => (
                <p key={n.id} className="text-xs text-foreground/80">Note blocker: {n.title}</p>
              ))}
            </div>
          )}
        </section>

        <section className="rounded border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <ListChecks size={15} className="text-yellow-300" />
            <h2 className="text-sm font-semibold">Pending Quest Queue</h2>
          </div>
          {pendingQuests.length === 0 ? (
            <p className="text-xs text-muted-foreground">No pending quests.</p>
          ) : (
            <div className="space-y-1.5">
              {pendingQuests.map((q) => (
                <p key={q.id} className="text-xs text-foreground/80">{q.title}</p>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="rounded border border-border bg-card p-4 space-y-2">
        <div className="flex items-center gap-2">
          <HeartPulse size={15} className="text-red-300" />
          <h2 className="text-sm font-semibold">Party Risk Snapshot</h2>
        </div>
        {lowHpCharacters.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 size={13} />
            No party members currently at or below 50% HP.
          </div>
        ) : (
          <div className="space-y-1.5">
            {lowHpCharacters.map((c) => (
              <p key={c.id} className="text-xs text-foreground/80">{c.name}: {c.hp}/{c.maxHp} HP</p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
