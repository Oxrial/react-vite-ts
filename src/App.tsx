import { Route, Routes } from 'react-router-dom'
import Hellow from './views/hellow'
function App() {
    return (
        <Routes>
            <Route path="/hello" element={<Hellow outcount={1}></Hellow>} />
        </Routes>
    )
}

export default App
