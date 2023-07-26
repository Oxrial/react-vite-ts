import { useModal, antdModalV5 } from '@ebay/nice-modal-react'
import { ModalProps } from 'antd'
interface NiceModalType {
    Component: JSX.Element
}
export default function GlodenModal(props: NiceModalType & ModalProps) {
    const { Component, ...modalProps } = props
    const modal = useModal()
    return (
        <Modal {...antdModalV5(modal)} {...modalProps}>
            {Component}
        </Modal>
    )
}
