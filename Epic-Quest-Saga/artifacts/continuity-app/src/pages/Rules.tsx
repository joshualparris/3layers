import { AlertTriangle, CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { RULES_ISSUES, CHARACTER_SHEET_VERSIONS } from "@/data/rules";

export function Rules() {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  const blockers = RULES_ISSUES.filter((r) => r.severity === "blocker" && r.status === "open");
  const warnings = RULES_ISSUES.filter((r) => r.severity === "warning" && r.status === "open");
  const resolved = RULES_ISSUES.filter((r) => r.status === "ruled");

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Rules & Character Audit</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Mechanical conflicts, build tracking, and resolutions</p>
      </div>

      {/* Session readiness */}
      <div
        className={`rounded border p-3 ${
          blockers.length === 0
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-red-500/30 bg-red-500/5"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs font-semibold ${blockers.length === 0 ? "text-emerald-300" : "text-red-300"}`}>
            {blockers.length === 0 ? "Ready for Combat" : "COMBAT BLOCKERS"}
          </p>
          <span className="text-[11px] font-mono text-muted-foreground">
            {blockers.length} blocker{blockers.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={14} />
            MUST RESOLVE BEFORE COMBAT
          </h2>
          {blockers.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              expanded={expandedIssue === issue.id}
              onToggle={() =>
                setExpandedIssue(expandedIssue === issue.id ? null : issue.id)
              }
            />
          ))}
        </div>
      )}

      {/* Character sheet versions */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Character Sheet Versions</h2>
        <div className="grid gap-2">
          {CHARACTER_SHEET_VERSIONS.map((version) => (
            <div
              key={version.id}
              className={`rounded border p-3 ${
                version.source === "2024-beyond"
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-slate-500/30 bg-slate-500/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-sm font-semibold">{version.characterName}</p>
                  <p className="text-xs text-muted-foreground">
                    {version.class} {version.level} • {version.source}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground flex-shrink-0">
                  {version.capturedAt}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{version.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-yellow-400">
            <AlertCircle size={14} />
            Warnings
          </h2>
          {warnings.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              expanded={expandedIssue === issue.id}
              onToggle={() =>
                setExpandedIssue(expandedIssue === issue.id ? null : issue.id)
              }
            />
          ))}
        </div>
      )}

      {/* Resolved/Ruled */}
      {resolved.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={14} />
            Resolved Rulings
          </h2>
          {resolved.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              expanded={expandedIssue === issue.id}
              onToggle={() =>
                setExpandedIssue(expandedIssue === issue.id ? null : issue.id)
              }
            />
          ))}
        </div>
      )}

      {/* Resource snapshot template */}
      <div className="rounded border border-slate-500/30 bg-slate-500/5 p-4">
        <p className="text-xs font-semibold mb-2">Resource Snapshot (for session start)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">Alphie HP</p>
            <p className="font-mono text-sm">32 / 32</p>
          </div>
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">AC</p>
            <p className="font-mono text-sm">12 (no armor)</p>
          </div>
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">Spell DC / Attack</p>
            <p className="font-mono text-sm">+15 / +7</p>
          </div>
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">1st-level slots</p>
            <p className="font-mono text-sm">4 / 4</p>
          </div>
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">2nd-level slots</p>
            <p className="font-mono text-sm">3 / 3</p>
          </div>
          <div className="p-2 rounded bg-background/50 border border-slate-500/20">
            <p className="text-muted-foreground">3rd-level slots</p>
            <p className="font-mono text-sm">2 / 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueCard({
  issue,
  expanded,
  onToggle,
}: {
  issue: (typeof RULES_ISSUES)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const severityColor =
    issue.severity === "blocker"
      ? "border-red-500/30 bg-red-500/5"
      : issue.severity === "warning"
        ? "border-yellow-500/30 bg-yellow-500/5"
        : "border-blue-500/30 bg-blue-500/5";

  const severityLabel =
    issue.severity === "blocker"
      ? "text-red-400"
      : issue.severity === "warning"
        ? "text-yellow-400"
        : "text-blue-400";

  const statusIcon =
    issue.status === "ruled" ? (
      <CheckCircle2 size={12} className="text-emerald-400" />
    ) : issue.status === "retconned" ? (
      <AlertCircle size={12} className="text-slate-400" />
    ) : (
      <Clock size={12} className="text-yellow-400" />
    );

  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded border p-3 transition-all ${severityColor}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {statusIcon}
            <h3 className={`text-sm font-semibold ${severityLabel}`}>{issue.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{issue.summary}</p>

          {expanded && (
            <div className="mt-2 space-y-2">
              {/* Options */}
              {issue.options.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Options:</p>
                  <ul className="space-y-1">
                    {issue.options.map((option, i) => (
                      <li key={i} className="text-xs text-muted-foreground ml-2">
                        • {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ruling */}
              {issue.ruling && (
                <div className="pt-2 border-t border-current border-opacity-10">
                  <p className="text-xs font-semibold text-emerald-300 mb-1">RULING:</p>
                  <p className="text-xs text-muted-foreground">{issue.ruling}</p>
                  {issue.ruledBy && (
                    <p className="text-xs text-muted-foreground mt-1">
                      — {issue.ruledBy}
                      {issue.ruledAt && ` (${issue.ruledAt})`}
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              {issue.notes && (
                <div className="pt-2 border-t border-current border-opacity-10">
                  <p className="text-xs text-muted-foreground">{issue.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <ChevronRight
          size={14}
          className={`flex-shrink-0 mt-1 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </div>
    </button>
  );
}
