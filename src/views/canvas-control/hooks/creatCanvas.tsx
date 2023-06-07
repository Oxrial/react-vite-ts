/**
 *
 * @param options
 *  dom: img的dom
    w?: 设定canvas宽
    h?: 设定canvas高
    sx?: 从图像的起点坐标x
    sy?: 从图像的起点坐标y
    dw?: 从起点出发宽度
    dh?: 从起点出发高度
    csx?: 在canvas画布上起点坐标x
    csy?: 在canvas画布上起点坐标y
    cdw?: canvas画布上起点出发宽度
    cdh?: canvas画布上起点出发高度
 * @returns
 */
export default function createCanvas(options: {
    domw?: number
    domh?: number
    dom?: HTMLImageElement
    w?: number
    h?: number
    sx?: number
    sy?: number
    dw?: number
    dh?: number
    csx?: number
    csy?: number
    cdw?: number
    cdh?: number
    draw?: boolean
}) {
    const { dom = null, domw = dom?.width, domh = dom?.height } = options
    const width = domw
    const height = domh
    const { w = width, h = height, sx = 0, sy = 0, dw = width, dh = height, csx = 0, csy = 0, cdw = width, cdh = height, draw = true } = options
    const canvDom = document.createElement('canvas')
    canvDom.width = w!
    canvDom.height = h!

    const canvCtx = canvDom.getContext('2d')
    draw && dom && canvCtx?.drawImage(dom, sx, sy, dw!, dh!, csx, csy, cdw!, cdh!)
    return { dom: canvDom, ctx: canvCtx }
}
