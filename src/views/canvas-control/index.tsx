import Compress from './modules/compress'
import ScreenShot from './modules/screenshot'
import Filter from './modules/filter'
import Cuter from './modules/cuter'
export default function CanvasControl() {
    return (
        <>
            <Compress />
            <ScreenShot />
            <Filter />
            <Cuter />
        </>
    )
}
