import styles from './HomeScreen.module.css';
import poweredByWisp from './images/poweredByWisp.png';

import { useLocation } from "wouter";

function HomeScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>Laundromat Etiquette</h1></div>
      <div className={styles.content}>
        <h1>About</h1>
        <p>This dude at the laundromat - what does he want with you?</p>
        <h1>Controls</h1>
        <p>Control is entirely by voice. Talk to characters in English.</p>
        <h1>Credits</h1>
        <p>Erik Hermansen (art, writing, voice)</p>
        <button className={styles.startButton} onClick={() => setLocation('/play')}>Start</button>
      </div>
      <div className={styles.footer}>
        <img className={styles.poweredByWisp} src={poweredByWisp} alt="Speaking Privately with WISP" />
      </div>
    </div>
  );
}

export default HomeScreen;