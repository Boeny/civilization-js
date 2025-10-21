import './styles.css';

import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useMouseMove } from 'hooks/useMouseMove';

function offsetToValue(offset: number, width: number, min: number, max: number): number {
    return (offset / width) * (max - min) + min;
}
function valueToOffset(value: number, width: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * width;
}

interface IProps {
    buttonSize?: number;
    defaultValue?: number; // from 0 to 1
    min?: number;
    max?: number;
    round?: boolean;
    onChange: (value: number) => void;
}
// TODO: stop propagation on mouse up
export const Bar = ({ buttonSize = 16, defaultValue = 0, onChange, min = 0, max = 1, round }: IProps) => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const width = useRef(0);
    const startingPoint = useRef(0);
    const offset = useRef(0);

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!barRef.current) {
            return;
        }
        width.current = barRef.current.clientWidth;
        offset.current = valueToOffset(defaultValue, width.current, min, max);
        setValue(defaultValue);
    }, []);

    const handleOffsetChange = (newOffset: number) => {
        if (offset.current === newOffset) {
            return;
        }
        offset.current = newOffset;

        let newValue = offsetToValue(newOffset, width.current, min, max);
        if (round) {
            newValue = Math.round(newValue);
        }

        setValue(newValue);
        onChange(newValue);
    };

    const { startMoving } = useMouseMove((e) => {
        let newOffset = e.clientX - startingPoint.current;

        if (newOffset < 0) {
            newOffset = 0;
        }
        if (newOffset > width.current) {
            newOffset = width.current;
        }

        handleOffsetChange(newOffset);
    });

    const handleStartMoving = (e: MouseEvent, newOffset: number) => {
        startingPoint.current = e.clientX - newOffset;
        startMoving();
    };

    return (
        <div
            className="bar-container"
            onMouseDown={(e) => {
                e.stopPropagation();
                const newOffset = e.nativeEvent.offsetX;
                handleOffsetChange(newOffset);
                handleStartMoving(e, newOffset);
            }}
        >
            <div
                ref={barRef}
                className="bar"
            />
            <div
                className="bar-button"
                style={{ left: offset.current - buttonSize / 2, width: buttonSize, height: buttonSize }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    handleStartMoving(e, offset.current);
                }}
            >
                {width.current ? <div className="tip">{round ? value : value.toFixed(2)}</div> : null}
            </div>
        </div>
    );
};
