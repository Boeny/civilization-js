import { HTMLAttributes } from 'react';
import './styles.css';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    children: any;
}

export function Panel({ id, style, children, ...props }: IProps) {
    return (
        <div
            id={id}
            className="panel"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
