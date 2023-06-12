import { throttle } from 'lodash-es'
import createCanvas from '../hooks/creatCanvas'
import css from './chess.module.scss'

export default function Chess() {
    const step = 40
    const size = 800
    const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: size, domh: size })
    const arrs: Array<Array<any>> = []
    const length = (size - 2 * step) / step
    const moveTemp: string[] = []
    let isWhite = true
    const history: ImageData[] = []
    let historyIndex = -1
    const [nextBtn, setNextBtn] = useState<boolean>(false)

    const save = () => {
        historyIndex++
        history[historyIndex] = canvCtx.getImageData(0, 0, size, size)
    }
    const go = (backNum = -1) => {
        if (historyIndex > 0) {
            historyIndex += backNum
            canvCtx.putImageData(history[historyIndex], 0, 0)
        }
    }
    const surroundCount = (a: number, b: number, up: number, down: number) => {
        let count = arrs[a][b]
        // 向上 若i为0即为本身
        for (let i = 1; i < 5; i++) {
            const x = a - up * i
            const y = b - down * i
            if (x >= 0 && x <= length && y >= 0 && y <= length && arrs[x][y] && arrs[x][y] === arrs[a][b]) {
                count += arrs[x][y]
                continue
            }
            break
        }
        // 向下
        for (let i = 1; i < 5; i++) {
            const x = a + up * i
            const y = b + down * i
            if (x >= 0 && x <= length && y >= 0 && y <= length && arrs[x][y] && arrs[x][y] === arrs[a][b]) {
                count += arrs[x][y]
                continue
            }
            break
        }
        // 绝对值
        return Math.abs(count) >= 5
    }
    const sum = (a: number, b: number) => {
        // 横(x加，y不变)
        if (surroundCount(a, b, 1, 0)) return true
        // 纵(x不变，y加)
        if (surroundCount(a, b, 0, 1)) return true
        // 提(x加，y减)
        if (surroundCount(a, b, 1, -1)) return true
        // 捺(x加，y加)
        if (surroundCount(a, b, 1, 1)) return true
        return false
    }
    const checkArea = (offsetX: number, offsetY: number) => {
        const inArea = offsetX > step / 2 && offsetX < size - step / 2 && offsetY > step / 2 && offsetY < size - step / 2
        /**
         * 棋盘1个step为1格，从1开始，位于第几个step，
         * 落棋点换算实际格位：80/40=2，120/40=3，
         * 因为math floor取最小整数返回，
         * 则鼠标119/40=2.9...，则始终是在2上。
         * 实际情况四舍五入计算，80取2，119取3
         * 提前加半个step（20/40=0.5）取最小接近的整数，保证鼠标在step中就近选择落棋点
         */
        const px = Math.floor((offsetX + step / 2) / step)
        const py = Math.floor((offsetY + step / 2) / step)
        return { inArea, px, py }
    }
    const clickHandle = (e: MouseEvent) => {
        // 移除
        go(0)
        moveTemp.splice(0, moveTemp.length)

        const { offsetX, offsetY } = e
        const { inArea, px, py } = checkArea(offsetX, offsetY)
        if (!inArea) return
        // 在数组中从0下标
        if (arrs[px - 1][py - 1]) return
        const x = px * step
        const y = py * step

        arrs[px - 1][py - 1] = isWhite ? 1 : -1

        canvCtx.save()
        canvCtx.beginPath()
        canvCtx.arc(x, y, 15, 0, 2 * Math.PI)
        // 光照从左上右下，白色绘制右下有阴影，黑色绘制左上有光泽
        const sx = isWhite ? x + 7 : x - 7
        const sy = isWhite ? y + 7 : y - 7
        canvCtx.shadowColor = '#373737'
        canvCtx.shadowOffsetX = 5
        canvCtx.shadowOffsetY = 5
        canvCtx.shadowBlur = 7
        const gradient = canvCtx.createRadialGradient(sx, sy, 0, sx, sy, 15)
        /**
         * 径向由0向1渐变扩散，以中心颜色为起点光源渐变至另一色，则
         * 白色为从右下灰色扩散白光，
         * 黑色为从左上灰色扩散黑光
         */
        gradient.addColorStop(0, isWhite ? 'gray' : 'gray')
        gradient.addColorStop(1, isWhite ? 'white' : 'black')
        canvCtx.fillStyle = gradient
        canvCtx.fill()
        canvCtx.strokeStyle = 'transparent'
        canvCtx.stroke()
        canvCtx.closePath()
        isWhite = !isWhite
        if (sum(px - 1, py - 1)) {
            canvDom.removeEventListener('click', clickHandle)
            Modal.success({
                content: '对局结束' + (isWhite ? '白' : '黑') + '子胜'
            })
        }
        canvCtx.restore()
        save()
    }
    const moveHandle = (e: MouseEvent) => {
        const { offsetX, offsetY } = e
        const { inArea, px, py } = checkArea(offsetX, offsetY)
        if (!inArea) return
        // 已绘制
        if (arrs[px - 1][py - 1]) return

        const x = px * step
        const y = py * step
        if (moveTemp.includes(x + '-' + y)) return
        // 移除
        if (moveTemp.length > 0) {
            go(0)
            moveTemp.splice(0, moveTemp.length)
        }
        canvCtx.setLineDash([10, 4])
        canvCtx.strokeStyle = 'gary'
        canvCtx.save()
        canvCtx.beginPath()
        canvCtx.arc(x, y, 15, 0, 2 * Math.PI)
        canvCtx.stroke()
        canvCtx.closePath()
        canvCtx.restore()
        moveTemp.push(x + '-' + y)
    }
    const drawBoard = () => {
        canvDom.id = 'chess-canvas'
        arrs.splice(0, arrs.length)
        // 边界为1个step
        for (let i = step; i < size; i += step) {
            arrs.push([])
            canvCtx.beginPath()
            canvCtx.moveTo(i, step)
            canvCtx.lineTo(i, size - step)
            canvCtx.stroke()
            canvCtx.closePath()

            canvCtx.beginPath()
            canvCtx.moveTo(step, i)
            canvCtx.lineTo(size - step, i)
            canvCtx.stroke()
            canvCtx.closePath()
        }
        save()
        canvCtx.save()
        canvDom.addEventListener('click', clickHandle)
        canvDom.addEventListener('mousemove', throttle(moveHandle, 200))

        const box = document.getElementById('chess-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }
    useEffect(() => {
        drawBoard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Card style={{ margin: 10 }} title="棋">
            {historyIndex}
            <Button onClick={() => go()}>上一步</Button>
            <Button disabled={nextBtn} onClick={() => go(1)}>
                下一步
            </Button>
            <div id="chess-box" className={css['chess-main']}></div>
        </Card>
    )
}
