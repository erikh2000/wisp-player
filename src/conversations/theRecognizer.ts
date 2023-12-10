import {Recognizer} from 'sl-web-speech';

let recognizer:Recognizer|null = null;

export function theRecognizer() {
  return recognizer;
}
export async function init() {
  
  return new Promise((resolve) => {
    const _onReady = () => { resolve(recognizer) }
    recognizer = new Recognizer(_onReady);
  })
}