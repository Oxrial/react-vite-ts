import { ChangeEvent } from 'react'
// import { saveAs } from 'file-saver'
import css from './index.module.scss'

export default function CanvasControl() {
    const style = { margin: '10px 0', padding: 10, border: '1px solid gray' }
    const beforeImageRef = useRef<HTMLImageElement | null>(null)

    const [syncImageFile, setSyncImageFile] = useState<Blob | null>(null)
    const syncImageRef = useRef<HTMLImageElement | null>(null)

    const fileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return
        setSyncImageFile(e.target.files[0])
        console.log(e.target.files[0])
    }
    const imageLoad = () => {
        if (!syncImageRef.current) return
        const canvDom = document.createElement('canvas')
        canvDom.width = syncImageRef.current.width
        canvDom.height = syncImageRef.current.height

        const canvDomCtx = canvDom.getContext('2d')
        canvDomCtx?.drawImage(syncImageRef.current, 0, 0, syncImageRef.current.width, syncImageRef.current.height)

        canvDom.toBlob(
            blob => {
                // saveAs(blob as Blob, 'after.jpeg')
                // 后端传输保存
                console.log(blob)
            },
            'image/jpeg',
            0.6
        )
    }
    /**
     * upload上传图片，img标签先创建场景，需等待图片加载完成后才能获取img实例的宽高
     * @returns
     */
    const imgBeforeUpload = () => {
        const ifileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return
            if (!beforeImageRef.current) return
            const file: File = e.target.files[0]
            const fr = new FileReader()
            fr.onload = e => (beforeImageRef.current!.src = e.target?.result as string)
            fr.readAsDataURL(file)
        }
        const ifileLoad = () => {
            console.log(beforeImageRef.current?.width)
        }

        return (
            <div style={style}>
                <div>upload上传图片，img标签先创建场景，需等待图片加载完成后才能获取img实例的宽高</div>
                <input type="file" onChange={ifileChange} />
                <img ref={beforeImageRef} onLoad={ifileLoad} />
            </div>
        )
    }
    return (
        <Card className={css['main-content']} style={{ margin: 10 }}>
            {imgBeforeUpload()}

            <div style={style}>
                <input type="file" onChange={fileChange} />
                {syncImageFile && <img ref={syncImageRef} src={URL.createObjectURL(syncImageFile)} onLoad={imageLoad} />}
            </div>
        </Card>
    )
}
