export enum KEY_CODE {
    esc = 'Escape',
    enter = 'Enter',
}

export enum LAYER_TYPE {
    image,
    continuous,
    hex,
    objects,
    borders,
}

export interface IHexMapParams {
    width: number;
    height: number;
}

export type IEditorParamsMenuState = { layer: LAYER_TYPE.image } | (IHexMapParams & { layer: LAYER_TYPE.hex });
