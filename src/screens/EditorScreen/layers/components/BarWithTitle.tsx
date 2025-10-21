import { Bar } from 'components/Bar';

interface IProps {
    title: string;
    defaultValue: number;
    min?: number;
    max?: number;
    round?: boolean;
    onChange: (v: number) => void;
}

export const BarWithTitle = ({ title, onChange, ...props }: IProps) => {
    return (
        <div style={{ padding: '0 8px', position: 'relative', marginTop: 6 }}>
            <div style={{ fontSize: 12, position: 'absolute', top: -6 }}>{title}</div>
            <Bar
                {...props}
                onChange={onChange}
            />
        </div>
    );
};
