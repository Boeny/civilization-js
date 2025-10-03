import { editorScreenResetStores } from '../config';

const resetFunctions: (() => void)[] = [];

for (const hook of editorScreenResetStores) {
    resetFunctions.push(hook().reset);
}

export function useEditorReset() {
    return () => {
        for (const reset of resetFunctions) {
            reset();
        }
    };
}
