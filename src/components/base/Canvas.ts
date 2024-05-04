import { Attrs } from "types"
import { getBaseComponent } from "utils"

type CanvasComponent = (ctx: CanvasRenderingContext2D) => void

export interface Params extends Omit<Attrs, 'onClick' | 'onMouseDown' | 'onMouseMove' | 'onMouseUp'> {
    width?: number
    height?: number
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
}

export function Canvas(content: CanvasComponent, params?: Params) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    return getBaseComponent(canvas, () => content(ctx), {
        ...params,
        onClick: params?.onClick ? (e) => params.onClick!(ctx, e.offsetX, e.offsetY) : undefined,
        onMouseDown: params?.onMouseDown ? (e) => params.onMouseDown!(ctx, e.offsetX, e.offsetY) : undefined,
        onMouseMove: params?.onMouseMove ? (e) => params.onMouseMove!(ctx, e.offsetX, e.offsetY) : undefined,
        onMouseUp: params?.onMouseUp ? (e) => params.onMouseUp!(ctx, e.offsetX, e.offsetY) : undefined,
    })
}
