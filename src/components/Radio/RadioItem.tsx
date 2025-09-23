import { ChangeEvent, ReactNode } from 'react';

interface IProps<T> {
    name: string;
    label?: string;
    value: T;
    selectedValue: T;
    children?: ReactNode;
    onChange: (value: T) => void;
}
export function RadioItem<T extends number | string>({ name, label, value: currentValue, selectedValue, children, onChange }: IProps<T>) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const convertedValue = typeof currentValue === 'number' ? Number(newValue) : newValue;
        onChange(convertedValue as T);
    };

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
}
