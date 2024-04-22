import './Block.css';
import { Content } from "types";
import { getClasses } from "utils";
import { Div } from "../Div";

interface Params {
    id?: string;
    className?: string;
    bordered?: boolean;
    alignedVertically?: boolean;
}

export function Block(content?: Content, params?: Params) {
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
