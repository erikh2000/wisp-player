import PausedDialog from "./dialogs/PausedDialog.tsx";
import styles from './PlayScreen.module.css';
import { pause, resume, quit } from "./interactions/pauseInteractions.ts";
import {deinit, init, InitResults} from "./interactions/initialization.ts";

import { Canvas, LoadingBox } from 'sl-react-ui';
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import 'sl-react-ui/dist/style.css';

function _onKeyDown(event:KeyboardEvent, setModalDialog:Function) {
  if (event.key === 'Escape') { pause(setModalDialog); }
}

function PlayScreen() {
  const [modalDialog, setModalDialog] = useState<string|null>(null);
  const [, setLocation] = useLocation();
  const [initResults, setInitResults] = useState<InitResults|null>(null);
  const _handleKeyDown = (event:KeyboardEvent) => { _onKeyDown(event, setModalDialog); };

  useEffect(() => {
    init().then((initResults:InitResults|null) => {
      window.addEventListener('keydown', _handleKeyDown);
      if(initResults) setInitResults(initResults);
    });
    return () => {
      deinit();
      window.removeEventListener('keydown', _handleKeyDown);
    }
  },[setInitResults]);
  
  if (!initResults) return <LoadingBox className={styles.container} text='Loading scene' />;
  
  return (
    <div className={styles.container}>
      <Canvas 
        onDraw={initResults.onDraw}
        onExitFullScreen={() => pause(setModalDialog)}
        exitFullScreenText='Pause / Quit'
        isFullScreen={modalDialog === null}
        isAnimated
      />
      <PausedDialog 
        isOpen={modalDialog === PausedDialog.name} 
        onResume={() => resume(setModalDialog) } 
        onQuit={() => quit(setModalDialog, setLocation) }
      />
    </div>
  );
}

export default PlayScreen;