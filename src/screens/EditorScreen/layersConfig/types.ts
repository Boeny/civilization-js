import { IPoint } from 'types';

export interface IMiniMapProps {
    screenSize: IPoint;
    panelWidth: number;
    title: string;
    isSelected: boolean;
    otherExistingMaps: IMap[];
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
