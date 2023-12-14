import Project from './types/Project';
import {parse} from 'yaml';
import {baseUrl} from "@/common/urlUtil.ts";

export const UNSPECIFIED_NAME = '';

export async function fetchProject():Promise<Project> {
  const URL = baseUrl(`/project/project.wisp`);
  let response = await fetch(URL);
  let projectYaml = await response.text();
  if (!projectYaml) throw Error('Unexpected');
  return parse(projectYaml);
}