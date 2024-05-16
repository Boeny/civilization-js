import { trigger } from "modules/observer"
import { HexMapField, IHexMapParams, LAYER_TYPE } from "screens/EditorScreen/types"
import { checkSubmitValidityForField } from "./utils"

export interface IEditorParamsMenuState {
    hexMapParams: IHexMapParams
    layer: LAYER_TYPE
}

const DEFAULT_STATE: IEditorParamsMenuState = {
    hexMapParams: {
        width: 100,
        height: 100,
        hexWidth: 100,
    },
    layer: LAYER_TYPE.image,
}

export const editorParamsMenuStore: IEditorParamsMenuState = {...DEFAULT_STATE}

export function resetEditorParamsMenuStore(params: Partial<IEditorParamsMenuState> = {}) {
    for (let key in DEFAULT_STATE) {
        const field = key as keyof IEditorParamsMenuState
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
