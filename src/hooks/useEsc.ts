import { useEffect } from 'react';

import { KEY_CODE } from 'types';

export function useEsc(callback: () => void) {
    useEffect(() => {
        function escHandler(e: KeyboardEvent) {
            if (e.key === KEY_CODE.esc) {
                callback();
            }
        }

        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    }, [callback]);
}
