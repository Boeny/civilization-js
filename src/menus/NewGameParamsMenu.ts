import { ScreenParams } from "types"
import { SCREEN_TYPE } from "const"
import { Button } from "components/base/Button/Button"
import { MapParamsBlock, getState, setDefaultStateAction, updateFields } from "./MapParamsBlock/MapParamsBlock"
import { Fragment } from "components/base/Fragment"
import { checkSubmitValidity } from "./MapParamsBlock/logic"

interface Params {
    screenParams?: ScreenParams
    onBackClick: () => void
    onSubmit: (params: ScreenParams) => void
}

export function NewGameParamsMenu({screenParams, onBackClick, onSubmit}: Params) {
    setDefaultStateAction(screenParams)

    const submit = () => {
        const errors = checkSubmitValidity(getState())
        if (errors.length > 0) {
            updateFields()
            return
        }
        onSubmit({...getState(), type: SCREEN_TYPE.game})
    }

    return Fragment([
        Button('Back to main menu', {onClick: onBackClick}),
        MapParamsBlock({onEnterKeyDown: submit}),
        Button('Play', {onClick: submit}),
    ])
}
