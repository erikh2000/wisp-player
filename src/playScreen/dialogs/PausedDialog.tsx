import { ConfirmCancelDialog } from "sl-react-ui";
import 'sl-react-ui/dist/style.css';

type Props = {
  isOpen:boolean,
  onResume:() => void,
  onQuit:() => void
}

function PausedDialog(props:Props) {
  const { isOpen, onResume, onQuit } = props;
  
  return (
    <ConfirmCancelDialog
      isOpen={isOpen}
      title="Paused"
      description="Your conversation is paused, and speech recognition is disabled."
      confirmText="Resume"
      cancelText="Quit"
      onCancel={onQuit}
      onConfirm={onResume}
    />
  );
}

export default PausedDialog;