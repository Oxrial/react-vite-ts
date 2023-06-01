import { antdModalV5, NiceModalHandler } from '@ebay/nice-modal-react'
interface CommModalType {
    modal: NiceModalHandler
    Component: JSX.Element
}
export default function CommModal(props: CommModalType) {
    const { modal, Component } = props
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    return <Modal {...antdModalV5(modal)}>{Component}</Modal>
}
