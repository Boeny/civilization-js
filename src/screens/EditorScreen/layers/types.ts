import { IPoint, LAYER_TYPE } from 'types';

export type OtherMap = MapStoreWithMap & { type: LAYER_TYPE };

export interface IMiniMapProps {
    screenSize: IPoint;
    panelWidth: number;
    title: string;
    isSelected: boolean;
    onMapCreate: () => void;
}
export interface IMapProps {
    isEditable: boolean;
    zIndex: number;
    screenSize: IPoint;
}

export type IMap = { width: number; height: number }; // in pixels

export interface MapStore {
    map: IMap | null;
    zoom: number;
    position: IPoint;
}

export type MapStoreWithMap = MapStore & { map: IMap };

export enum HEX_TYPE {
    empty,
    desert,
    dirt,
    meadow,
    tundra,
    snow,
    ice,
    mountain,
    hill,
}

export enum CREATE_MODE {
    fitImage,
    fitScreen,
    center,
    free,
}
