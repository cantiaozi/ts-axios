export type Method =
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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
  transformRequest?: TransformFunction | TransformFunction[],
  transformResponse?: TransformFunction | TransformFunction[],

  [propName: string]: any
}

export interface AxiosResponse<T=any> {
  data: T,
  status: number,
  statusText: string,
  config: AxiosRequestConfig,
  headers: any,
  request: any,
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T=any>(config: AxiosRequestConfig) : AxiosPromise<T>
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T=any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T=any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T=any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number
  eject(x: number): void
}

export interface ResolvedFn<T=any> {
  (x: T): T | Promise<T>
}
export interface RejectedFn {
  (x: any): any
}

export interface TransformFunction {
  (data: any, headers: any): any
}