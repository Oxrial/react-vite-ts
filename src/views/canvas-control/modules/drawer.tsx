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
        const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: 100, domh: 100 })
        if (!canvCtx) return
        /**
         * arc的startAngle,endAngle接受为弧度值
         * 弧度计算：
         *   半径为1的周长是2π*1，半圆为π,为180角度，【1角度为π/180弧度（0.0174...弧度）】，即n角度的弧度为n*π/180
         *   则1弧度为1/π/180 = 180/π，绘制1弧度也就是57...°默认顺时针绘制
         *   若绘制1弧度输入1即可，可得到角度180/π的角度（57...°）的弧线
         */
        canvCtx.arc(0, 0, 100, 0, 1)
        canvCtx.stroke()
        const box = document.getElementById('arc-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }
    useEffect(() => {
        polylineGradient()
        arc()
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
            <Card style={{ margin: 10 }} title="弧">
                半径为1的半圆周长/弧长为π，【弧度(rad)是弧长/半径】，此时弧度为π/1 <br />
                半圆为180度，则1角度为π/180（0.0174...）弧度
                <br />
                则1弧度为 1/π/180 = 57...°
                <div id="arc-box" style={{ display: 'inline-block' }}></div> <br />
                其他：1弧度 = 180/π度 = 180/π*60分 = 180/π*60*60 ≈ 206265秒
            </Card>
        </>
    )
}
