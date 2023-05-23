import { Route } from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
  return (
    <R>
      <Route path="/hello" element={<Hellow outcount={1}></Hellow>}></Route>
    </R>
  )
}

export default App
