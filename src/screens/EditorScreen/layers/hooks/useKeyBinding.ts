import { useCallback } from 'react';

export function useKeyBinding(bindings: string[], isSelected: boolean, callback: () => void) {
    return useCallback(
        (key: string) => {
            if (isSelected && bindings.includes(key)) {
                callback();
            }
        },
        [bindings, isSelected, callback],
    );
}
