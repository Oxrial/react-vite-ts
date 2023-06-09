import createCanvas from '../hooks/creatCanvas'

export default function Drawer() {
    const draw = () => {
        const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: 500, domh: 300 })
        const box = document.getElementById('repeat-box')
        box?.appendChild(canvDom)
        if (!canvCtx) return
        const iimage = document.createElement('img')
        iimage.src = '/src/assets/bilibili.jpg'
        iimage.width = 100
        iimage.onload = () => {
            const { dom: tempCanvDom, ctx: tempCanvCtx } = createCanvas({ draw: false, domw: 100, domh: 100 })
            tempCanvCtx?.drawImage(iimage, 0, 0, 100, 100)
            const pattern = canvCtx.createPattern(tempCanvDom, 'repeat')
            canvCtx.fillStyle = pattern as CanvasPattern
            // 绘制矩形
            canvCtx.fillRect(0, 0, canvDom.width, canvDom.width)
        }
    }
    const polylineGradient = () => {
        const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: 500, domh: 300 })
        if (!canvCtx) return
        // 定义折线样式,以beginPath开始以stroke完成一次整体的、独立（样式）的线段
        canvCtx.beginPath()
        canvCtx.lineWidth = 20
        const gradient = canvCtx.createLinearGradient(0, 150, 500, 150)
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(0.25, 'skyblue')
        gradient.addColorStop(0.5, 'pink')
        gradient.addColorStop(0.75, 'red')
        gradient.addColorStop(0.85, 'purple')
        gradient.addColorStop(1, 'white')
        canvCtx.strokeStyle = gradient
        canvCtx.lineJoin = 'round'
        canvCtx.lineCap = 'round'
        // 绘制折线
        canvCtx.moveTo(10, 10)
        canvCtx.lineTo(200, 100)
        canvCtx.lineTo(300, 10)
        canvCtx.lineTo(490, 200)
        canvCtx.stroke()
        const box = document.getElementById('polyline-gradient-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }
    const arc = () => {
        const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: 200, domh: 100 })
        if (!canvCtx) return
        /**
         * arc的startAngle,endAngle接受为弧度值
         * 弧度计算：
         *   半径为1的周长是2π*1，半圆为π,为180角度，【1角度为π/180弧度（0.0174...弧度）】，即n角度的弧度为n*π/180
         *   则1弧度为1/π/180 = 180/π，绘制1弧度也就是57...°默认顺时针绘制
         *   若绘制1弧度输入1即可，可得到角度180/π的角度（57...°）的弧线
         */
        canvCtx.beginPath()
        canvCtx.arc(0, 0, 100, 0, 1)
        canvCtx.stroke()

        // 椭圆
        canvCtx.beginPath()
        canvCtx.ellipse(150, 50, 25, 50, 10, 0, 30 * Math.PI)
        canvCtx.stroke()

        const box = document.getElementById('arc-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }
    const smileArc = () => {
        const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: 200, domh: 200 })
        if (!canvCtx) return
        canvCtx.beginPath()
        canvCtx.arc(100, 100, 100, 0, 2 * Math.PI)
        canvCtx.stroke()

        canvCtx.beginPath()
        canvCtx.arc(50, 60, 30, 0, 2 * Math.PI)
        canvCtx.stroke()
        canvCtx.beginPath()
        canvCtx.arc(60, 60, 10, 0, 2 * Math.PI)
        canvCtx.fillStyle = 'pink'
        canvCtx.fill()
        canvCtx.stroke()

        canvCtx.beginPath()
        canvCtx.arc(150, 60, 30, 0, 2 * Math.PI)
        canvCtx.stroke()
        canvCtx.beginPath()
        canvCtx.moveTo(160, 40)
        canvCtx.lineTo(135, 60)
        canvCtx.stroke()
        canvCtx.beginPath()
        canvCtx.moveTo(135, 60)
        canvCtx.lineTo(160, 80)
        canvCtx.stroke()

        canvCtx.beginPath()
        canvCtx.arc(100, 100, 5, 0, 2 * Math.PI)
        canvCtx.fillStyle = 'pink'
        canvCtx.fill()
        canvCtx.stroke()

        canvCtx.beginPath()
        canvCtx.ellipse(100, 130, 40, 20, 0, 0, 150 * (Math.PI / 180))
        // canvCtx.arc(100, 100, 60, (30 * Math.PI) / 180, (150 * Math.PI) / 180)
        canvCtx.stroke()
        const box = document.getElementById('smile-arc-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }
    useEffect(() => {
        polylineGradient()
        arc()
        smileArc()
    }, [])
    return (
        <>
            <Card style={{ margin: 10 }} title="repeat">
                <img src="/src/assets/bilibili.jpg" width={100} alt="" />
                <Button onClick={draw}>REPEAT</Button>
                <div id="repeat-box" style={{ display: 'inline-block' }}></div>
            </Card>
            <Card style={{ margin: 10 }} title="折线渐变">
                <div id="polyline-gradient-box" style={{ display: 'inline-block' }}></div>
            </Card>
            <Card style={{ margin: 10 }} title="弧、圆、椭圆">
                弧度(rad): 即弧长与半径的比(弧长/半径) <br />
                半径为1的半圆周长/弧长为: π，此时弧度为: π/1 (rad)
                <br />
                半圆为180°，则1角度等于π/180 = 0.0174...(rad)。由此可得n角度的弧度为: n*π/180 (rad)
                <br />
                则1弧度为 1/π/180 = 57...°
                <div id="arc-box" style={{ display: 'inline-block' }}></div> <br />
                其他：1(rad) = 180/π°= 180/π*60(分) = 180/π*60*60 ≈ 206265(秒)
            </Card>
            <Card style={{ margin: 10 }} title="笑脸">
                <div id="smile-arc-box" style={{ display: 'inline-block' }}></div>
            </Card>
        </>
    )
}
