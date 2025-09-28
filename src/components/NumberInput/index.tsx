import './styles.css';

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
};

export const NumberInput = ({ disabled, autoFocus, value, onEnterKeyDown, onChange, isError, setError }: IProps) => {
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
