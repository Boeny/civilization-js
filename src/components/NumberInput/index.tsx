import './styles.css';
import { CSSProperties } from 'react';

import { KEY_CODE } from 'types';
import { getClasses, isValuePositiveNumber } from 'utils';

import { convertToInteger, isValid } from './utils';

type IProps = {
    disabled?: boolean;
    autoFocus?: boolean;
    value: number;
    onChange: (value: number) => void;
    onEnterKeyDown: () => void;
    isError: boolean;
    setError: (isError: boolean) => void;
    className?: string;
    style?: CSSProperties;
};

export const NumberInput = ({ disabled, autoFocus, value, onEnterKeyDown, onChange, isError, setError, style, className }: IProps) => {
    return (
        <input
            style={style}
            disabled={disabled}
            autoFocus={autoFocus}
            value={String(value || '')}
            className={getClasses(['number-input', isError && 'error', className])}
            onKeyUp={(e) => e.key === KEY_CODE.enter && onEnterKeyDown()}
            onChange={(e) => {
                const num = convertToInteger(e.target.value);

                if (!isValid(num)) {
                    return;
                }

                setError(!isValuePositiveNumber(num));
                onChange(num);
            }}
        />
    );
};
