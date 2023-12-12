import { Route } from 'wouter';
import HomeScreen from '@/homeScreen/HomeScreen';
import PlayScreen from '@/playScreen/PlayScreen';
import MicAccessScreen from "@/micAccessScreen/MicAccessScreen.tsx";

function Router() {
  return (
    <>
      <Route path="/" component={HomeScreen} />
      <Route path="/micAccess" component={MicAccessScreen} />
      <Route path="/play" component={PlayScreen} />
    </>
  )
}

export default Router
