/**
 * 路由配置列表数据转换
 */
import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { RouterWaiterPropsType, MetaType, FunctionalImportType } from '@/types/router'
import RouteInterceptor from './interceptor'

export default function ReactFactory(option: RouterWaiterPropsType) {
    const { routes = [], onRouteBefore, loading = <div></div> } = option

    const transformRoutes = (routeList = routes) => {
        const list: RouteObject[] = []
        routeList.forEach(route => {
            const routeTemp: RouteObject = {}
            if (route.path === undefined) {
                return
            }
            routeTemp.path = route.path
            if (route.redirect) {
                routeTemp.element = <Navigate to={route.redirect} replace={true} />
            } else if (route.component) {
                routeTemp.element = typeof route.component === 'function' ? lazyLoad(route.component, route.meta || {}) : route.component
            }
            if (route.children) {
                routeTemp.children = transformRoutes(route.children)
            }
            list.push(routeTemp)
        })
        return list
    }

    /**
     * @description: 路由懒加载
     */
    const lazyLoad = (importFn: FunctionalImportType, meta: MetaType) => {
        const Element = lazy(importFn)
        const lazyElement = (
            <Suspense fallback={loading}>
                <Element _meta={meta} />
            </Suspense>
        )
        return <RouteInterceptor element={lazyElement} meta={meta} onRouteBefore={onRouteBefore} />
    }
    return {
        transformRoutes
    }
}
