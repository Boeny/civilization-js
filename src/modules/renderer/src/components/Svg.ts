import {Text} from './Text'

export interface ISvgParams {
    width?: number
    color?: string
}
export function Svg(source: string, params?: ISvgParams) {
    if (params?.width) {
        source = source.replace('width=""', `width="${params.width}"`)
    }
    if (params?.color) {
        source = source.replace('fill="none"', `fill="${params.color}"`)
    }

    return Text(source)
}
