import { SvgElement, ISvgParams } from '../models'

export type {ISvgParams}

export function Svg(source: string, params?: ISvgParams) {
    return new SvgElement(source, params)
}
