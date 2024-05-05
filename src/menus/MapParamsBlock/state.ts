import { trigger } from "utils"
import { checkSubmitValidity, checkSubmitValidityForField } from "./logic"

export interface State {
    width: number
    height: number
    hexWidth: number
}

const DEFAULT_STATE = {
    width: 100,
    height: 100,
    hexWidth: 100,
}

const STATE: State = {...DEFAULT_STATE}

export function getState(): State {
    return {...STATE}
}

export function setDefaultStateAction(params: Partial<State> = {}) {
    for (let key in STATE) {
        const field = key as keyof State
        STATE[field] = field in params ? params[field]! : DEFAULT_STATE[field]
    }
}

export function getValue(field: keyof State): number {
    return STATE[field]
}

export function setValue(field: keyof State, value: number) {
    STATE[field] = value
}

export function updateFields() {
    for (let key in STATE) {
        trigger(getEvent(key as keyof State))
    }
}

export function getErrorValue(field: keyof State): boolean {
    return !checkSubmitValidityForField(STATE[field])
}

export function getEvent(field: keyof State): string {
    return field + '-number-update'
}
