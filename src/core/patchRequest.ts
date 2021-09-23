import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types/index'
import {buildUrl} from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeader } from '../helpers/headers'
import xhr from './xhr'
import transform from './transform'
function patchRequest(config: AxiosRequestConfig):AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res)
    })
}
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    // config.headers = flattenHeaders(config.headers, config.method!)
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = flattenHeaders(config.headers, config.method!)
    // config.headers = tranformHeader(config)
    // config.data = transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildUrl(url!, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}
function tranformHeader(config: AxiosRequestConfig): any {
    const {headers = {}, data} = config
    return processHeader(headers, data)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
    // res.data = transformResponse(res.data)
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}
export default patchRequest