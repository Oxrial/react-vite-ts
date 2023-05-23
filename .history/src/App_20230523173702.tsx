import { Route, Router } from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
  return (
    <Router>
      <Route path="/hello" element={<Hellow outcount={1}></Hellow>}></Route>
    </Router>
  )
}

export default App
