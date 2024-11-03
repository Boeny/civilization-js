export interface IMapProps<T> {
    data: T;
    width: number;
    height: number;
    zIndex: number;
    onDataUpdate: (data: T) => void;
}
