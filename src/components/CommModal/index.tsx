interface CommModalType {
    Component: JSX.Element
}
export default function CommModal(props: CommModalType) {
    const { Component, ...modalProps } = props
    return <Modal {...modalProps}>{Component}</Modal>
}
