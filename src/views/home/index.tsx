import { useState } from 'react'
import { ConfigProvider, Button } from 'antd'
export default function HomeIndex() {
    const [show, changeShow] = useState(false)
    return (
        <Card style={{ margin: 10 }}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b'
                    }
                }}
            >
                {show + ''}
                <Button type="primary" onClick={() => changeShow(!show)}>
                    ANTD
                </Button>
            </ConfigProvider>
        </Card>
    )
}
