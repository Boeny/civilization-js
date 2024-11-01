import { MouseEvent } from 'react';

import eyeClosed from 'assets/eye-closed.svg';
import eyeOpened from 'assets/eye-opened.svg';
import { Svg } from 'components/Svg';

interface IProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}
export function EyeButton({ isVisible, toggleVisibility }: IProps) {
    const toggleEye = (e: MouseEvent) => {
        e.stopPropagation();
        toggleVisibility();
    };

    const image = isVisible ? eyeOpened : eyeClosed;

    return (
        <div
            className="eye"
            onClick={toggleEye}
        >
            <Svg
                src={image}
                width={20}
            />
        </div>
    );
}
