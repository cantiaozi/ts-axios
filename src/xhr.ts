import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import {parseHeader} from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const xmlHttpReq = new XMLHttpRequest()
    if(responseType) {
        xmlHttpReq.responseType = responseType
    }
    xmlHttpReq.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
      if (!data && name.toUpperCase() === 'CONTENT-TYPE') {
        delete headers[name]
      } else {
        xmlHttpReq.setRequestHeader(name, headers[name])
      }
    })
    xmlHttpReq.onreadystatechange = function stateChange() {
        if(xmlHttpReq.readyState !== 4){
            return
        }
        const responseData = xmlHttpReq.responseType === 'text' ? xmlHttpReq.responseText : xmlHttpReq.response 
        const {status, statusText} = xmlHttpReq
        const responseHeaders = parseHeader(xmlHttpReq.getAllResponseHeaders())
        const response : AxiosResponse = {
            data: responseData,
            status,
            statusText,
            headers: responseHeaders,
            config,
            request: xmlHttpReq
        }
        resolve(response)
    }
    xmlHttpReq.send(data)
  })
}
