import { ChangeEvent } from 'react'
// import { saveAs } from 'file-saver'
import css from '../index.module.scss'
import createCanvas from '../hooks/creatCanvas'

export default function Compress() {
    const style = { margin: '10px 0', padding: 10, border: '1px solid gray' }

    // const [syncImageFile, setSyncImageFile] = useState<Blob | null>(null)
    const [syncImageSrc, setSyncImageSrc] = useState<string>('')
    const syncImageRef = useRef<HTMLImageElement | null>(null)
    const imgAfterUpload = () => {
        let imgUrl = ''
        const fileChange = (e: ChangeEvent<HTMLInputElement>): void => {
            if (!e.target.files) return
            const file: File = e.target.files[0]
            // 使用URL创建DOMString
            /*
        每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，
        即使你已经用相同的对象作为参数创建过。不会回收
        当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL() 方法来释放
        */
            imgUrl = URL.createObjectURL(file)
            setSyncImageSrc(imgUrl)

            /*
        // 使用FileReader，会自动回收
        const fr = new FileReader()
        // 此时为声明一个方法绑定到onload属性，当readAsDataURL之后将执行onload
        // e.target?.result是base64编码字符串
        fr.onload = e => setSyncImageSrc(e.target?.result as string)
        fr.readAsDataURL(file)
        */
        }
        const imageLoad = () => {
            if (!syncImageRef.current) return
            URL.revokeObjectURL(imgUrl)
            /**
             *  通过canvas进行图片压缩
             */
            const { dom: canvDom } = createCanvas({ dom: syncImageRef.current })
            // const canvDom = document.createElement('canvas')
            // canvDom.width = syncImageRef.current.width
            // canvDom.height = syncImageRef.current.height

            // const canvDomCtx = canvDom.getContext('2d')
            // // drawImage仅接受图片、video dom或canvas dom，若需要保存div等dom需第三方库html2canvas支持
            // canvDomCtx?.drawImage(syncImageRef.current, 0, 0, syncImageRef.current.width, syncImageRef.current.height)

            canvDom.toBlob(
                blob => {
                    /**
                     * 通过file-saver库另存为图片
                     */
                    // saveAs(blob as Blob, 'after.jpeg')
                    // 后端传输保存
                    console.log(blob)
                },
                'image/jpeg',
                0.6
            )
        }
        return (
            <div style={style}>
                <input type="file" onChange={fileChange} />
                {syncImageSrc && <img ref={syncImageRef} src={syncImageSrc} onLoad={imageLoad} />}
            </div>
        )
    }

    const beforeImageRef = useRef<HTMLImageElement | null>(null)
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
            fr.readAsDataURL(file)
            fr.onload = e => (beforeImageRef.current!.src = e.target?.result as string)
        }
        const ifileLoad = () => {
            console.log(beforeImageRef.current?.width)
        }

        return (
            <div style={style}>
                <input type="file" onChange={ifileChange} />
                <img ref={beforeImageRef} onLoad={ifileLoad} />
            </div>
        )
    }
    return (
        <Card className={css['main-content']} style={{ margin: 10 }} title="压缩">
            <div>upload上传图片，img标签先创建场景，需等待图片加载完成后才能获取img实例的宽高</div>
            {imgBeforeUpload()}
            <div>图片文件获取之后再加载img，等待img onLoad后进行操作</div>
            {imgAfterUpload()}
        </Card>
    )
}
