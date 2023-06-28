import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { routesObject } from '@/router/index'
import { hasToken } from '@/utils/auth'

const whiteList = ['/login']
export default function RouteGuard({ children }: any) {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (whiteList.includes(location.pathname)) {
            // return children
        } else {
            const mathchs = matchRoutes(routesObject, location)
            const route = mathchs?.[mathchs.length - 1].route
            document.title = route?.meta?.title
            if (route?.meta?.notLogin) {
                // return children
            } else {
                if (hasToken()) {
                    // return children
                } else {
                    navigate(`/login?redirect=${location.pathname}`)
                }
            }
        }
    }, [location.pathname, location, navigate])

    return children
}
