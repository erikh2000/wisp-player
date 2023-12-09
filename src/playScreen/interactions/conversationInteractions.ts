import ConversationManager from "@/conversations/ConversationManager.ts";
import {theRecognizer} from "@/conversations/theRecognizer.ts";

let conversationManager:ConversationManager|null = null;

export async function initConversation():Promise<void> {
  conversationManager = new ConversationManager();
  conversationManager.bindOnSetEmotion((_emotion) => {
    // setEmotion(emotion); TODO
  });
  const recognizer = await theRecognizer();
  if (!recognizer) throw Error('Unexpected');
  conversationManager.bindRecognizer(recognizer);
}