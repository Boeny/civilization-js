import { MENU_TYPE } from "const"
import { Button } from "components/base/Button/Button"
import { Fragment } from "components/base/Fragment"
import { MenuParams } from "state/state"

interface Params {
    onClick: (current: MenuParams['current']) => void
}

export function MainMenu({onClick}: Params) {
    return Fragment([
        Button('New Game', {onClick: () => onClick(MENU_TYPE.newGameParams)}),//, disabled: true
        Button('Editor', {onClick: () => onClick(MENU_TYPE.editorParams)}),
        Button('Options', {onClick: () => onClick(MENU_TYPE.options)}),//, disabled: true
    ])
}
