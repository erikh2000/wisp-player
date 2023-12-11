import PausedDialog from "@/playScreen/dialogs/PausedDialog.tsx";
import {pauseConversation, resumeConversation} from "@/playScreen/interactions/conversationInteractions.ts";

export function pause(setModalDialog:Function) {
  pauseConversation();
  setModalDialog(PausedDialog.name);
}

export function resume(setModalDialog:Function) {
  resumeConversation();
  setModalDialog(null);
}

export function quit(setModalDialog:Function, setLocation:Function) {
  setModalDialog(null);
  setLocation('/');
}