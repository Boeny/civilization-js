import { Attrs, CustormFieldSetElement } from "types"
import { KEY_CODE } from "const"
import { getBaseComponent } from "utils"

type CustomInputElement<T = string> = CustormFieldSetElement<T> & HTMLInputElement

export interface Params<T> extends Attrs {
    defaultValue?: string
    checkValidity?: (value: T) => boolean
    checkSubmitValidity?: (value: T) => boolean
    getValue?: (value: string) => T
    setSubmitError?: (el: CustomInputElement<T>) => void
    removeSubmitError?: (el: CustomInputElement<T>) => void
    onEnterKeyDown?: () => void
}

let prevValue: string

export function Input<T = string>(name: string, params?: Params<T>) {
    const element = document.createElement('input') as CustomInputElement<T>

    element.name = name
    element.value = params?.defaultValue || ''

    element.getValue = params?.getValue ? () => params.getValue!(element.value) : () => element.value as T
    element.checkSubmitValidity = params?.checkSubmitValidity ? () => params.checkSubmitValidity!(element.getValue()) : () => true
    element.setSubmitError = params?.setSubmitError ? () => params.setSubmitError!(element) : () => {}
    element.removeSubmitError = params?.removeSubmitError ? () => params.removeSubmitError!(element) : () => {}

    if (params?.checkValidity) {
        element.checkValidity = () => params.checkValidity!(element.getValue())
        element.onkeydown = (e) => {
            if (element.checkValidity()) {
                prevValue = element.value
            }
        }
        element.onkeyup = (e) => {
            if (!element.checkValidity()) {
                element.value = prevValue
                return
            }
            prevValue = element.value

            if (e.key === KEY_CODE.enter) {
                params?.onEnterKeyDown?.()
            }
        }
    }

    return getBaseComponent(element, null, params)
}
