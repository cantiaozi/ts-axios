import { AxiosRequestConfig } from "./types/index";

export default function xhr(config: AxiosRequestConfig) {
    const {url, method = 'get', data = null} = config
    const xmlHttpReq = new XMLHttpRequest()
    xmlHttpReq.open(method.toUpperCase(), url, true)
    xmlHttpReq.send()
}