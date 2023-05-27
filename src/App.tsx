import {
    // syncRoute,
    // syncRouter,
    routesObject
    // routes
    // onRouteBefore
} from '@/router'
// import RouterWaiter from './router/router-waiter'
import { useRoutes } from 'react-router-dom'

function App() {
    return useRoutes(routesObject)
    // return <RouterWaiter routes={routes} />
}

export default App
