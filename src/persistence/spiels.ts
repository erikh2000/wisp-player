import {SPIEL_URL_TEMPLATE} from "@/persistence/urlTemplates.ts";

import {importSpielFile, Spiel} from "sl-spiel";
import {fillTemplate} from "@/persistence/pathUtil.ts";
import {baseUrl} from "@/common/urlUtil.ts";

export async function fetchSpiel(spielName:string):Promise<Spiel> {
  const url = baseUrl(fillTemplate(SPIEL_URL_TEMPLATE, {spielName}));
  let response = await fetch(url);
  let spielYaml = await response.text();
  if (!spielYaml) throw Error('Unexpected');
  return importSpielFile(spielYaml);
}