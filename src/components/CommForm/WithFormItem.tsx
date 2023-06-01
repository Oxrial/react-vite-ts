import { FormItemProps } from 'antd'

/**
 * 高阶组件(HOC)，接收组件后将其他属性合并到组件属性中
 * 使用方式WithFormItem<XXXComponentPrpos>(XXXComponent)
 * memo(HOC): react组件的特征：当组件中的 props 发生变化时，默认情况下整个组件都会重新渲染
 *                memo接收一个组件A作为参数并返回一个组件B，如果组件B的 props（或其中的值）没有改变，则组件 B 会阻止组件 A 重新渲染
 * @param Component 组件
 * @returns
 */
export default function WithFormItem<T>(Component: React.ComponentType<T>) {
    const FormItem = (props: FormItemProps & T) => {
        const {
            colon,
            dependencies,
            extra,
            getValueFromEvent,
            getValueProps,
            hasFeedback,
            help,
            hidden,
            htmlFor,
            label,
            labelAlign,
            labelCol,
            messageVariables,
            name,
            normalize,
            noStyle,
            preserve,
            required,
            rules,
            shouldUpdate,
            tooltip,
            trigger,
            validateFirst,
            validateStatus,
            validateTrigger,
            valuePropName,
            wrapperCol,
            ...otherProps
        } = props

        const formItemProps: FormItemProps = {
            colon,
            dependencies,
            extra,
            getValueFromEvent,
            getValueProps,
            hasFeedback,
            help,
            hidden,
            htmlFor,
            label,
            labelAlign,
            labelCol,
            messageVariables,
            name,
            normalize,
            noStyle,
            preserve,
            required,
            rules,
            shouldUpdate,
            tooltip,
            trigger,
            validateFirst,
            validateStatus,
            validateTrigger,
            valuePropName,
            wrapperCol
        }

        return (
            <Form.Item {...formItemProps}>
                <Component {...(otherProps as T & FormItemProps)} />
            </Form.Item>
        )
    }
    return memo(FormItem)
}
