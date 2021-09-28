import { Canceler, CancelExector, CancelTokenSource } from "../types"
import Cancel from './Cancel'

interface PromiseResolve {
    (reason?: Cancel): void
}
export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel

    constructor(exector: CancelExector) {
        let promiseResolve: PromiseResolve
        //这里的Promise泛型类型不能是string ？
        this.promise = new Promise<any>(resolve => {
            promiseResolve = resolve
        })
        exector(reason => {
            if(this.reason) {
                return
            }
            this.reason = new Cancel(reason)
            promiseResolve(this.reason)
        })
    }

    throwIfRequested(): any {
        if(this.reason) {
            return this.reason
        }
    }

    static source(): CancelTokenSource {
        let cancel!: Canceler
        let token: CancelToken = new CancelToken(c => {
            cancel = c
        })
        return {
            cancel,
            token
        }
    }
}