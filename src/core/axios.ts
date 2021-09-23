import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from "../types";
import patchRequest from './patchRequest'
import InterceptorManager from './interceptor'
import mergeConfig from "./mergeConfig";

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}
interface PromiseChain {
    resolve: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
    reject?: RejectedFn
}
export default class Axios {
    defaults: AxiosRequestConfig
    interceptors: Interceptors
    constructor(config: AxiosRequestConfig) {
        this.defaults = config
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }
    request(url: any, config?: AxiosRequestConfig): AxiosPromise {
        if(typeof url === 'string') {
            if(!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        config = mergeConfig(this.defaults, config)
        const promiseChain: Array<PromiseChain> = [
            {
                resolve: patchRequest,
                reject: undefined
            }
        ]
        this.interceptors.request.forEach((interceptor) => {
            promiseChain.unshift(interceptor)
        })
        this.interceptors.response.forEach((interceptor) => {
            promiseChain.push(interceptor)
        })
        let promise = Promise.resolve(config!)
        for(let i = 0; i < promiseChain.length; i++) {
            const { resolve, reject } = promiseChain[i]
            promise = promise.then(resolve, reject)
        }
        return promise as AxiosPromise
    }
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithoutData('get', url, config)
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithoutData('delete', url, config)
    }
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithoutData('head', url, config)
    }
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithoutData('options', url, config)
    }
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData('post', url, data, config)
    }
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData('put', url, data, config)
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData('patch', url, data, config)
    }

    requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        config = {
            ...config,
            url,
            method
        }
        return patchRequest(config)
    }
    requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig) {
        config = {
            ...config,
            url,
            method,
            data
        }
        return patchRequest(config)
    }
} 
