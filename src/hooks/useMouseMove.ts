import { useEffect, useRef } from 'react';

export function useMouseMove(callback: (e: MouseEvent) => void, enabled = true) {
    const movingRef = useRef(false);
    const callbackRef = useRef(callback);

    const startMoving = () => {
        movingRef.current = true;
        callbackRef.current = callback;
    };

    useEffect(() => {
        if (!enabled) {
            return () => {};
        }

        function moveHandler(e: MouseEvent | TouchEvent) {
            if (movingRef.current) {
                requestAnimationFrame(() => callbackRef.current(e as MouseEvent));
            }
        }

        function upHandler(e: MouseEvent | TouchEvent) {
            e.stopPropagation();
            movingRef.current = false;
        }

        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', upHandler);

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);

        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);

            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', upHandler);
        };
    }, [enabled]);

    return { startMoving };
}
