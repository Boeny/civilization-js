import { ScreenParams } from "state/state"
import { SCREEN_TYPE } from "const"
import { Button } from "components/base/Button/Button"
import { MapSizeBlock } from "./MapSizeBlock/MapSizeBlock"
import { Fragment } from "components/base/Fragment"

function checkValidity() {
    return true
}
function getFormValues() {
    return {width: 100, height: 100, hexWidth: 10}
}

function submit(onSubmit: (params: ScreenParams) => void) {
    if (!checkValidity()) {
        return
    }

    onSubmit({...getFormValues(), type: SCREEN_TYPE.editor})
}

interface Params {
    onBackClick: () => void
    onSubmit: (params: ScreenParams) => void
}

export function EditorParamsMenu({onBackClick, onSubmit}: Params) {
    return Fragment([
        Button('Back to main menu', {onClick: onBackClick}),
        MapSizeBlock({autoFocus: true, onEnterKeyDown: () => submit(onSubmit)}),
        Button('Create map', {onClick: () => submit(onSubmit)}),
    ])
}
