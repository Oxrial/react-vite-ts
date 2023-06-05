import h2c from 'html2canvas'
export default function ScreenShot() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const screenDom = useRef<HTMLDivElement>(null)
    return (
        <Card style={{ margin: 10 }} title="截图">
            <div style={{ display: 'flex' }}>
                <div ref={screenDom} style={{ backgroundColor: 'pink', padding: 20, marginRight: 20 }}>
                    <div style={{ width: '50%', height: '300px', backgroundColor: 'white', fontSize: 100, fontWeight: 'bold' }}>SCREENSHOT</div>
                </div>
                <Button
                    style={{ marginRight: 20 }}
                    onClick={() => {
                        if (!(screenDom.current && canvasRef.current)) return
                        const width = screenDom.current.offsetWidth
                        const height = screenDom.current.offsetHeight
                        canvasRef.current.width = width
                        canvasRef.current.height = height
                        h2c(screenDom.current).then(canvas => {
                            const ctx = canvasRef.current!.getContext('2d')
                            ctx?.drawImage(canvas, 0, 0, width, height)
                        })
                    }}
                >
                    截图
                </Button>
                <canvas ref={canvasRef} />
            </div>
        </Card>
    )
}
