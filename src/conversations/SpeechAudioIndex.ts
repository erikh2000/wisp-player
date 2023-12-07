import { SpeechAudio } from 'sl-web-face';
import { LipzEvent, textToViseme } from 'sl-web-speech';
import { wavBytesToAudioBufferAndCues, WavCue } from "sl-web-audio";

// TODO - refactor?
function _wavCuesToLipzEvents(cues:WavCue[]):LipzEvent[] {
  const lipzEvents:LipzEvent[] = [];
  for(const cue of cues) {
    const viseme = textToViseme(cue.label);
    const lipzEvent = new LipzEvent(cue.position, viseme);
    lipzEvents.push(lipzEvent);
  }
  return lipzEvents;
}

async function fetchFinalTake(spielName:string, characterName:string, speechId:string, dialogueText:string):Promise<Uint8Array|null> {
  const url = `http://localhost:3000/finalTake/${spielName}/${characterName}/${speechId}/${dialogueText}`; // TODO fix.
  const response = await fetch(url);
  if (response.status !== 200) return null;
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

class SpeechAudioIndex {
  async findSpeechAudio(spielName:string, characterName:string, speechId:string, dialogueText:string):Promise<SpeechAudio|null> {
    const wavBytes = await fetchFinalTake(spielName, characterName, speechId, dialogueText);
    if (!wavBytes) return null;
    const [audioBuffer, cues] = await wavBytesToAudioBufferAndCues(wavBytes);
    const lipzEvents = _wavCuesToLipzEvents(cues);
    return new SpeechAudio(audioBuffer, lipzEvents);
  }
}

export default SpeechAudioIndex;