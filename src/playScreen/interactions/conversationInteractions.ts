import ConversationManager from "@/conversations/ConversationManager.ts";
import {theRecognizer} from "@/conversations/theRecognizer.ts";
import {setEmotion} from "@/playScreen/interactions/faceInteractions.ts";
import {fetchProject} from "@/persistence/projects.ts";
import {fetchSpiel} from "@/persistence/spiels.ts";

import {Spiel} from "sl-spiel";

let conversationManager:ConversationManager|null = null;
let spiel:Spiel|null = null;
let spielName:string|null = null;
let pausedNodeIndex = 0;

export async function initConversation():Promise<void> {
  const project = await fetchProject();
  spielName = project.entrySpiel;
  spiel = await fetchSpiel(spielName);
  
  conversationManager = new ConversationManager();
  conversationManager.bindOnSetEmotion(setEmotion);
  const recognizer = theRecognizer();
  if (!recognizer) throw Error('Unexpected');
  conversationManager.bindRecognizer(recognizer);
}

export function startConversation() {
  if (!conversationManager || !spiel || !spielName) throw Error('Unexpected');
  spiel.moveFirst();
  conversationManager.play(spiel, spielName);
}

export function pauseConversation() {
  if (!conversationManager) throw Error('Unexpected');
  pausedNodeIndex = conversationManager.stop();
}

export function resumeConversation() {
  if (!conversationManager || !spiel || !spielName) throw Error('Unexpected');
  spiel.moveTo(pausedNodeIndex);
  conversationManager.play(spiel, spielName);
}