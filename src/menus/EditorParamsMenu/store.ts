import { IHexMapParams, LAYER_TYPE } from 'screens/EditorScreen/types';

export interface IEditorParamsMenuState extends IHexMapParams {
    layer: LAYER_TYPE;
}

export const DEFAULT_EDITOR_PARAMS: IEditorParamsMenuState = {
    width: 100,
    height: 100,
    hexWidth: 100,
    layer: LAYER_TYPE.hex,
};
