import { useEffect } from 'react';

export function useWheel(callback: (dx: number, dy: number) => void) {
    useEffect(() => {
        let ticking = false;

        function handleScroll(e: WheelEvent) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    callback(e.deltaX, e.deltaY);
                    ticking = false;
                });
            }

            ticking = true;
        }

        document.addEventListener('wheel', handleScroll);

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);
}
