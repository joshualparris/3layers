import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { L2Table } from "@/pages/L2Table";
import { L3InGame } from "@/pages/L3InGame";
import { Characters } from "@/pages/Characters";
import { Notes } from "@/pages/Notes";
import { Quests } from "@/pages/Quests";
import { Sources } from "@/pages/Sources";
import { Timeline } from "@/pages/Timeline";
import { Rules } from "@/pages/Rules";
import { Goldenfields } from "@/pages/Goldenfields";
import { SessionReadiness } from "@/pages/SessionReadiness";
import { CanonAudit } from "@/pages/CanonAudit";
import NotFound from "@/pages/not-found";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { INITIAL_STATE, AppState } from "@/data/initialState";
import { migrateAppState } from "@/data/migrations";

const queryClient = new QueryClient();

function AppContent() {
  const [state, setState] = useLocalStorage<AppState>("continuity-state", INITIAL_STATE, {
    migrate: migrateAppState,
  });

  const updateLayer = (layer: AppState["activeLayer"]) => {
    setState((prev) => ({ ...prev, activeLayer: layer }));
  };

  const exportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "Epic-Quest-Saga",
      state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const link = document.createElement("a");
    link.href = url;
    link.download = `continuity-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const record = parsed as { state?: unknown };
      const next = migrateAppState(record?.state ?? parsed);
      setState(next);
      window.alert("Backup imported successfully.");
    } catch {
      window.alert("Could not import backup. Use a valid continuity backup JSON file.");
    }
  };

  return (
    <Layout
      activeLayer={state.activeLayer}
      onLayerChange={updateLayer}
      onExportBackup={exportBackup}
      onImportBackup={importBackup}
    >
      <Switch>
        <Route path="/" component={() => <Dashboard state={state} />} />
        <Route
          path="/l2"
          component={() => (
            <L2Table
              state={state}
              onUpdateL2={(l2) => setState((prev) => ({ ...prev, l2 }))}
            />
          )}
        />
        <Route
          path="/l3"
          component={() => (
            <L3InGame
              state={state}
              onUpdateL3={(l3) => setState((prev) => ({ ...prev, l3 }))}
            />
          )}
        />
        <Route
          path="/characters"
          component={() => (
            <Characters
              state={state}
              onUpdateCharacters={(characters) => setState((prev) => ({ ...prev, characters }))}
              onUpdateNPCs={(specialNPCs) => setState((prev) => ({ ...prev, specialNPCs }))}
            />
          )}
        />
        <Route
          path="/notes"
          component={() => (
            <Notes
              state={state}
              onUpdateNotes={(notes) => setState((prev) => ({ ...prev, notes }))}
            />
          )}
        />
        <Route
          path="/quests"
          component={() => (
            <Quests
              state={state}
              onUpdateQuests={(quests) => setState((prev) => ({ ...prev, quests }))}
            />
          )}
        />
        <Route path="/sources" component={Sources} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/rules" component={Rules} />
        <Route path="/goldenfields" component={Goldenfields} />
        <Route path="/session-readiness" component={() => <SessionReadiness state={state} />} />
        <Route path="/canon-audit" component={() => <CanonAudit state={state} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
