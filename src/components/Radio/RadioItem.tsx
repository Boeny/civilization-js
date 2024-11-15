import { memo, useCallback } from 'react';

import { Children } from 'components/types';

import { useRadioStore } from './useRadioStore';

interface IProps {
    label?: string;
    value: number | string;
    children?: Children | boolean | null;
}
export const RadioItem = memo(({ label, value: currentValue, children }: IProps) => {
    const [{ name, onChange, value: selectedValue }, setStore] = useRadioStore();

    const handleChange = useCallback(
        (e: any) => {
            const newValue = e.target.value;
            const convertedValue = typeof currentValue === 'number' ? Number(newValue) : newValue;

            setStore({ value: convertedValue });
            onChange(convertedValue);
        },
        [currentValue, onChange, setStore],
    );

    const input = (
        <input
            type="radio"
            name={name}
            value={currentValue}
            checked={currentValue === selectedValue}
            onChange={handleChange}
        />
    );

    return (
        <>
            <div>
                {label ? (
                    <label style={{ cursor: 'pointer' }}>
                        {input}
                        {label}
                    </label>
                ) : (
                    input
                )}
            </div>
            {children}
        </>
    );
});
