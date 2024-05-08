import { trigger } from "utils/components"
import { checkSubmitValidityForField } from "./utils"
import { HexMapField, HexMapParams, LAYER_TYPE } from "screens/EditorScreen/types"

export interface EditorParamsMenuState {
    hexMapParams: HexMapParams
    layer: LAYER_TYPE
}

const DEFAULT_STATE: EditorParamsMenuState = {
    hexMapParams: {
        width: 100,
        height: 100,
        hexWidth: 100,
    },
    layer: LAYER_TYPE.image,
}

export const editorParamsMenuStore: EditorParamsMenuState = {...DEFAULT_STATE}

export function resetEditorParamsMenuStore(params: Partial<EditorParamsMenuState> = {}) {
    for (let key in DEFAULT_STATE) {
        const field = key as keyof EditorParamsMenuState
        (editorParamsMenuStore as any)[field] = params[field] !== undefined ? params[field] : DEFAULT_STATE[field]
    }
}

export function getValue(field: HexMapField): number {
    return editorParamsMenuStore.hexMapParams[field]
}

export function setValue(field: HexMapField, value: number) {
    editorParamsMenuStore.hexMapParams[field] = value
}

export function updateFields() {
    for (let key in editorParamsMenuStore) {
        trigger(getEvent(key as HexMapField))
    }
}

export function getErrorValue(field: HexMapField): boolean {
    return !checkSubmitValidityForField(editorParamsMenuStore.hexMapParams[field])
}

export function getEvent(field: HexMapField): string {
    return field + '-number-update'
}
