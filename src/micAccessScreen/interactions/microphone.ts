import {checkMicAccess} from "@/conversations/micCheckUtil.ts";


let isAccessing = false;
export async function accessTheMic(setIsChecking:Function, setMicAccessResult:Function) {
  if (isAccessing) return null;
  isAccessing = true;
  try {
    setIsChecking(true);
    const micAccessResult = await checkMicAccess();
    setMicAccessResult(micAccessResult);
    setTimeout(() => { setIsChecking(false); }, 1000);
  } finally {
    isAccessing = false;
  }
}