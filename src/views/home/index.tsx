import { ConfigProvider, Button } from 'antd'
export default function home() {
    return (
        <Card style={{ margin: 10 }}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b'
                    }
                }}
            >
                <Button type="primary">ANTD</Button>
            </ConfigProvider>
        </Card>
    )
}
