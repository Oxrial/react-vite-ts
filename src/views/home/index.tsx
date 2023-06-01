import CommForm, { FormItemType, OperationItem } from '@/components/CommForm'
import Item from '@/components/CommForm/FormItem'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import GlodModal from '@/components/GlodModal'
console.log(GlodModal)

export default function HomeIndex() {
    const [form] = Form.useForm()
    const [form2] = Form.useForm()
    const items = [
        {
            formItemProps: {
                label: 'Username',
                required: true
            },
            render: (
                <Row gutter={8}>
                    <Col span={8}>
                        <Item type="Select" label="TEXT" name="text2" noStyle validateTrigger="onBlur"></Item>
                    </Col>
                    <Col span={16}>
                        <Item
                            name="text"
                            label="TEXT"
                            noStyle
                            validateTrigger="onBlur"
                            rules={[{ required: true, message: 'Please Input something!' }]}
                        ></Item>
                    </Col>
                </Row>
            )
        },
        {
            name: 'text2',
            label: 'TEXT2',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Please Input something!' }]
        }
    ] as Array<FormItemType>
    const handler: OperationItem[] = [
        {
            onClick: () => console.log(form.getFieldsValue()),
            htmlType: 'submit',
            label: 'TEST'
        },
        {
            onClick: () => console.log('other'),
            label: 'TEST2'
        }
    ]
    const mo = useModal(GlodModal)

    return (
        <Card style={{ margin: 10 }}>
            {CommForm({ items, form, handler })}
            <CommForm items={items} form={form2} handler={handler} dialog={true} />
            <NiceModal.Provider>
                <Button
                    onClick={() => {
                        const props = {
                            title: 'TTT',
                            width: '50%',
                            Component: <CommForm items={items} form={form2} handler={handler} dialog={true} />
                        }
                        mo.show(props)
                    }}
                >
                    显示弹窗
                </Button>
            </NiceModal.Provider>
        </Card>
    )
}
