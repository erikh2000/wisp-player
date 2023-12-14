import styles from './MicAccessScreen.module.css';
import secureMic from './images/secureMic.png';
import poweredByWisp from '@/homeScreen/images/poweredByWisp.png';
import {MicAccessResult} from "@/conversations/micCheckUtil";
import {HOME_URL} from "@/common/urlUtil.ts";
import {accessTheMic} from "./interactions/microphone";

import {useEffect, useState} from "react";
import {useLocation} from "wouter";
import 'sl-react-ui/dist/style.css';

function _getCallToActionText(micAccessResult:MicAccessResult|null):string {
  switch (micAccessResult) {
    case MicAccessResult.AVAILABLE:
      return '';
    case MicAccessResult.NO_MICROPHONE:
      return 'The browser could not find a microphone on your device. Maybe a microphone is not plugged in or there is a configuration issue?';
    case MicAccessResult.DENIED:
      return 'Please grant access to your microphone and then click the button below. Most browsers will have a microphone icon in the address bar that you can click to grant access.';
    case MicAccessResult.UNEXPECTED:
      return 'There was an unexpected error. It might be our fault or there could be something Extra-Special about your device that is confusing us. Sorry about that!';
    default:
      return '';
  }
}

function MicAccessScreen() {
  const [, setLocation] = useLocation();
  const [micAccessResult, setMicAccessResult] = useState<MicAccessResult|null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  
  useEffect(() => {
    accessTheMic(setIsChecking, setMicAccessResult).then(()=>{});
  },[setMicAccessResult]);

  useEffect(() => {
    if (micAccessResult === MicAccessResult.AVAILABLE) setLocation(HOME_URL);
  }, [micAccessResult]);
  
  const callToActionText = _getCallToActionText(micAccessResult);
  const callToActionStyles = isChecking ? styles.callToActionChecking : styles.callToAction;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>Can't Hear You Yet</h1></div>
      <div className={styles.content}>
        <h2>It's no small thing to ask<br/>for access to your microphone.</h2>
        
        <img className={styles.secureMic} src={secureMic} alt="illustration of a microphone inside of a glass box suggesting security" />
        
        <h2>But to play this game,<br/>that is what we need!</h2>
        
        <p className={callToActionStyles}>{callToActionText}</p>
        
        <button className={styles.startButton} onClick={() => accessTheMic(setIsChecking, setMicAccessResult).then(()=>{})}>Access Microphone</button>
        
      </div>
      <div className={styles.footer}>
        <img className={styles.poweredByWisp} src={poweredByWisp} alt="Speaking Privately with WISP" />
      </div>
    </div>
  );
}

export default MicAccessScreen;