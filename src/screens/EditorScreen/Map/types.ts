export interface IMapProps<T> {
    isEditable: boolean;
    data?: T | null;
    width: number;
    height: number;
    zIndex: number;
    onDataUpdate: (data: T) => void;
}
