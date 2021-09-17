import Axios from "./core/axios"
import { extend } from "./helpers/utils"
import { AxiosInstance } from "./types"

function createAxiosInstance(): AxiosInstance {
    const instance = new Axios()
    const axios = Axios.prototype.request.bind(instance)
    extend(axios, instance)
    return axios as AxiosInstance
}

const axios = createAxiosInstance()
export default axios