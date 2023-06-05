import { ChangeEvent } from 'react'
import createCanvas from '../hooks/creatCanvas'

export default function Filter() {
    const style = { margin: '10px 0', padding: 10, border: '1px solid gray' }
    const [syncImageSrc, setSyncImageSrc] = useState<string>('')
    const syncImageRef = useRef<HTMLImageElement | null>(null)
    let imgUrl = ''
    const fileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return
        const file: File = e.target.files[0]
        imgUrl = URL.createObjectURL(file)
        setSyncImageSrc(imgUrl)
    }
    const imageLoad = () => {
        if (!syncImageRef.current) return
        URL.revokeObjectURL(imgUrl)
        const { dom: canvDom, ctx: canvDomCtx } = createCanvas({ dom: syncImageRef.current })
        const imageData = canvDomCtx?.getImageData(0, 0, syncImageRef.current.width, syncImageRef.current.height)
        if (!imageData) return
        // _ 或 _开头 的变量ts中仅代表占位符，无实际意义
        imageData?.data.forEach((_, index) => index % 2 === 0 && (imageData.data[index] = 0))
        canvDomCtx?.clearRect(0, 0, syncImageRef.current!.width, syncImageRef.current!.height)
        canvDomCtx?.putImageData(imageData, 0, 0)
        document.getElementById('main-box')?.appendChild(canvDom)
    }
    return (
        <Card style={{ margin: 10 }} title="滤镜">
            <div id="main-box" style={style}>
                <input type="file" onChange={fileChange} />
                {syncImageSrc && <img ref={syncImageRef} src={syncImageSrc} onLoad={imageLoad} />}
            </div>
        </Card>
    )
}
