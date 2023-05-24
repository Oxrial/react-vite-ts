import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
function MenuIndex() {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <UserOutlined rev={undefined} />,
                    label: 'nav 1'
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined rev={undefined} />,
                    label: 'nav 2'
                },
                {
                    key: '3',
                    icon: <UploadOutlined rev={undefined} />,
                    label: 'nav 3'
                }
            ]}
        />
    )
}

export default MenuIndex
