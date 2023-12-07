import styles from './HomeScreen.module.css';
import poweredByWisp from './images/poweredByWisp.png';

import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { InitResults, init } from "./interactions/initialization";
import { LoadingBox } from "sl-react-ui";
import 'sl-react-ui/dist/style.css';

function HomeScreen() {
  const [, setLocation] = useLocation();
  const [initResults, setInitResults] = useState<InitResults|null>(null);
  
  useEffect(() => {
    init().then((initResults:InitResults|null) => {
      if(initResults) setInitResults(initResults);
    });
  },[setInitResults]);
  
  if (!initResults) return <div className={styles.container}><LoadingBox className='loading project' /></div>;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>{initResults.project.title}</h1></div>
      <div className={styles.content}>
        <h1>About</h1>
        <p>{initResults.project.aboutText}</p>
        <h1>Controls</h1>
        <p>Escape to pause. Otherwise, control is entirely by voice. Talk to characters in English.</p>
        <h1>Credits</h1>
        <p>{initResults.project.creditsText}</p>
        <button className={styles.startButton} onClick={() => setLocation('/play')}>Start</button>
      </div>
      <div className={styles.footer}>
        <img className={styles.poweredByWisp} src={poweredByWisp} alt="Speaking Privately with WISP" />
      </div>
    </div>
  );
}

export default HomeScreen;