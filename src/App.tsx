import {
    // syncRoute, syncRouter,
    routes
    // onRouteBefore
} from '@/router'
import RouterWaiter from './router/router-waiter'
// import { useRoutes } from 'react-router-dom'
function App() {
    // return useRoutes(syncRouter(syncRoute))
    return <RouterWaiter routes={routes} />
}

export default App
