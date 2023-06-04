import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { theme } from 'antd'
const { Header, Content, Sider } = Layout
import { Outlet } from 'react-router-dom'
import MenuIndex from './components/menu'

const LayoutIndex = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const headerHeight = 64
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
                <div
                    style={{
                        height: headerHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <img src="/src/assets/logo.jpg" style={{ width: '100%' }} />
                </div>
                <MenuIndex />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, height: headerHeight }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined rev={undefined} /> : <MenuFoldOutlined rev={undefined} />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: headerHeight
                        }}
                    />
                </Header>
                <Content style={{ maxHeight: 'calc(100vh - 60px)', overflow: 'auto' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default LayoutIndex
