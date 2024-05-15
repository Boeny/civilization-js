import { ICanvasParams, CanvasElement } from "../models"

export type {ICanvasParams}

export function Canvas(content: CanvasElement['content'], params?: ICanvasParams) {
    return new CanvasElement(content, params)
}
