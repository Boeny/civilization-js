/* eslint-disable import/no-unused-modules */
import arrow from 'assets/arrow-down.svg';

interface IProps {
    onClick: () => void;
}
export function ArrowButton(props: IProps) {
    return (
        <button
            {...props}
            style={{ padding: '4px 10px 0px' }}
        >
            <img
                src={arrow}
                width={20}
            />
        </button>
    );
}
