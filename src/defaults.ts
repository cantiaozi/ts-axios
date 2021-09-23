import { transformRequest, transformResponse } from "./helpers/data";
import { processHeader } from "./helpers/headers";
import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    transformRequest: [
        function(data: any, headers: any): any {
            processHeader(headers, data)
            return transformRequest(data)
        }
    ],
    transformResponse: [
        function(data: any): any {
            return transformResponse(data)
        }
    ]
}

const methodWithoutData = ['get', 'delete', 'head', 'options']
methodWithoutData.forEach(method => {
    defaults.headers[method] = {}
})
const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults
