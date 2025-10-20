import { useEffect } from 'react';

export function useKey(callback: (key: string) => void) {
    useEffect(() => {
        function escHandler(e: KeyboardEvent) {
            callback(e.key);
        }

        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    }, [callback]);
}
