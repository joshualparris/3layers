import type { AppState } from "@/data/initialState";

export interface BackupMetadata {
  version: string;
  createdAt: string;
  campaignAnchor: string;
}

export interface BackupFile {
  metadata: BackupMetadata;
  data: AppState;
}

export function createBackup(state: AppState): BackupFile {
  return {
    metadata: {
      version: "1.0",
      createdAt: new Date().toISOString(),
      campaignAnchor: state.l3.anchor,
    },
    data: state,
  };
}

export function exportBackupAsJSON(state: AppState): string {
  const backup = createBackup(state);
  return JSON.stringify(backup, null, 2);
}

export function downloadBackup(state: AppState, filename?: string): void {
  const backup = exportBackupAsJSON(state);
  const timestamp = new Date().toISOString().split("T")[0];
  const defaultName = `continuity-backup-${timestamp}.json`;
  
  const element = document.createElement("a");
  element.setAttribute("href", `data:application/json;charset=utf-8,${encodeURIComponent(backup)}`);
  element.setAttribute("download", filename || defaultName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function importBackupFromJSON(jsonString: string): BackupFile | null {
  try {
    const parsed = JSON.parse(jsonString) as BackupFile;
    
    // Validate structure
    if (!parsed.metadata || !parsed.data) {
      console.error("Invalid backup file structure");
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to parse backup JSON:", error);
    return null;
  }
}

export function readBackupFile(file: File): Promise<BackupFile | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const backup = importBackupFromJSON(content);
      resolve(backup);
    };
    reader.onerror = () => {
      console.error("Failed to read file");
      resolve(null);
    };
    reader.readAsText(file);
  });
}
