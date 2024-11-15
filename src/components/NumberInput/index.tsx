import { useState } from 'react';
import './styles.css';

import { KEY_CODE } from 'types';
import { getClasses, isValueNonNegativeNumber, isValueNumber, isValuePositiveNumber, isValueSmallNumber } from 'utils';

function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value);
}

/**
 * checks if value is a number and it's in range
 * @param value number or NaN
 * @returns boolean
 */
function isValid(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}

type IProps = {
    disabled?: boolean;
    autoFocus?: boolean;
    value: number;
    onChange: (value: number) => void;
    onEnterKeyDown: () => void;
};
export const NumberInput = ({ disabled, autoFocus, value, onEnterKeyDown, onChange }: IProps) => {
    const [isError, setError] = useState(() => !isValuePositiveNumber(value));

    return (
        <input
            disabled={disabled}
            autoFocus={autoFocus}
            value={String(value || '')}
            className={getClasses(['number-input', isError && 'error'])}
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
