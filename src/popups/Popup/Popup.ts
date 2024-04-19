import './Popup.css';
import { Content, body, getClasses } from "utils";
import { Div } from "../../components/Div";

interface ContentParams {
    closePopup: () => void;
}

interface Params {
    id?: string;
    className?: string;
}

export function Popup(contentCallback: (contentParams: ContentParams) => Content, params?: Params) {
    const content = contentCallback({closePopup: () => container.remove()});
    const popup = Div(content, {
        ...params,
        className: getClasses(['popup', params?.className])
    });
    const container = Div(popup, {id: 'layout'});

    body(container);
}
