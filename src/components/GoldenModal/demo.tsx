import CommForm, { FormItemType, OperationItem } from '@/components/CommForm'
import Item from '@/components/CommForm/FormItem'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import GlodModal from '@/components/GoldenModal'
import { cloneDeep } from 'lodash-es'

export default function DemoIndex() {
    const [form4] = Form.useForm()

    // 指向的GlodModal一致，实例一致，嵌套弹窗不可用，可作弹窗内容替换
    const mo4 = useModal(GlodModal)
    const GlodModal2 = cloneDeep(GlodModal)
    const mo4_1 = useModal(GlodModal2)

    // 通过id注册，符合多弹窗嵌套
    const [form5] = Form.useForm()
    const [form5_1] = Form.useForm()

    const items = [
        {
            formItemProps: {
                label: 'Username',
                required: true
            },
            render: (
                <Row gutter={8}>
                    <Col span={8}>
                        <Item
                            type="Select"
                            options={['lucy', 'Alice'].map(m => ({ label: m, value: m }))}
                            label="TEXT"
                            name="text"
                            noStyle
                            validateTrigger="onBlur"
                        ></Item>
                    </Col>
                    <Col span={16}>
                        <Item
                            name="text2"
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
            name: 'text3',
            label: 'TEXT2',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Please Input something!' }]
        }
    ] as Array<FormItemType>

    const handler5: OperationItem[] = [
        {
            onClick: () => console.log(form5.getFieldsValue()),
            htmlType: 'submit',
            label: '提交'
        },
        {
            onClick: () => {
                const props = {
                    title: 'TTT6',
                    width: '50%',
                    onCancel: () => {
                        NiceModal.hide('5_1_1')
                        console.log(form5_1.getFieldsValue())
                    }
                }
                NiceModal.show('5_1_1', props)
            },
            label: '嵌套弹窗'
        }
    ]

    return (
        <Card style={{ margin: 10 }}>
            {/* 不支持嵌套弹窗，实例相同，通过show的props可以替换内容，但form返回无法找到表单，适合非回调追寻内容替换 */}
            <NiceModal.Provider>
                <Button
                    onClick={() => {
                        const handler4: OperationItem[] = [
                            {
                                onClick: () => console.log(form4.getFieldsValue()),
                                htmlType: 'submit',
                                label: '提交'
                            },
                            {
                                onClick: () => {
                                    mo4_1.show({
                                        title: 'TTT4_1',
                                        width: '40%',
                                        // Component: <CommForm items={items} form={form4_1} dialog={true} />,
                                        Component: <span>内容替换</span>,
                                        onCancel: () => {
                                            mo4_1.hide()
                                            // console.log(form4_1.getFieldsValue())
                                        }
                                    })
                                },
                                label: '内容替换'
                            }
                        ]
                        mo4.show({
                            title: 'TTT4',
                            width: '50%',
                            Component: <CommForm items={items} form={form4} handler={handler4} dialog={true} />,
                            onCancel: () => {
                                mo4.hide()
                                console.log(form4.getFieldsValue())
                            }
                        })
                    }}
                >
                    显示全局弹窗4
                </Button>

                {/* 通过id唤起嵌套弹窗 */}
                <GlodModal id="5_1" Component={<CommForm items={items} form={form5} handler={handler5} dialog={true} />} />
                <GlodModal
                    id="5_1_1"
                    title="TTT5_1"
                    width="40%"
                    onCancel={() => {
                        NiceModal.hide('5_1_1')
                        console.log(form5_1.getFieldsValue())
                    }}
                    Component={<CommForm items={items} form={form5_1} dialog={true} />}
                />
                <Button
                    onClick={() => {
                        NiceModal.show('5_1', {
                            title: 'TTT5',
                            width: '50%',
                            onCancel: () => {
                                NiceModal.hide('5_1')
                                console.log(form5.getFieldsValue())
                            }
                        })
                    }}
                >
                    显示全局弹窗5
                </Button>
            </NiceModal.Provider>
        </Card>
    )
}
