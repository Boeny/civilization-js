import { MAIN_MENU_OPTION } from "menus/const"
import { MenuOption } from "menus/types"
import { SCREEN_TYPE } from "types"

export interface State {
    screen: SCREEN_TYPE | null
    menu: MenuOption
}

const DEFAULT_STATE: State = {
    screen: null,
    menu: MAIN_MENU_OPTION,
}

export const globalStore: State = {...DEFAULT_STATE}

export function resetGlobalStore(params: Partial<State> = {}) {
    for (let key in DEFAULT_STATE) {
        const field = key as keyof State
        (globalStore as any)[field] = params[field] !== undefined ? params[field] : DEFAULT_STATE[field]
    }
}
