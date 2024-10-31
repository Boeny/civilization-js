import { useEffect } from 'react';

import { KEY_CODE } from 'types';

const callbackContainerForMount = {} as any;

export function useEsc(callback: () => void) {
    callbackContainerForMount.openParentMenu = callback;

    useEffect(() => {
        function escHandler(e: KeyboardEvent) {
            if (e.key === KEY_CODE.esc) {
                callbackContainerForMount.openParentMenu();
            }
        }

        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        };
    }, []);
}
