import { useState } from "react";
import {
  Archive,
  CheckCircle2,
  ExternalLink,
  FileArchive,
  FileText,
  Filter,
  Globe,
  Lock,
  Search,
} from "lucide-react";
import { CanonBadge } from "@/components/CanonBadge";
import type { CanonStatus, Layer } from "@/data/initialState";
import {
  CANON_FACT_PREVIEWS,
  IS_HOSTED_DEPLOYMENT,
  SOURCE_DOCUMENTS,
  SUB_APP_LINKS,
  type SourceDocument,
  type SourceKind,
  type SubAppStatus,
} from "@/data/sourceLibrary";

const KIND_LABELS: Record<SourceKind, string> = {
  html: "HTML",
  markdown: "MD",
  pdf: "PDF",
  docx: "DOCX",
  image: "Image",
  zip: "Zip",
};

const STATUS_STYLES: Record<SubAppStatus, string> = {
  current: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  active: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  legacy: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  backup: "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

const PRIORITY_STYLES: Record<SourceDocument["priority"], string> = {
  primary: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  supporting: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  archive: "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

const LAYER_STYLES: Record<Layer, string> = {
  L1: "text-slate-300 bg-slate-500/10",
  L2: "text-amber-300 bg-amber-500/10",
  L3: "text-emerald-300 bg-emerald-500/10",
};

function matches(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

function LocalPath({ path }: { path: string }) {
  return (
    <code className="block text-xs text-muted-foreground bg-background/70 border border-border rounded px-2 py-1 overflow-x-auto whitespace-nowrap">
      {path}
    </code>
  );
}

function CopyPathButton({ path, label = "Copy Path" }: { path: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground border border-border px-2.5 py-1.5 rounded hover:bg-secondary/80"
    >
      <ExternalLink size={12} />
      {copied ? "Copied" : label}
    </button>
  );
}

function OpenLocalLink({ url, label = "Open" }: { url: string | null; label?: string }) {
  if (!url) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs bg-secondary text-muted-foreground border border-border px-2.5 py-1.5 rounded"
        title="This source lives on Josh's PC and is available through the local launcher."
      >
        <Lock size={12} />
        Local Only
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-2.5 py-1.5 rounded hover:bg-primary/90"
    >
      <ExternalLink size={12} />
      {label}
    </a>
  );
}

export function Sources() {
  const [search, setSearch] = useState("");
  const [sourceKind, setSourceKind] = useState<SourceKind | "all">("all");
  const [subAppStatus, setSubAppStatus] = useState<SubAppStatus | "all">("all");

  const filteredSubApps = SUB_APP_LINKS.filter((app) => {
    if (subAppStatus !== "all" && app.status !== subAppStatus) return false;
    if (!search) return true;
    return matches(`${app.title} ${app.family} ${app.path} ${app.notes}`, search);
  });

  const filteredSources = SOURCE_DOCUMENTS.filter((source) => {
    if (sourceKind !== "all" && source.kind !== sourceKind) return false;
    if (!search) return true;
    return matches(`${source.title} ${source.path} ${source.notes}`, search);
  });

  const primarySources = SOURCE_DOCUMENTS.filter((source) => source.priority === "primary").length;
  const dmPrivateFacts = CANON_FACT_PREVIEWS.filter((fact) => fact.canonStatus === "DM-private").length;
  const unresolvedFacts = CANON_FACT_PREVIEWS.filter((fact) => fact.canonStatus === "unresolved").length;

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Archive size={18} className="text-primary" />
          <div>
            <h1 className="text-xl font-semibold">Sources</h1>
            <p className="text-xs text-muted-foreground">Sub apps, handovers, and canon-source anchors</p>
          </div>
        </div>
        <OpenLocalLink url={SUB_APP_LINKS[0].url} label="Open Root App" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Sub Apps</p>
          <p className="text-2xl font-semibold">{SUB_APP_LINKS.length}</p>
        </div>
        <div className="rounded border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Source Docs</p>
          <p className="text-2xl font-semibold">{SOURCE_DOCUMENTS.length}</p>
        </div>
        <div className="rounded border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Primary</p>
          <p className="text-2xl font-semibold text-emerald-300">{primarySources}</p>
        </div>
        <div className="rounded border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Guarded Facts</p>
          <p className="text-2xl font-semibold text-orange-300">{dmPrivateFacts + unresolvedFacts}</p>
        </div>
      </div>

      {IS_HOSTED_DEPLOYMENT && (
        <div className="rounded border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-100 leading-relaxed">
          Hosted mode is using GitHub-backed links for files included in the repository. PC-only source archives and sub-app HTML files stay protected as local-only entries and still work through the Windows launcher.
        </div>
      )}

      <div className="rounded border border-border bg-card p-3 flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-56">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search source titles, notes, and paths..."
            className="w-full text-xs bg-secondary border border-border rounded pl-8 pr-3 py-1.5 text-foreground"
            data-testid="input-search-sources"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-muted-foreground" />
          <select
            value={subAppStatus}
            onChange={(e) => setSubAppStatus(e.target.value as SubAppStatus | "all")}
            className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
            data-testid="select-sub-app-status"
          >
            <option value="all">All sub apps</option>
            <option value="active">Active</option>
            <option value="legacy">Legacy</option>
            <option value="backup">Backup</option>
          </select>
          <select
            value={sourceKind}
            onChange={(e) => setSourceKind(e.target.value as SourceKind | "all")}
            className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground"
            data-testid="select-source-kind"
          >
            <option value="all">All docs</option>
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="image">Image</option>
            <option value="zip">Zip</option>
          </select>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-primary" />
            <h2 className="text-base font-semibold">Sub Apps</h2>
          </div>
          <span className="text-xs text-muted-foreground">{filteredSubApps.length} shown</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {filteredSubApps.map((app) => (
            <article key={app.id} className="rounded border border-border bg-card p-4 space-y-3" data-testid={`sub-app-${app.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs border rounded px-1.5 py-0.5 font-mono ${STATUS_STYLES[app.status]}`}>{app.status}</span>
                    <span className="text-xs text-muted-foreground">{app.family}</span>
                  </div>
                  <h3 className="text-sm font-semibold mt-1">{app.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{app.notes}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <OpenLocalLink url={app.url} />
                  <CopyPathButton path={app.path} />
                </div>
              </div>
              <LocalPath path={app.path} />
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            <h2 className="text-base font-semibold">Source Ledger</h2>
          </div>
          <span className="text-xs text-muted-foreground">{filteredSources.length} shown</span>
        </div>

        <div className="space-y-2">
          {filteredSources.map((source) => (
            <article key={source.id} className="rounded border border-border bg-card p-4 space-y-3" data-testid={`source-doc-${source.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-secondary text-muted-foreground rounded px-1.5 py-0.5 font-mono">{KIND_LABELS[source.kind]}</span>
                    <span className={`text-xs border rounded px-1.5 py-0.5 font-mono ${PRIORITY_STYLES[source.priority]}`}>{source.priority}</span>
                    {source.layerScope.map((layer) => (
                      <span key={layer} className={`text-xs rounded px-1.5 py-0.5 font-mono ${LAYER_STYLES[layer]}`}>{layer}</span>
                    ))}
                    <CanonBadge status={source.canonStatus} />
                  </div>
                  <h3 className="text-sm font-semibold mt-1">{source.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{source.notes}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <OpenLocalLink url={source.url} />
                  <CopyPathButton path={source.path} />
                </div>
              </div>
              <LocalPath path={source.path} />
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" />
          <h2 className="text-base font-semibold">Canon Fact Starters</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {CANON_FACT_PREVIEWS.map((fact) => {
            const source = SOURCE_DOCUMENTS.find((item) => item.id === fact.sourceId);
            return (
              <article key={fact.id} className={`rounded border bg-card p-4 space-y-2 ${fact.canonStatus === "DM-private" ? "border-slate-500/40" : "border-border"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs rounded px-1.5 py-0.5 font-mono ${LAYER_STYLES[fact.layer]}`}>{fact.layer}</span>
                      {fact.canonStatus === "DM-private" && <Lock size={12} className="text-slate-400" />}
                      <CanonBadge status={fact.canonStatus as CanonStatus} />
                    </div>
                    <h3 className="text-sm font-semibold mt-1">{fact.title}</h3>
                  </div>
                  <FileArchive size={15} className="text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{fact.summary}</p>
                {source && <p className="text-xs text-muted-foreground">Source: <span className="text-foreground/80">{source.title}</span></p>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
