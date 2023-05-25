import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { OnRouteBeforeType, RoutesItemType } from '@/types/router'

export interface SyncRoute {
    path: string
    element: React.LazyExoticComponent<any>
    children?: Array<SyncRoute>
    meta?: {
        title?: string
        needLogin?: boolean
    }
}

export const syncRoute: SyncRoute[] = [
    {
        path: '/',
        element: lazy(() => import('@/layout')),
        children: [
            {
                path: '',
                element: lazy(() => import('@/views/home'))
            },
            {
                path: 'hellow',
                element: lazy(() => import('@/views/hellow'))
            }
        ]
    }
]

export function syncRouter(syncRoute: SyncRoute[]): RouteObject[] {
    const routes: RouteObject[] = []
    syncRoute.forEach(route => {
        routes.push({
            path: route.path,
            element: (
                <Suspense fallback={<div>路由加载ing...</div>}>
                    <route.element />
                </Suspense>
            ),
            children: route.children && syncRouter(route.children)
        })
    })
    return routes
}

///////////////////////////////////
export const routes: RoutesItemType[] = [
    {
        path: '/',
        redirect: '/index',
        meta: { hidden: true }
    },
    {
        path: '/index',
        component: () => import('@/layout'),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/home')
            }
        ] as RoutesItemType[]
    }
]

/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时就return一个该页的path路径
 */
export const onRouteBefore: OnRouteBeforeType = ({ pathname, meta }) => {
    // const { userStore } = store
    console.log(pathname)
    // 动态修改页面title
    if (meta.title !== undefined) {
        document.title = meta.title
    }

    // 登录及权限判断
    // if (!meta.noLogin) {
    //     // 路由是否需要登录
    //     if (userStore.isLogin) {
    //         // 用户是否已登录
    //         const { accessId } = meta
    //         const message = `${pathname}，${meta.title || ''}`
    //         const path403 = `/403?message=${encodeURIComponent(message)}`

    //         if (!userStore.isGotUserInfo) {
    //             // 是否已获取到用户（权限）信息
    //             return new Promise(resolve => {
    //                 api.getUserInfo().then((res: any) => {
    //                     const data = res.data || {}
    //                     userStore.setUserInfo(data)

    //                     if (!getIsCanAccess(accessId)) {
    //                         resolve(path403)
    //                     }
    //                 })
    //             })
    //         } else {
    //             if (!getIsCanAccess(accessId)) {
    //                 return path403
    //             }
    //         }
    //     } else {
    //         return `/login?redirectUrl=${encodeURIComponent(window.location.href)}`
    //     }
    // }
}
