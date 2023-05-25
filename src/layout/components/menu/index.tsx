import { ReactNode, Key } from 'react'
import type { MenuProps } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { routes } from '@/router'
import { RoutesItemType } from '@/types/router'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}
export default function MenuIndex() {
    console.log(routes)
    const items: MenuItem[] = []
    routes.forEach((route: RoutesItemType) => {
        items.push(getItem(route?.meta?.title, route!.path))
    })
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
