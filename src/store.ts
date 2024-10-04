import { IMenuOption } from "menus/types"
import { SCREEN_TYPE } from "types"
import { MAIN_MENU_OPTION } from "menus/const"

export interface IState {
    screen: SCREEN_TYPE | null
    menu: IMenuOption
}

const DEFAULT_STATE: IState = {
    screen: null,
    menu: MAIN_MENU_OPTION,
}

export const globalStore: IState = {...DEFAULT_STATE}

export function resetGlobalStore(params: Partial<IState> = {}) {
    for (let key in DEFAULT_STATE) {
        const field = key as keyof IState
        (globalStore as any)[field] = params[field] !== undefined ? params[field] : DEFAULT_STATE[field]
    }
}
