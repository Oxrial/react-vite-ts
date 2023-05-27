import { ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'

interface MetaObject {
    [key: string]: any
}
export type RouteItem = RouteObject & {
    icon?: ReactNode
    meta?: MetaObject
    children?: RouteItem[]
}
