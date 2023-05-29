import { routesObject } from '@/router'
import { useRoutes } from 'react-router-dom'
// import RouteGuard from './router/routeGuard'
function App() {
    const routes = useRoutes(routesObject)
    // return <RouteGuard>{routes}</RouteGuard>
    return routes
}

export default App
