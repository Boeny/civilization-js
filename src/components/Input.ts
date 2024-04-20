import { CustormFieldSetElement } from "types";

type CustomInputElement<T = string> = CustormFieldSetElement<T> & HTMLInputElement;

export interface Params<T> {
    type?: string;
    defaultValue?: string;
    className?: string;
    checkValidity?: (value: T) => boolean;
    checkSubmitValidity?: (value: T) => boolean;
    getValue?: (value: string) => T;
    setSubmitError?: (el: CustomInputElement<T>) => void;
    removeSubmitError?: (el: CustomInputElement<T>) => void;
}

let prevValue: string;

export function Input<T = string>(name: string, params?: Params<T>): CustomInputElement<T> {
    const el = document.createElement('input') as CustomInputElement<T>;
    el.type = params?.type || 'text';
    el.name = name;
    el.value = params?.defaultValue || '';

    if (params?.className) el.className = params?.className;

    el.getValue = params?.getValue ? () => params.getValue!(el.value) : () => el.value as T;
    el.checkSubmitValidity = params?.checkSubmitValidity ? () => params.checkSubmitValidity!(el.getValue()) : () => true;
    el.setSubmitError = params?.setSubmitError ? () => params.setSubmitError!(el) : () => {};
    el.removeSubmitError = params?.removeSubmitError ? () => params.removeSubmitError!(el) : () => {};

    if (params?.checkValidity) {
        el.checkValidity = () => params.checkValidity!(el.getValue());
        el.onkeydown = () => {
            if (el.checkValidity()) {
                prevValue = el.value;
            }
        }
        el.onkeyup = () => {
            if (!el.checkValidity()) {
                el.value = prevValue;
            }
            prevValue = el.value;
        }
    }

    return el;
}
