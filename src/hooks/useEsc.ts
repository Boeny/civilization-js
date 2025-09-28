import { useEffect } from 'react';

import { KEY_CODE } from 'types';

const container = { callback: () => {} };

function escHandler(e: KeyboardEvent) {
    if (e.key === KEY_CODE.esc) {
        container.callback();
    }
}

export function useEsc(callback: () => void) {
    container.callback = callback;

    useEffect(() => {
        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    }, []);
}
