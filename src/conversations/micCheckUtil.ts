// Errors that map to messages/actions for an end user. A large number of the possible error types just indicate that
// the code has errors, the web app is hosted incorrectly, or something anomalous happened on a user's device. Those 
// just go under the UNEXPECTED code, and devs can look at the console for more info.
export enum MicAccessResult {
  AVAILABLE,     // Microphone access is available and ready to use. 
  DENIED,        // Microphone access is unavailable due to a permissions issue or denial by the user.
  NO_MICROPHONE, // No microphone is present according to the browser.
  UNEXPECTED     // Microphone access is unavailable due to an unexpected error.
}

export async function checkMicAccess():Promise<MicAccessResult> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    stream.getTracks().forEach((track) => track.stop());
    return MicAccessResult.AVAILABLE;
  } catch(err) {
    const name = (err as Error).name;
    switch(name) {
      case 'NotAllowedError':
      case 'AbortError':
        return MicAccessResult.DENIED;
        
      case 'NotFoundError': 
        return MicAccessResult.NO_MICROPHONE;
        
      default:
        console.error(err);
        return MicAccessResult.UNEXPECTED;
    }
  }
}