import './styles.css';

import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useMouseMove } from 'hooks/useMouseMove';

interface IProps {
    buttonSize?: number;
    defaultValue?: number; // from 0 to 1
    onChange: (value: number) => void;
}
// TODO: stop propagation on mouse up
export const Bar = ({ buttonSize = 16, defaultValue = 0, onChange }: IProps) => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const widthRef = useRef(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!barRef.current) {
            return;
        }
        widthRef.current = barRef.current.clientWidth;
        setOffset(defaultValue * widthRef.current);
    }, [barRef.current]);

    const container = { startingPoint: 0 };

    const handleOffsetChange = (newOffset: number) => {
        setOffset(newOffset);
        onChange(newOffset / widthRef.current);
    };

    const { startMoving } = useMouseMove((e) => {
        let newOffset = e.clientX - container.startingPoint;

        if (newOffset < 0) {
            newOffset = 0;
        }
        if (newOffset > widthRef.current) {
            newOffset = widthRef.current;
        }

        handleOffsetChange(newOffset);
    });

    const handleStartMoving = (e: MouseEvent, newOffset: number) => {
        container.startingPoint = e.clientX - newOffset;
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
                style={{ left: offset - buttonSize / 2, width: buttonSize, height: buttonSize }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    handleStartMoving(e, offset);
                }}
            />
        </div>
    );
};
