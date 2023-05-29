import { ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'

interface MetaObject {
    [key: string]: any
}
type RouteItem = RouteObject & {
    icon?: ReactNode
    meta?: MetaObject
    children?: RouteItem[]
}
type OnRouteBeforeRes = string | void
interface OnRouteBefore {
    (payload: { pathname: string; meta: MetaObject }): OnRouteBeforeRes | Promise<OnRouteBeforeRes>
}
interface RouteGuardProps {
    routes: RouteItem[]
    onRouteBefore?: OnRouteBefore
    loading?: JSX.Element
}

interface RouteGuard {
    (payload: RouteGuardProps): JSX.Element
}
export type { MetaObject, RouteItem, OnRouteBefore, OnRouteBeforeRes, RouteGuardProps, RouteGuard }
