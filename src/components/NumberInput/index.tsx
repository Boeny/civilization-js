import './styles.css';

import { KEY_CODE } from 'types';
import { getClasses } from 'utils';

import { checkValidity, convertToInteger } from '../../menus/EditorParamsMenu/utils';

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
