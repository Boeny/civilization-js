import './Block.css';
import { Content, getClasses } from "utils";
import { Div } from "../Div";

interface Params {
    id?: string;
    className?: string;
    bordered?: boolean;
    alignedVertically?: boolean;
}

export function Block(content?: Content, params?: Params): HTMLElement {
    const {bordered, alignedVertically, className, ...rest} = params || {};

    return Div(
        content,
        {
            ...rest,
            className: getClasses([
                'block',
                bordered && 'bordered',
                alignedVertically && 'flex-column',
                className
            ])
        }
    );
}
