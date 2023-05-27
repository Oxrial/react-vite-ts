/**
 * 路由配置列表数据转换
 */
import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { RouterWaiterPropsType, MetaType, FunctionalImportType } from '@/types/router'
import RouteInterceptor from './interceptor'

export default class RouteFactory {
    routes
    onRouteBefore
    loading

    constructor(option: RouterWaiterPropsType) {
        this.routes = option.routes || []
        this.onRouteBefore = option.onRouteBefore
        this.loading = option.loading || <div></div>
    }

    transformRoutes(routeList = this.routes) {
        const list: RouteObject[] = []
        routeList.forEach(route => {
            const obj = { ...route }
            if (obj.path === undefined) {
                return
            }
            if (obj.redirect) {
                obj.element = <Navigate to={obj.redirect} replace={true} />
            } else if (obj.component) {
                obj.element = this.lazyLoad(obj.component, obj.meta || {})
            }
            delete obj.redirect
            delete obj.component
            delete obj.meta
            if (obj.children) {
                obj.children = this.transformRoutes(obj.children)
            }
            list.push(obj)
        })
        return list
    }

    /**
     * @description: 路由懒加载
     */
    lazyLoad(importFn: FunctionalImportType, meta: MetaType) {
        const Element = lazy(importFn)
        const lazyElement = (
            <Suspense fallback={this.loading}>
                <Element _meta={meta} />
            </Suspense>
        )
        return <RouteInterceptor element={lazyElement} meta={meta} onRouteBefore={this.onRouteBefore} />
    }
}
