import { useCallback, useEffect, useMemo } from 'react';

export function useMouseMove(callback: (e: MouseEvent) => void, enabled = true) {
    const container = useMemo(() => ({ moving: false, callback }), []);

    const startMoving = useCallback(() => {
        container.moving = true;
    }, []);

    useEffect(() => {
        if (!enabled) return () => {};

        function moveHandler(e: MouseEvent) {
            if (container.moving) {
                container.callback(e);
            }
        }

        function upHandler(e: MouseEvent) {
            e.stopPropagation();
            container.moving = false;
        }

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);

        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };
    }, []);

    return { startMoving };
}
