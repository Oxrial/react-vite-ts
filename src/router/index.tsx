import { Suspense, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import AppLayout from '@/layout'
import { RouteItem } from '@/types/router'
import Login from '@/views/login'

import { Home, Hellow1, Hellow2, GoldenModalDemo, CanvasControl } from '@/views'

const lazyLoad = (element: ReactNode): ReactNode => {
    return <Suspense fallback={<Spin />}>{element}</Suspense>
}

export const routesObject = [
    {
        path: '/',
        element: <Navigate to="/home" />,
        meta: { hidden: true }
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'home',
                element: lazyLoad(<Home />),
                meta: { title: '首页' }
            }
        ]
    },
    {
        path: '/hellow',
        element: <AppLayout />,
        meta: { title: 'HELLOW' },
        children: [
            {
                path: 'hellow',
                element: lazyLoad(<Hellow1 outcount={1} />),
                meta: { title: 'HELLOW1' }
            },
            {
                path: 'hellow2',
                element: lazyLoad(<Hellow2 />),
                meta: { title: 'HELLOW2' }
            }
        ]
    },
    {
        path: '/modal',
        element: <AppLayout />,
        meta: { title: 'Modal' },
        children: [
            {
                path: 'goldren',
                element: lazyLoad(<GoldenModalDemo />),
                meta: { title: 'GoldrenModal' }
            },
            {
                path: 'comm',
                element: lazyLoad(<Hellow2 />),
                meta: { title: 'HELLOW2' }
            }
        ]
    },
    {
        path: '/canvas-control',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: lazyLoad(<CanvasControl />),
                meta: { title: 'CanvasControl' }
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
        meta: { title: '登录', hidden: true }
    }
] as RouteItem[]
