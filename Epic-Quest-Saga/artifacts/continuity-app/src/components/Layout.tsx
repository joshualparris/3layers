import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  BookOpen,
  Users,
  Map,
  FileText,
  CheckSquare,
  LayoutDashboard,
  Menu,
  X,
  Shield,
  Layers,
  Archive,
  Download,
  Upload,
  Clock,
  Gavel,
  Gauge,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LAYER_COLORS = {
  L1: "text-slate-400 border-slate-500 bg-slate-500/10",
  L2: "text-amber-400 border-amber-500 bg-amber-500/10",
  L3: "text-emerald-400 border-emerald-500 bg-emerald-500/10",
};

const LAYER_LABELS = {
  L1: "OOG",
  L2: "OG Table",
  L3: "In-Game",
};

const NAV_ITEMS = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/l2", icon: Users, label: "OG Table (L2)" },
  { href: "/l3", icon: Map, label: "In-Game (L3)" },
  { href: "/characters", icon: Shield, label: "Characters" },
  { href: "/notes", icon: FileText, label: "Notes & Canon" },
  { href: "/quests", icon: CheckSquare, label: "Quests" },
  { href: "/session-readiness", icon: Gauge, label: "Session Readiness" },
  { href: "/canon-audit", icon: ClipboardCheck, label: "Canon Audit" },
  { href: "/rules", icon: Gavel, label: "Rules Audit" },
  { href: "/timeline", icon: Clock, label: "Timeline" },
  { href: "/sources", icon: Archive, label: "Sources" },
];

interface LayoutProps {
  children: React.ReactNode;
  activeLayer: "L1" | "L2" | "L3";
  onLayerChange: (layer: "L1" | "L2" | "L3") => void;
  onExportBackup?: () => void;
  onImportBackup?: (file: File) => void;
}

export function Layout({ children, activeLayer, onLayerChange, onExportBackup, onImportBackup }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border bg-card flex items-center justify-between px-4 py-2 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded hover:bg-secondary"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            <span className="font-semibold text-sm tracking-wide">Continuity</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(onExportBackup || onImportBackup) && (
            <div className="hidden md:flex items-center gap-1.5">
              {onExportBackup && (
                <button
                  onClick={onExportBackup}
                  className="inline-flex items-center gap-1 text-xs border border-border rounded px-2 py-1 hover:bg-secondary"
                  data-testid="button-export-backup"
                >
                  <Download size={12} />
                  Export
                </button>
              )}
              {onImportBackup && (
                <label
                  className="inline-flex items-center gap-1 text-xs border border-border rounded px-2 py-1 hover:bg-secondary cursor-pointer"
                  data-testid="button-import-backup"
                >
                  <Upload size={12} />
                  Import
                  <input
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onImportBackup(file);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
              )}
            </div>
          )}

          {/* Layer selector */}
          <div className="flex items-center gap-1" data-testid="layer-selector">
          <Layers size={14} className="text-muted-foreground mr-1" />
          {(["L1", "L2", "L3"] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => onLayerChange(layer)}
              data-testid={`button-layer-${layer}`}
              className={cn(
                "px-2 py-0.5 rounded border text-xs font-mono font-medium transition-all",
                activeLayer === layer
                  ? LAYER_COLORS[layer]
                  : "text-muted-foreground border-transparent hover:border-border"
              )}
            >
              {LAYER_LABELS[layer]}
            </button>
          ))}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop */}
        <nav className="hidden md:flex flex-col w-48 border-r border-border bg-card/50 py-3 flex-shrink-0">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors",
                location === href
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon size={15} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <nav className="relative z-50 w-56 bg-card border-r border-border py-3 flex flex-col">
              {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
                    location === href
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
