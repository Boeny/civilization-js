import { useEffect, useMemo } from 'react';

export function useMouseMove(callback: (e: MouseEvent) => void, enabled = true) {
    const container = useMemo(() => ({ moving: false, callback }), []);

    const startMoving = () => {
        container.moving = true;
        container.callback = callback;
    };

    useEffect(() => {
        if (!enabled) {
            return () => {};
        }

        function moveHandler(e: MouseEvent) {
            if (container.moving) {
                requestAnimationFrame(() => container.callback(e));
            }
        }

        function upHandler(e: MouseEvent) {
            e.stopPropagation();
            container.moving = false;
        }

        document.addEventListener('touchmove', moveHandler as any);
        document.addEventListener('touchend', upHandler as any);

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);

        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);

            document.removeEventListener('touchmove', moveHandler as any);
            document.removeEventListener('touchend', upHandler as any);
        };
    }, [enabled]);

    return { startMoving };
}
