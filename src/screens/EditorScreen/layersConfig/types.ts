import { IPoint } from 'types';

import { CREATE_TYPE } from './hex/types';

export interface IMiniMapProps {
    panelWidth: number;
    title: string;
    isSelected: boolean;
    mapsCount: number;
    setMapCommonParams: (imageSize: IPoint, creationType?: CREATE_TYPE) => void;
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
