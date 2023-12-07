import {Recognizer} from 'sl-web-speech';

let recognizer:Recognizer|null = null;
let isRecognizerReady = false;

export function theRecognizer() {
  return recognizer;
}

function _onReady() {
  isRecognizerReady = true;
}
export function init() {
  recognizer = new Recognizer(_onReady);
}

export function isReady() {
  return isRecognizerReady;
}