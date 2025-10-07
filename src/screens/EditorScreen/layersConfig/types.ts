import { IPoint } from 'types';

import { CREATE_MODE } from './hex/types';

export interface IMiniMapProps {
    panelWidth: number;
    title: string;
    isSelected: boolean;
    otherExistingMapsCount: number;
    setMapCommonParams: (imageSize: IPoint, creationMode?: CREATE_MODE) => void;
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
