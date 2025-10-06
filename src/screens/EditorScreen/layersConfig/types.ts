import { IPoint } from 'types';

export interface IMiniMapProps {
    panelWidth: number;
    title: string;
    setMapCommonParams: (width: number, height: number) => void;
}
export interface IMapProps {
    isEditable: boolean;
    zIndex: number;
    screenSize: IPoint;
}
