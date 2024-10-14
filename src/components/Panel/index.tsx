/* eslint-disable import/no-unused-modules */
import { CSSProperties } from 'react';
import './styles.css';

interface IProps {
    id?: string;
    style?: CSSProperties;
    children: any;
}
export function Panel({ id, style, children }: IProps) {
    return (
        <div
            id={id}
            className="panel"
            style={style}
        >
            {children}
        </div>
    );
}
