import './styles.css';

import { useState } from 'react';

import { useMouseMove } from 'hooks/useMouseMove';

interface IProps {
    width: number;
    buttonSize: number;
    defaultValue?: number;
    onChange: (value: number) => void;
}
// TODO: stop propagation on mouse up
export const Bar = ({ width, buttonSize, defaultValue = 0, onChange }: IProps) => {
    const [offset, setOffset] = useState(defaultValue * width);

    const container = { startingPoint: 0 };

    const { startMoving } = useMouseMove((e) => {
        let newOffset = e.clientX - container.startingPoint;

        if (newOffset < 0) {
            newOffset = 0;
        }
        if (newOffset > width) {
            newOffset = width;
        }

        setOffset(newOffset);
        onChange(newOffset / width);
    });

    return (
        <div className="bar-container">
            <div className="bar" />
            <div
                className="bar-button"
                style={{ left: offset, width: buttonSize, height: buttonSize }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    container.startingPoint = e.clientX - offset;
                    startMoving();
                }}
            />
        </div>
    );
};
