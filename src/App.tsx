import { syncRoute, syncRouter } from '@/router'
import { useRoutes } from 'react-router-dom'

function App() {
    return useRoutes(syncRouter(syncRoute))
}

export default App
