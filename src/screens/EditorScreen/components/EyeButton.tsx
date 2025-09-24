import { MouseEvent } from 'react';

import eyeClosed from 'assets/eye-closed.svg';
import eyeOpened from 'assets/eye-opened.svg';
import { Svg } from 'components/Svg';

interface IProps {
    isVisible: boolean;
    toggleVisible: () => void;
}

export const EyeButton = ({ isVisible, toggleVisible }: IProps) => {
    const toggleEye = (e: MouseEvent) => {
        e.stopPropagation();
        toggleVisible();
    };

    return (
        <div
            className="eye"
            onClick={toggleEye}
        >
            <Svg
                src={isVisible ? eyeOpened : eyeClosed}
                width={20}
            />
        </div>
    );
};
