import { useCallback, useEffect, useMemo } from 'react';

export function useMouseMove(callback: (e: MouseEvent) => void, enabled = true) {
    const config = useMemo(() => ({ moving: false, callback }), []);

    const startMoving = useCallback(() => {
        config.moving = true;
    }, []);

    useEffect(() => {
        if (!enabled) return () => {};

        function moveHandler(e: MouseEvent) {
            if (config.moving) {
                config.callback(e);
            }
        }

        function upHandler(e: MouseEvent) {
            e.stopPropagation();
            config.moving = false;
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
