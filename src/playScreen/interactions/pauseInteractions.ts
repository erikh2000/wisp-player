import PausedDialog from "@/playScreen/dialogs/PausedDialog.tsx";

export function pause(setModalDialog:Function) {
  setModalDialog(PausedDialog.name);
}

export function resume(setModalDialog:Function) {
  setModalDialog(null);
}

export function quit(setModalDialog:Function, setLocation:Function) {
  setModalDialog(null);
  setLocation('/');
}