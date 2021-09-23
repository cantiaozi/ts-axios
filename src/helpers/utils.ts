export function isDate(val: any): boolean {
    return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
    return val !== null && typeof val === 'object'
}

//是否是普通对象
export function isPlainObject(val: any): boolean {
    return Object.prototype.toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T&U {
    for(let key in from) {
        (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

export function deepMerge(...args: any[]):any {
    const result = Object.create(null)
    args.forEach(obj => {
        Object.keys(obj).forEach(key => {
            const val = obj[key]
            if(isPlainObject(val)) {
                if(isPlainObject(result[key])) {
                    result[key] = deepMerge(result[key], val)
                } else {
                    result[key] = deepMerge(val)
                }
            } else {
                result[key] = val
            }
        })
    })
    return result
}