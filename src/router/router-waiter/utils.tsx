export function getDataType(data: any): string {
    return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1]
}
