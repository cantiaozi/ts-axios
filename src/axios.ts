import Axios from "./core/axios"
import { extend } from "./helpers/utils"
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./types"
import defaults from './defaults'
import mergeConfig from "./core/mergeConfig"

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
export default axios