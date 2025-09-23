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

export interface IPoint {
    x: number;
    y: number;
}

export enum SCREEN_TYPE {
    main,
    game,
    editor,
}
