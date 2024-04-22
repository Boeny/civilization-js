import './Popup.css';
import { Content } from "types";
import { body, getClasses } from "utils";
import { Div } from "../../components/Div";
import { Layout } from 'components/Layout/Layout';

interface ContentParams {
    closePopup: () => void;
}

interface Params {
    id?: string;
    className?: string;
    reset?: boolean;
}

export function Popup(contentCallback: (contentParams: ContentParams) => Content, params?: Params) {
    const content = contentCallback({closePopup: () => container.remove()});
    const popup = Div(content, {
        ...params,
        className: getClasses(['popup', params?.className])
    });
    const container = Layout(popup);

    body(container, params?.reset);
}
