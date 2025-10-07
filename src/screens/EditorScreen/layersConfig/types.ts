import { IPoint } from 'types';

export interface IMiniMapProps {
    screenSize: IPoint;
    panelWidth: number;
    title: string;
    isSelected: boolean;
    otherExistingMapsCount: number;
    setMapCommonParams: (imageSize: IPoint, movingParams?: { zoom: number; position: IPoint }) => void;
}
export interface IMapProps {
    isEditable: boolean;
    zIndex: number;
    screenSize: IPoint;
}

export type IMap = { width: number; height: number }; // in pixels

export interface MapStore {
    map: IMap | null;
}
