import { IPoint, LAYER_TYPE } from 'types';

export type OtherMap = { map: IMap; type: LAYER_TYPE };

export interface IMiniMapProps {
    screenSize: IPoint;
    panelWidth: number;
    title: string;
    isSelected: boolean;
    otherExistingMaps: OtherMap[];
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
