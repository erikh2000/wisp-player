import Project from "@/persistence/types/Project.ts";
import {fetchProject} from "@/persistence/projects.ts";
import {init as initRecognizer} from "@/conversations/theRecognizer.ts";

export type InitResults = {
  project:Project
}

let initResults:InitResults|null = null;
let isInitializing = false;

export async function init():Promise<InitResults|null> {
  if (isInitializing) return null;
  if (!initResults) {
    isInitializing = true;
    initRecognizer();
    initResults = {
      project: await fetchProject()
    };
    isInitializing = false;
  }
  return initResults;
}