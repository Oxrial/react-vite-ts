import WithFormItem from './WithFormItem'
import Item, { ItemType } from './FormItem'
import css from './index.module.scss'
import { ButtonProps, FormItemProps, FormProps } from 'antd'
import { ReactNode } from 'react'

export type FormItemType = ItemType & { render?: JSX.Element; formItemProps: FormItemProps }
export type OperationItem = ButtonProps & {
    label: string | ReactNode
}
export interface FormOptions<T> {
    items: Array<FormItemType & T>
    handler?: OperationItem[]
}
export default function CommForm<T>(
    props: FormOptions<T> &
        FormProps & {
            dialog?: boolean
        }
) {
    const { items, handler = [], ...formOptions } = props
    const { className, layout = 'inline', dialog = false, ...otherFormOptions } = formOptions
    const cls = className
        ?.split(' ')
        .map(c => css[c])
        .join(' ')
    const OpreationRender = (items: OperationItem[]) => {
        return (
            <Space className="operation">
                {items.map((item, index) => {
                    const { label, ...props } = item
                    return (
                        <Button key={'btn_' + index} {...props}>
                            {label}
                        </Button>
                    )
                })}
            </Space>
        )
    }
    const Opreation = WithFormItem(() => OpreationRender(handler))

    return (
        <Form className={css['comm-form'] + ' ' + css[dialog ? 'dialog' : 'search'] + ' ' + (cls ? cls : '')} layout={layout} {...otherFormOptions}>
            {items.map((item, index) => {
                if ('render' in item) {
                    const Ite = WithFormItem(() => item.render!)
                    return <Ite key={'formitem_' + index} {...item.formItemProps} />
                } else {
                    return <Item key={'formitem_' + index} {...item} />
                }
            })}
            <Opreation />
        </Form>
    )
}
