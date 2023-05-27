// import { RouterWaiterPropsType } from '@/types/router'
// import { useRoutes } from 'react-router-dom'
// import RouteFactory from './factory'

// export default function RouterWaiter({ routes, onRouteBefore, loading }: RouterWaiterPropsType) {
//     const routeFactory = new RouteFactory({
//         routes,
//         onRouteBefore,
//         loading
//     })
//     const reactRoutes = routeFactory.transformRoutes()
//     const elements = useRoutes(reactRoutes)

//     return elements
// }
import { RouterWaiterPropsType } from '@/types/router'
import { useRoutes } from 'react-router-dom'
import useRouteFactory from './factory'

export default function RouterWaiter({ routes, onRouteBefore, loading }: RouterWaiterPropsType) {
    const { transformRoutes } = useRouteFactory({
        routes,
        onRouteBefore,
        loading
    })
    const reactRoutes = transformRoutes()
    const elements = useRoutes(reactRoutes)
    return elements
}
