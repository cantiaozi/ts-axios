import { deepMerge, isPlainObject } from "./utils"
function normalizeHeaderName(header: any, normalizedName: string): any {
    if(!header) {
        return
    }
    Object.keys(header).forEach(key => {
        if(key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
            header[normalizedName] = header[key]
            delete header[key]
        }
    })
}
export function processHeader(header: any, data: any): any {
    normalizeHeaderName(header, 'Content-Type')
    if(isPlainObject(data) && !header['Content-Type']) {
        header['Content-Type'] = 'application/json;charset=utf-8'
    }
    return header
}

export function parseHeader(headers: string): any {
    const parsed = Object.create(null)
    if(!headers) {
        return parsed
    }
    //XMLHttpRequest 对象的 getAllResponseHeaders 方法获取到的值是如下一段字符串
    //每个header属性以\r\n分隔
    headers.split('\r\n').forEach(header => {
        let [key, value] = header.split(':');
        key = key.trim().toLowerCase()
        if(!key) {
            return
        }
        if(value) {
            value = value.trim()
        }
        parsed[key] = value
    })
    return parsed
}

export function flattenHeaders(headers: any, method: string): any{
    if(!headers) {
        return headers
    }
    headers = deepMerge(headers.common, headers[method], headers)
    const methodDelete = ['get', 'post', 'put', 'delete', 'head', 'options', 'patch', 'common']
    methodDelete.forEach(method => {
        delete headers[method]
    })
    return headers
}