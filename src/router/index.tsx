import { lazy, Suspense, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import AppLayout from '@/layout'
import { RouteItem } from '@/types/routes'

// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import('@/views/home'))
// eslint-disable-next-line react-refresh/only-export-components
const Hellow1 = lazy(() => import('@/views/hellow'))
// eslint-disable-next-line react-refresh/only-export-components
const Hellow2 = lazy(() => import('@/views/hellow2'))
const lazyLoad = (element: ReactNode): ReactNode => {
    return <Suspense fallback={<Spin />}>{element}</Suspense>
}
export const routesObject = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="/home" />,
                meta: { hidden: true }
            },
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
    }
] as RouteItem[]
