import { useEffect } from 'react';

export function useWheel(callback: (e: WheelEvent) => void) {
    useEffect(() => {
        function handleScroll(e: WheelEvent) {
            e.preventDefault();
            requestAnimationFrame(() => callback(e));
        }

        document.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, [callback]);
}
