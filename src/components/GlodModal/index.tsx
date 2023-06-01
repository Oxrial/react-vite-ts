import NiceModal, { useModal, antdModalV5 } from '@ebay/nice-modal-react'
import { ModalProps } from 'antd'
interface NiceModalType {
    Component: JSX.Element
}
const M = NiceModal.create((props: NiceModalType & ModalProps) => {
    const { Component, ...modalProps } = props
    const modal = useModal()
    return (
        <Modal {...antdModalV5(modal)} {...modalProps}>
            {Component}
        </Modal>
    )
})
// eslint-disable-next-line react-refresh/only-export-components
export default M
