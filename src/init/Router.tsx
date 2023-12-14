import { Route } from 'wouter';
import HomeScreen from '@/homeScreen/HomeScreen';
import PlayScreen from '@/playScreen/PlayScreen';
import MicAccessScreen from "@/micAccessScreen/MicAccessScreen.tsx";
import {HOME_URL, MIC_ACCESS_URL, PLAY_URL} from '@/common/urlUtil';

function Router() {
  return (
    <>
      <Route path={HOME_URL} component={HomeScreen} />
      <Route path={MIC_ACCESS_URL} component={MicAccessScreen} />
      <Route path={PLAY_URL} component={PlayScreen} />
    </>
  )
}

export default Router