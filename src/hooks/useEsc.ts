import { useEffect, useMemo } from 'react';

import { KEY_CODE } from 'types';

export function useEsc(callback: () => void) {
    const callbackContainerForMount = useMemo(() => ({ callback }), []);

    useEffect(() => {
        function escHandler(e: KeyboardEvent) {
            if (e.key === KEY_CODE.esc) {
                callbackContainerForMount.callback();
            }
        }

        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    }, []);
}
