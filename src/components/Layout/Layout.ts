import './Layout.css';
import { Div } from "components/Div";
import { Content } from "types";

export function Layout(content: Content) {
    return Div(content, {id: 'layout'});
}
