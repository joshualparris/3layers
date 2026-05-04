import { useState } from "react";
import { AlertTriangle, ChevronRight, Clock, MapPin, Zap } from "lucide-react";
import { CanonBadge } from "@/components/CanonBadge";
import { TIMELINE_SNAPSHOTS, CONTINUITY_CONFLICTS } from "@/data/timeline";

export function Timeline() {
  const [expandedSnapshot, setExpandedSnapshot] = useState<string | null>(null);
  const [showConflicts, setShowConflicts] = useState(true);

  const currentSnapshot = TIMELINE_SNAPSHOTS[TIMELINE_SNAPSHOTS.length - 1];
  const blocker = CONTINUITY_CONFLICTS.find((c) => c.severity === "blocker");

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Timeline & Continuity</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Bookmarks, snapshots, and conflicts</p>
      </div>

      {/* Session readiness alert */}
      {blocker && (
        <div className="rounded border border-red-500/30 bg-red-500/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-red-400" />
            <p className="text-xs font-semibold text-red-400">BLOCKER: {blocker.title}</p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{blocker.description}</p>
          <p className="text-xs text-red-300">{blocker.notes}</p>
        </div>
      )}

      {/* Current anchor */}
      <div className="rounded border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">LIVE NOW</span>
        </div>
        <h2 className="text-sm font-semibold mb-1">{currentSnapshot.label}</h2>
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <MapPin size={12} />
          <span>{currentSnapshot.location}</span>
          <span>•</span>
          <Clock size={12} />
          <span>{currentSnapshot.occurredAt}</span>
          <span>•</span>
          <span>Level {currentSnapshot.partyLevel}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{currentSnapshot.description}</p>

        {currentSnapshot.unresolved.length > 0 && (
          <div className="mt-2 pt-2 border-t border-emerald-500/20">
            <p className="text-xs font-mono text-yellow-300 mb-1">Unresolved:</p>
            <ul className="space-y-0.5">
              {currentSnapshot.unresolved.map((item, i) => (
                <li key={i} className="text-xs text-yellow-200/80 ml-2">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Timeline header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Continuity Bookmarks</h2>
        <button
          onClick={() => setShowConflicts(!showConflicts)}
          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
        >
          {showConflicts ? "Hide" : "Show"} Conflicts
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Timeline */}
      <div className="relative space-y-3">
        {TIMELINE_SNAPSHOTS.map((snapshot, idx) => {
          const isLast = idx === TIMELINE_SNAPSHOTS.length - 1;
          const isExpanded = expandedSnapshot === snapshot.id;

          return (
            <div key={snapshot.id} className="relative">
              {/* Timeline connector */}
              {!isLast && (
                <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-gradient-to-b from-slate-500/50 to-slate-500/10" />
              )}

              {/* Card */}
              <button
                onClick={() => setExpandedSnapshot(isExpanded ? null : snapshot.id)}
                className={`w-full text-left rounded border p-3 transition-all ${
                  isLast
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-slate-500/30 hover:bg-slate-500/5 bg-slate-500/5"
                }`}
              >
                {/* Timeline dot and bookmark label */}
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 ${isLast ? "border-emerald-500 bg-emerald-500 text-black" : "border-slate-500 bg-slate-900"}`}>
                    {isLast ? (
                      <span className="text-[10px] font-bold">●</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-muted-foreground">{snapshot.bookmark}</p>
                        <h3 className="text-sm font-semibold">{snapshot.label}</h3>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`flex-shrink-0 mt-1 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Location and time */}
                <div className="mt-2 ml-9 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {snapshot.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {snapshot.occurredAt}
                  </span>
                </div>

                {/* Quick stats */}
                {isExpanded && (
                  <div className="mt-3 ml-9 space-y-2">
                    <p className="text-xs text-muted-foreground">{snapshot.description}</p>

                    {/* Active quests */}
                    {snapshot.activeQuests.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-blue-300 mb-1">Active Quests:</p>
                        <ul className="space-y-0.5">
                          {snapshot.activeQuests.map((quest, i) => (
                            <li key={i} className="text-xs text-blue-200/80 ml-2">
                              • {quest}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key events */}
                    {snapshot.keyEvents.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-emerald-300 mb-1">Key Events:</p>
                        <ul className="space-y-0.5">
                          {snapshot.keyEvents.map((event, i) => (
                            <li key={i} className="text-xs text-emerald-200/80 ml-2">
                              • {event}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Unresolved */}
                    {snapshot.unresolved.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-yellow-300 mb-1">Unresolved:</p>
                        <ul className="space-y-0.5">
                          {snapshot.unresolved.map((item, i) => (
                            <li key={i} className="text-xs text-yellow-200/80 ml-2">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Conflicts section */}
      {showConflicts && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle size={14} />
            Continuity Conflicts
          </h2>

          <div className="space-y-2">
            {CONTINUITY_CONFLICTS.map((conflict) => {
              const severityColor =
                conflict.severity === "blocker"
                  ? "border-red-500/30 bg-red-500/5"
                  : conflict.severity === "warning"
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-blue-500/30 bg-blue-500/5";

              const severityLabel =
                conflict.severity === "blocker"
                  ? "text-red-400"
                  : conflict.severity === "warning"
                    ? "text-yellow-400"
                    : "text-blue-400";

              return (
                <div key={conflict.id} className={`rounded border p-3 ${severityColor}`}>
                  <p className={`text-xs font-semibold ${severityLabel} mb-1`}>{conflict.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">{conflict.description}</p>
                  <p className="text-xs text-muted-foreground">{conflict.notes}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
