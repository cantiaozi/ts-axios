import Axios from "./core/axios"
import { extend } from "./helpers/utils"
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./types"
import defaults from './defaults'
import mergeConfig from "./core/mergeConfig"
import CancelToken from "./cancel/CancelToken"
import Cancel from './cancel/Cancel'
import { isCancel } from "./cancel/Cancel"

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
    const instance = new Axios(config)
    const axios = Axios.prototype.request.bind(instance)
    extend(axios, instance)
    return axios as AxiosStatic
}

const axios = createAxiosInstance(defaults)
axios.create = function (config) {
    return createAxiosInstance(mergeConfig(defaults, config))
}
axios.cancelToken = CancelToken
axios.isCancel = isCancel
axios.cancel = Cancel
export default axios