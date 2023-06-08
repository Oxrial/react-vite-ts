import { ReactNode, Suspense } from 'react'

export function getDataType(data: any): string {
    return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1]
}
export const lazyLoad = (element: ReactNode): ReactNode => {
    return <Suspense fallback={<Spin />}>{element}</Suspense>
}
