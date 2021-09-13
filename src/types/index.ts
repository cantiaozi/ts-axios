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
}
