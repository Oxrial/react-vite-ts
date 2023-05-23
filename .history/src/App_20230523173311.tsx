import { Route } from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
  return (
    <>
      <Route path="/hello" element={<Hellow outcount={1}></Hellow>}></Route>
    </>
  )
}

export default App
