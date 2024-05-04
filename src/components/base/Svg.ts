import { getStringComponent } from "utils"

export interface Params {
    width?: number
    color?: string
}

export function Svg(source: string, params?: Params) {
    if (params?.width) {
        source = source.replace('width=""', `width="${params.width}"`)
    }
    if (params?.color) {
        source = source.replace('fill="none"', `fill="${params.color}"`)
    }

    return getStringComponent(source)
}
