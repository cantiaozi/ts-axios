import { isPlainObject, deepMerge } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

function stratDefault(val1: any, val2: any): any {
    return val2 !== undefined ? val2 : val1
}

function stratFromVal2(val1: any, val2: any): any {
    if(val2 !== undefined) {
        return val2
    }
}

function stratDeepMerge(val1: any, val2: any): any {
    if(isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if(val2 !== undefined) {
        return val2
    } else if(isPlainObject(val1)) {
        return deepMerge(val1)
    } else if(val1 !== undefined) {
        return val1
    }
}

const strats = Object.create(null)
const stratKeysFromVal2  = ['url', 'data', 'params']
stratKeysFromVal2.forEach(key => {
    strats[key] = stratFromVal2
})
const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
    strats[key] = stratDeepMerge
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    const result = Object.create(null)
    if(!config2) {
        config2 = {}
    }

    for(let key in config2) {
        mergeField(key)
    }

    for(let key in config1) {
        if(!config2[key]) {
            mergeField(key)
        }
    }

    function mergeField(key: string): void {
        const strat = strats[key] || stratDefault
        result[key] = strat(config1[key], config2![key])
    }
    return result
}