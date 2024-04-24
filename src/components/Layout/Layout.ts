import './Layout.css';
import { Div, Params as DivParams } from "components/Div";
import { Content } from "types";

export function Layout(content: Content, params?: DivParams) {
    return Div(content, {...params, id: 'layout'});
}
