import { Children } from 'components/types';

import { IStore, useRadioStore } from './useRadioStore';

interface IProps<T> extends IStore<T> {
    children: Children;
    label?: string;
}
export function Radio<T extends string | number>({ children, label, ...props }: IProps<T>) {
    useRadioStore(props);

    return (
        <div>
            {label && <label>{label}</label>}
            {children}
        </div>
    );
}
