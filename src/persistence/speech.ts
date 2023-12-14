import { fillTemplate } from "./pathUtil.ts";
import {SPEECH_FINAL_URL_TEMPLATE} from "./urlTemplates.ts";
import {baseUrl} from "@/common/urlUtil.ts";

function _removeNonAlphaNumeric(text:string):string {
  return text.replace(/[^a-zA-Z0-9]/g, '');
}
function _getFirstThreeWords(dialogueText:string):string {
  const words = dialogueText.split(' ').map(word => {
    word = word.trim();
    if (word.endsWith('/')) word = word.slice(0, word.length - 1);
    return _removeNonAlphaNumeric(word.toLowerCase());
  });
  return words.slice(0, 3).join(' ').trim();
}

function _getFinalTakeUrl(spielName:string, characterName:string, speechId:string, dialogueText:string):string {
  const firstThreeWords = _getFirstThreeWords(dialogueText);
  return baseUrl(fillTemplate(SPEECH_FINAL_URL_TEMPLATE, {spielName, characterName, speechId, firstThreeWords}));
}

export async function fetchFinalTake(spielName:string, characterName:string, speechId:string, dialogueText:string):Promise<Uint8Array|null> {
  const url = _getFinalTakeUrl(spielName, characterName, speechId, dialogueText);
  const response = await fetch(url);
  if (response.status !== 200) return null;
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}