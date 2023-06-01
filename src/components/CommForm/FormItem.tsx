import { FormItemProps, InputProps, SelectProps, DatePickerProps, InputNumberProps, SwitchProps } from 'antd'
import { Input, InputNumber, Select, Switch, DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { TextAreaProps } from 'antd/es/input'
import WithFormItem from './WithFormItem'

export const Item = {
    Input: WithFormItem<InputProps>(Input),
    InputNumber: WithFormItem<InputNumberProps>(InputNumber),
    Select: WithFormItem<SelectProps>(Select),
    Switch: WithFormItem<SwitchProps>(Switch),
    DatePicker: WithFormItem<DatePickerProps>(DatePicker),
    TextArea: WithFormItem<TextAreaProps>(Input.TextArea),
    RangePicker: WithFormItem<RangePickerProps>(DatePicker.RangePicker)
} as { [key: string]: any }
export type ItemType = FormItemProps & { type?: keyof typeof Item }
export default function FormItem<T>(props: ItemType & T) {
    const TrueItem = Item[props.type || 'Input']
    const placeholder =
        'placeholder' in props ? (props.placeholder as string) : `请${(props.type || 'Input') === 'Select' ? '选择' : '输入'}${props.label}`
    return <TrueItem {...props} placeholder={placeholder} />
}
