import './styles.css';

import { KEY_CODE } from 'types';
import { getClasses, isValueNonNegativeNumber, isValueNumber, isValueSmallNumber } from 'utils';

function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value);
}

/**
 * checks if value a number and it's in range
 * @param value number or NaN
 * @returns boolean
 */
function checkValidity(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}

type IProps = {
    isError: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    value: number;
    onChange: (value: number) => void;
    onEnterKeyDown: () => void;
};
export const NumberInput = ({ disabled, autoFocus, isError, value, onEnterKeyDown, onChange }: IProps) => {
    return (
        <input
            disabled={disabled}
            autoFocus={autoFocus}
            value={String(value || '')}
            className={getClasses(['number-input', isError && 'error'])}
            onKeyUp={(e) => e.key === KEY_CODE.enter && onEnterKeyDown()}
            onChange={(e) => {
                const num = convertToInteger(e.target.value);

                if (checkValidity(num)) {
                    onChange(num);
                }
            }}
        />
    );
};
