import { Bar } from 'components/Bar';

interface IProps {
    opacity: number;
    onChange: (opacity: number) => void;
}

export const OpacityBar = ({ opacity, onChange }: IProps) => {
    return (
        <Bar
            width={162}
            buttonSize={16}
            defaultValue={opacity}
            onChange={onChange}
        />
    );
};
