export default function CanvasControl() {
    const [base64Url, setBase64Url] = useState<any>('')
    const uimageRef = useRef<HTMLImageElement | null>(null)
    const uimageCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const fileChange = (e: any) => {
        const file = e.target.files[0]
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = () => setBase64Url(fr.result)
        const canvasDom = uimageCanvasRef.current
        console.log(canvasDom)
    }
    return (
        <Card style={{ margin: 10 }}>
            <input type="file" onChange={fileChange} />
            <img ref={uimageRef} src={base64Url} />
            <canvas ref={uimageCanvasRef}></canvas>
        </Card>
    )
}
