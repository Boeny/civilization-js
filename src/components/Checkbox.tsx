type Props = {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
};

export function Checkbox({ label, value, onChange }: Props) {
    return (
        <label>
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            {label}
        </label>
    );
}
