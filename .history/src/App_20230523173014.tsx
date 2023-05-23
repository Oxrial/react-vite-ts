import { Route} from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
  return (
    <>
      <Route path="/hello" component={Hellow}></Route>
    </>
  )
}

export default App
