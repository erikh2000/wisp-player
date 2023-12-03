import { Route } from 'wouter';
import HomeScreen from '../homeScreen/HomeScreen';
import PlayScreen from '../playScreen/PlayScreen';

function Router() {
  return (
    <>
      <Route path="/" component={HomeScreen} />
      <Route path="/play" component={PlayScreen} />
    </>
  )
}

export default Router
