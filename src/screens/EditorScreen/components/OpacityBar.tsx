import { Bar } from 'components/Bar';

interface IProps {
    opacity: number;
    onChange: (opacity: number) => void;
}

export const OpacityBar = ({ opacity, onChange }: IProps) => {
    return (
        <div style={{ padding: '0 8px' }}>
            <Bar
                defaultValue={opacity}
                onChange={onChange}
            />
        </div>
    );
};
