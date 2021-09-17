import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import {parseHeader} from '../helpers/headers'
import {createError} from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const xmlHttpReq = new XMLHttpRequest()
    if(responseType) {
        xmlHttpReq.responseType = responseType
    }
    if(timeout) {
      xmlHttpReq.timeout = timeout
    }
    xmlHttpReq.ontimeout = function() {
      reject(createError('timeout', config, 'ECONNABORTED', xmlHttpReq))
    }
    xmlHttpReq.open(method.toUpperCase(), url!, true)
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
        if(xmlHttpReq.status === 0) {
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
        handleResponse(response)
    }
    xmlHttpReq.onerror = function() {
      reject(createError("network error", config, null, xmlHttpReq))
    }
    xmlHttpReq.send(data)

    function handleResponse(response: AxiosResponse) {
      const {status} = response
      if(status >= 200 && status < 300) {
        resolve(response)
      } else {
        reject(createError(`error with status code ${response.status}`, config, null, xmlHttpReq, response))
      }
    }
  })
}
