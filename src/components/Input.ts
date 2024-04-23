import { KEY_CODE } from "const";
import { CustormFieldSetElement } from "types";

type CustomInputElement<T = string> = CustormFieldSetElement<T> & HTMLInputElement;

export interface Params<T> {
    autoFocus?: boolean;
    type?: string;
    defaultValue?: string;
    className?: string;
    checkValidity?: (value: T) => boolean;
    checkSubmitValidity?: (value: T) => boolean;
    getValue?: (value: string) => T;
    setSubmitError?: (el: CustomInputElement<T>) => void;
    removeSubmitError?: (el: CustomInputElement<T>) => void;
    onEnterKeyDown?: () => void;
}

let prevValue: string;

export function Input<T = string>(name: string, params?: Params<T>): CustomInputElement<T> {
    const el = document.createElement('input') as CustomInputElement<T>;
    el.type = params?.type || 'text';
    el.name = name;
    el.value = params?.defaultValue || '';

    if (params?.className) el.className = params.className;
    if (params?.autoFocus) el.autofocus = params.autoFocus;

    el.getValue = params?.getValue ? () => params.getValue!(el.value) : () => el.value as T;
    el.checkSubmitValidity = params?.checkSubmitValidity ? () => params.checkSubmitValidity!(el.getValue()) : () => true;
    el.setSubmitError = params?.setSubmitError ? () => params.setSubmitError!(el) : () => {};
    el.removeSubmitError = params?.removeSubmitError ? () => params.removeSubmitError!(el) : () => {};

    if (params?.checkValidity) {
        el.checkValidity = () => params.checkValidity!(el.getValue());
        el.onkeydown = (e) => {
            if (el.checkValidity()) {
                prevValue = el.value;
            }
        }
        el.onkeyup = (e) => {
            if (!el.checkValidity()) {
                el.value = prevValue;
                return;
            }
            prevValue = el.value;

            if (e.key === KEY_CODE.enter) {
                params?.onEnterKeyDown?.();
            }
        }
    }

    return el;
}
