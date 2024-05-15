import { IInputParams, InputElement } from "../models"

export type {IInputParams}

export function Input(params: IInputParams) {
    return new InputElement(params)
}
