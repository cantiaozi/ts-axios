type method =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'head'
  | 'options'
  | 'patch'
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: method
  data?: any
  params?: any
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  config: AxiosRequestConfig,
  headers: any,
  request: any,
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}