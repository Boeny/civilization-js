import arrow from 'assets/arrow-down.svg';

import { Svg } from './Svg';

// TODO: figure out how to import svg as a react component
interface IProps {
    onClick: () => void;
}
export function ArrowButton(props: IProps) {
    return (
        <button
            {...props}
            style={{ padding: '4px 10px 0px' }}
        >
            {/* <Arrow /> */}
            {/* <img
                src={arrow}
                width={20}
            /> */}
            <Svg
                width={20}
                src={arrow}
            />
        </button>
    );
}
