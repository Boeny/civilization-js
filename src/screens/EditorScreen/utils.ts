import { editorScreenConfigs } from './config';

const resetFunctions = editorScreenConfigs.map((config) => config.reset);

export function resetEditorPage() {
    resetFunctions.forEach((reset) => reset());
}
