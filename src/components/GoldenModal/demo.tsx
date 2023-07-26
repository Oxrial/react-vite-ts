import CommForm, { FormItemType, OperationItem } from '@/components/CommForm'
import Item from '@/components/CommForm/FormItem'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import GlodenModal from '@/components/GoldenModal'
const GlodenModalz = NiceModal.create(GlodenModal)
import { cloneDeep } from 'lodash-es'

export default function DemoIndex() {
    const [formA] = Form.useForm()

    // 指向的GlodModal一致，实例一致，嵌套弹窗不可用，可作弹窗内容替换
    const modalA = useModal(GlodenModalz)
    const GlodModal2 = cloneDeep(GlodenModalz)
    const modalRA = useModal(GlodModal2)

    // 通过id注册，符合多弹窗嵌套
    const [formB] = Form.useForm()
    const [formRB] = Form.useForm()

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

    const handlerB: OperationItem[] = [
        {
            onClick: () => console.log(formB.getFieldsValue()),
            htmlType: 'submit',
            label: '提交'
        },
        {
            onClick: () => {
                const props = {
                    title: 'RB',
                    width: '50%',
                    onCancel: () => {
                        NiceModal.hide('RB_MODAL')
                        console.log(formRB.getFieldsValue())
                    }
                }
                NiceModal.show('RB_MODAL', props)
            },
            label: '嵌套弹窗RB'
        }
    ]

    return (
        <Card style={{ margin: 10 }}>
            {/* 不支持嵌套弹窗，实例相同，通过show的props可以替换内容，但form返回无法找到表单，适合非回调追寻内容替换 */}
            <NiceModal.Provider>
                <Button
                    onClick={() => {
                        const handlerA: OperationItem[] = [
                            {
                                onClick: () => console.log(formA.getFieldsValue()),
                                htmlType: 'submit',
                                label: '提交'
                            },
                            {
                                onClick: () => {
                                    modalRA.show({
                                        title: 'RA',
                                        width: '40%',
                                        Component: <span>内容替换</span>,
                                        onCancel: () => {
                                            modalRA.hide()
                                        }
                                    })
                                },
                                label: '内容替换为RA'
                            }
                        ]
                        modalA.show({
                            title: 'A',
                            width: '50%',
                            Component: <CommForm items={items} form={formA} handler={handlerA} dialog={true} />,
                            onCancel: () => {
                                modalA.hide()
                                console.log(formA.getFieldsValue())
                            }
                        })
                    }}
                >
                    显示全局弹窗A
                </Button>

                {/* 通过id唤起嵌套弹窗 */}
                <GlodenModalz id="B_MODAL" Component={<CommForm items={items} form={formB} handler={handlerB} dialog={true} />} />
                <GlodenModalz
                    id="RB_MODAL"
                    title="TTT5_1"
                    width="40%"
                    onCancel={() => {
                        NiceModal.hide('5_1_1')
                        console.log(formRB.getFieldsValue())
                    }}
                    Component={<CommForm items={items} form={formRB} dialog={true} />}
                />
                <Button
                    onClick={() => {
                        NiceModal.show('B_MODAL', {
                            title: 'B',
                            width: '50%',
                            onCancel: () => {
                                NiceModal.hide('B_MODAL')
                                console.log(formB.getFieldsValue())
                            }
                        })
                    }}
                >
                    显示全局弹窗B
                </Button>
            </NiceModal.Provider>
        </Card>
    )
}
