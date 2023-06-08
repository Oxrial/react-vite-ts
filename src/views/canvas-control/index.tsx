import { camelCase, upperFirst } from 'lodash-es'
import { Fragment } from 'react'
import { lazyLoad } from '@/utils/common'
export default function CanvasControl() {
    interface CacheComponent {
        [componentName: string]: any
    }
    const importModules = (cs: any) => {
        const cache: CacheComponent = {}
        Object.keys(cs).forEach(c => (cache[upperFirst(camelCase(c.replace(/(.*\/)*([^.]+).*/gi, '$2')))] = lazy(cs[c])))
        return cache
    }
    // 不能附上参数import: 'default'默认导出，否则react识别不出是react组件
    // eager: true 表示同步引入，如果不传或者传false，则是异步引入，仅当调用时执行导入
    // 最终返回格式 { xxx: () => import(yyy), ... }
    // 对比eager: true { xxx: Module{Symbol(Symbol.toStringTag): 'Module}, ... }
    // eager: true, import: 'default { xxx: function(), ... } 为组件本身
    const loadModules = importModules(
        // eslint-disable-next-line prettier/prettier
        import.meta.glob('./modules/*.tsx', {
            /* eager: true, import: 'default' */
        })
    )

    return (
        <>
            {Object.keys(loadModules).map(pathKey => {
                const Module = loadModules[pathKey]
                return <Fragment key={pathKey}>{lazyLoad(<Module />)}</Fragment>
            })}
        </>
    )
}
