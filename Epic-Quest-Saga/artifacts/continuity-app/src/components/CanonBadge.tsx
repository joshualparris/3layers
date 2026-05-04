import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import type { CanonStatus } from "@/data/initialState";

const CANON_STYLES: Record<CanonStatus, string> = {
  "source-canon": "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  "table-canon": "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  "player-choice": "bg-purple-500/15 text-purple-300 border border-purple-500/30",
  inferred: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30",
  unresolved: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
  retconned: "bg-red-500/15 text-red-400 border border-red-500/30 line-through",
  "DM-private": "bg-slate-600/30 text-slate-400 border border-slate-500/50",
};

interface CanonBadgeProps {
  status: CanonStatus;
  className?: string;
}

export function CanonBadge({ status, className }: CanonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono",
        CANON_STYLES[status],
        className
      )}
    >
      {status === "DM-private" && <Lock size={10} />}
      {status}
    </span>
  );
}

export const CANON_OPTIONS: CanonStatus[] = [
  "source-canon",
  "table-canon",
  "player-choice",
  "inferred",
  "unresolved",
  "retconned",
  "DM-private",
];
