import { camelCase, upperFirst } from 'lodash-es'
import { Fragment } from 'react'
export default function CanvasControl() {
    interface CacheComponent {
        [componentName: string]: any
    }
    const importModules = (cs: any) => {
        const cache: CacheComponent = {}
        Object.keys(cs).forEach(c => (cache[upperFirst(camelCase(c.replace(/(.*\/)*([^.]+).*/gi, '$2')))] = cs[c]))
        return cache
    }
    const loadModules = importModules(import.meta.glob('./modules/*.tsx', { eager: true, import: 'default' }))
    return (
        <>
            {Object.keys(loadModules).map(k => (
                <Fragment key={k}>{loadModules[k]()}</Fragment>
            ))}
        </>
    )
}
