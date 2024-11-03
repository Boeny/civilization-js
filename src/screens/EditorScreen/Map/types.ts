export interface IMapProps<T> {
    data?: T | null;
    width: number;
    height: number;
    zIndex: number;
    onDataUpdate: (data: T) => void;
}
