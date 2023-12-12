import Project from "@/persistence/types/Project.ts";
import {fetchProject} from "@/persistence/projects.ts";
import {init as initRecognizer} from "@/conversations/theRecognizer.ts";
import {checkMicAccess, MicAccessResult} from "@/conversations/micCheckUtil.ts";

export type InitResults = {
  project:Project
}

let initResults:InitResults|null = null;
let isInitializing = false;

export async function init(setLocation:Function):Promise<InitResults|null> {
  if (isInitializing) return null;
  isInitializing = true;
  try {
    if (!initResults) {
      if (await checkMicAccess() !== MicAccessResult.AVAILABLE) {
        setLocation('/micAccess');
        return null;
      }
      await initRecognizer();
      initResults = {
        project: await fetchProject()
      };
    }
    return initResults;
  } catch(e) {
    console.error(e);
    return null;
  } finally {
    isInitializing = false;
  }
}