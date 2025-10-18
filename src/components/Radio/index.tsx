import { ReactNode } from 'react';

interface IProps<T> {
    name: string;
    value: T;
    children: (props: { name: string; selectedValue: T; onChange: (value: T) => void }) => ReactNode;
    label?: string;
    onChange: (value: T) => void;
}

export function Radio<T extends string | number>({ name, value, children, label, onChange }: IProps<T>) {
    return (
        <div>
            {label && <label>{label}</label>}
            {children({ name, selectedValue: value, onChange })}
        </div>
    );
}
