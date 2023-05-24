import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

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
