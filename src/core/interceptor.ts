import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> {
  resolve: ResolvedFn<T>
  reject?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number {
    this.interceptors.push({
      resolve,
      reject
    })
    return this.interceptors.length - 1
  }
  eject(val: number): void {
    this.interceptors[val] = null
  }
  forEach(fn: (val: Interceptor<T>) => any) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
