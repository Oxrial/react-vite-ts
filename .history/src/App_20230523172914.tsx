import { BrowserRouter, Route} from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/hello" component={Hellow}></Route>
      </BrowserRouter>
    </>
  )
}

export default App
