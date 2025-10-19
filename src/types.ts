export enum KEY_CODE {
    esc = 'Escape',
    enter = 'Enter',
}

export enum LAYER_TYPE {
    image = 'image',
    height = 'height',
    water = 'water',
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
