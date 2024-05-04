import { Content, CustormFieldSetElement } from "types"
import { Div } from "./Div"
import { getBaseComponent } from "utils"

function getFormFields<T>(container: HTMLElement) {
    const formElementsIterator = container.querySelectorAll<CustormFieldSetElement<T>>('[name]').values()
    return Array.from(formElementsIterator)
}

interface Params<T> {
    getFormValues: () => T
    checkSubmitValidity: () => boolean
}

export function Form<T extends object>(callback: (params: Params<T>) => Content) {
    const content = callback({
        getFormValues: <T>() => {
            const formElementsEntries = getFormFields<T>(container.element).map((element) => [element.name, element.getValue()])
            return Object.fromEntries(formElementsEntries)
        },
        checkSubmitValidity: <T>() => {
            let result = true

            getFormFields<T>(container.element).forEach((element) => {
                if (!element.checkSubmitValidity()) {
                    element.setSubmitError()
                    result = false
                } else {
                    element.removeSubmitError()
                }
            })

            return result
        },
    })

    const container = Div()

    return getBaseComponent(container.element, content)
}
