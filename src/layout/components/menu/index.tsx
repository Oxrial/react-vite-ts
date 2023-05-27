import { ReactNode, Key } from 'react'
import type { MenuProps } from 'antd'
import { routesObject } from '@/router'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { RouteItem } from '@/types/routes'
type MenuItem = Required<MenuProps>['items'][number]

export default function MenuIndex() {
    const location = useLocation()
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<Array<string>>([])
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<string>>([])
    const [inited, setInited] = useState<boolean>(false)

    useEffect(() => {
        const routes = matchRoutes(routesObject, location.pathname)
        const defaultKeys = (routes && routes.map(route => route.pathname)) || []
        setDefaultSelectedKeys(defaultKeys)
        setDefaultOpenKeys(defaultKeys)
        setInited(true)
    }, [location.pathname])

    const navigate = useNavigate()
    const getItem = (key: Key, label: ReactNode, icon?: ReactNode, children?: MenuItem[], type?: 'group'): MenuItem =>
        ({ key, label, icon, children, type } as MenuItem)
    const genderMenu = (routes: RouteItem[], parentPath = '') => {
        const items: MenuItem[] = []
        routes
            .filter(route => !route.meta?.hidden)
            .forEach((route: RouteItem) => {
                const children = (route.children?.length && genderMenu(route.children, route.path)) || undefined
                items.push(
                    children?.length === 1
                        ? children[0]
                        : getItem(
                              (parentPath + (parentPath && parentPath !== '/' ? route.path && '/' : '') + route.path) as string,
                              route.meta?.title,
                              route.icon,
                              children
                          )
                )
            })
        return items
    }
    const items = genderMenu(routesObject)
    const menuHandle = ({ key }: { key: string }) => navigate(key)

    const headerHeight = 64
    if (!inited) return <Spin spinning={!inited} style={{ height: 'calc(100vh - ' + headerHeight + 'px)' }} />
    return (
        <Menu
            theme="dark"
            mode="inline"
            style={{ height: 'calc(100vh - ' + headerHeight + 'px)' }}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            items={items as MenuItem[]}
            onClick={menuHandle}
        />
    )
}
