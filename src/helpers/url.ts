import {isDate, isPlainObject} from './utils'
function encode(val: string): string {
    return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any):string {
    if(!params) {
        return url
    }
    const parts: string[] = []
    Object.keys(params).forEach(key => {
        let value = params[key]
        if(value === null || value === undefined) {
            return
        }
        if(Array.isArray(value)) {
            key = key + '[]'
        } else {
            value = [value]
        }
        value.forEach((val: any) => {
            if(isDate(val)) {
                val = val.toISOString()
            } else if(isPlainObject(val)) {
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })
    let markIndex = url.indexOf('#')
    if(markIndex > -1){
        url = url.slice(0, markIndex)
    }
    if(parts.length) {
        if(url.indexOf("?") > -1) {
            url += '&' + parts.join('&')
        } else {
            url += '?' + parts.join('&')
        }
    }
    return url
}