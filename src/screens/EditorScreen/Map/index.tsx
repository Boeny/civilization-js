import { LAYER_CONFIG } from '../const';
import { useEditorStore } from '../store';
import { LAYER_TYPE } from '../types';

interface IProps {
    width: number;
    height: number;
}
export function Map({ width, height }: IProps) {
    const [{ data }] = useEditorStore();

    const layers = Object.keys(data).map(Number) as LAYER_TYPE[];

    return (
        <div>
            {layers.map((type) => {
                const MapLayer = LAYER_CONFIG[type].mapComponent;
                const mapData = data[type];

                if (!MapLayer || !mapData) {
                    return null;
                }

                return (
                    <MapLayer
                        key={type}
                        data={mapData}
                        width={width}
                        height={height}
                    />
                );
            })}
        </div>
    );
}
