import { ChangeEvent } from 'react'
import createCanvas from '../hooks/creatCanvas'

export default function Cuter() {
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
        // img按宽500，height自动计算缩放
        const { dom: canvDom } = createCanvas({
            dom: syncImageRef.current,
            w: 500,
            h: syncImageRef.current.height,
            dw: (300 / syncImageRef.current.width) * syncImageRef.current.naturalWidth,
            dh: (300 / syncImageRef.current.height) * syncImageRef.current.naturalHeight,
            csx: 0,
            csy: 0,
            cdw: 300,
            cdh: 300
        })
        document.getElementById('main-box-cut')?.appendChild(canvDom)
    }
    return (
        <Card style={{ margin: 10 }} title="裁切">
            <div id="main-box-cut" style={style}>
                <input type="file" onChange={fileChange} />
                {syncImageSrc && <img style={{ width: 500 }} ref={syncImageRef} src={syncImageSrc} onLoad={imageLoad} />}
            </div>
        </Card>
    )
}
