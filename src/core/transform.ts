import { TransformFunction } from '../types'

export default function transfrom(
  data: any,
  headers: any,
  fns?: TransformFunction | TransformFunction[]
): any {
    if(!fns) {
        return data
    }
    if(!Array.isArray(fns)) {
        fns = [fns]
    }
    fns.forEach(fn => {
        data = fn(data, headers)
    })
    return data
}
