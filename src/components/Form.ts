import { Content, CustormFieldSetElement } from "types";
import { Div } from "./Div";

function getFormFields<T>(container: HTMLElement) {
    const formElementsIterator = container.querySelectorAll<CustormFieldSetElement<T>>('[name]').values();
    return Array.from(formElementsIterator);
}

interface Params<T> {
    getFormValues: () => T;
    checkSubmitValidity: () => boolean;
}

export function Form<T extends object>(callback: (params: Params<T>) => Content) {
    const content = callback({
        getFormValues: () => {
            const formElementsEntries = getFormFields(container).map((el) => [el.name, el.getValue()]);
            return Object.fromEntries(formElementsEntries);
        },
        checkSubmitValidity: () => {
            let result = true;

            getFormFields(container).forEach((el) => {
                if (!el.checkSubmitValidity()) {
                    el.setSubmitError();
                    result = false;
                } else {
                    el.removeSubmitError();
                }
            });

            return result;
        },
    });
    const container = Div(content);

    return container;
}
