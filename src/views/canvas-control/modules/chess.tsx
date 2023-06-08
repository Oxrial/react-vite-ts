import createCanvas from '../hooks/creatCanvas'
import css from './chess.module.scss'

const step = 40
const size = 800
const { dom: canvDom, ctx: canvCtx } = createCanvas({ draw: false, domw: size, domh: size })
export default function Chess() {
    const drawBoard = () => {
        const arrs: Array<Array<any>> = []
        for (let i = step; i < size; i += step) {
            arrs.push([])
            canvCtx.beginPath()
            canvCtx.moveTo(i, step)
            canvCtx.lineTo(i, size - step)
            canvCtx.stroke()

            canvCtx.beginPath()
            canvCtx.moveTo(step, i)
            canvCtx.lineTo(size - step, i)
            canvCtx.stroke()
        }
        let isWhite = true
        canvDom.addEventListener('click', (e: MouseEvent) => {
            const { offsetX, offsetY } = e
            if (!(offsetX > step / 2 && offsetX < size - step / 2 && offsetY > step / 2 && offsetY < size - step / 2)) return
            const px = Math.floor((offsetX + step / 2) / step)
            const py = Math.floor((offsetY + step / 2) / step)
            if (arrs[px - 1][py - 1]) return
            const x = px * step
            const y = py * step
            arrs[px - 1][py - 1] = isWhite ? 1 : -1
            canvCtx.beginPath()
            canvCtx.arc(x, y, 15, 0, 2 * Math.PI)
            const sx = isWhite ? x - 7 : x + 7
            const sy = isWhite ? y - 7 : y + 7
            const g = canvCtx.createRadialGradient(sx, sy, 0, sx, sy, 20)
            g.addColorStop(0, isWhite ? 'white' : 'gray')
            g.addColorStop(1, isWhite ? 'black' : 'white')
            canvCtx.fillStyle = g
            canvCtx.fill()
            canvCtx.stroke()
            isWhite = !isWhite
        })
    }
    useEffect(() => {
        drawBoard()
        const box = document.getElementById('chess-box')
        if (!box) return
        box.innerHTML = ''
        box.appendChild(canvDom)
    }, [])

    return (
        <Card style={{ margin: 10 }} title="棋">
            <div id="chess-box" className={css['chess-main']}></div>
        </Card>
    )
}
