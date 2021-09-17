import { AxiosPromise, AxiosRequestConfig, Method } from "../types";
import patchRequest from './patchRequest'

export default class Axios {
    request(url: any, config?: AxiosRequestConfig): AxiosPromise {
        if(typeof url === 'string') {
            if(!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        return patchRequest(config!)
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
