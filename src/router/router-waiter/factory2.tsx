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
            const obj = { ...route }
            if (obj.path === undefined) {
                return
            }
            if (obj.redirect) {
                obj.element = <Navigate to={obj.redirect} replace={true} />
            } else if (obj.component) {
                obj.element = lazyLoad(obj.component, obj.meta || {})
            }
            delete obj.redirect
            delete obj.component
            delete obj.meta
            if (obj.children) {
                obj.children = transformRoutes(obj.children)
            }
            list.push(obj)
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
