import './styles.css';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { HEX_CONFIG } from 'screens/EditorScreen/hexConfig';
import { MapData } from 'screens/EditorScreen/types';
import { getHexRadius } from 'screens/EditorScreen/utils';

interface IProps {
    data: MapData;
    width: number;
    title: string;
}
export function HexMiniMap({ data, width, title }: IProps) {
    if (!data?.length) return null;

    const hexWidth = width / data[0].length;
    const hexRadius = getHexRadius(hexWidth);

    return (
        <Canvas
            className="hex-mini-map"
            title={title}
            width={width + hexWidth / 2}
            height={(3 * hexRadius * data.length) / 2 + hexRadius / 2}
        >
            {(ctx) => {
                data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, x, y, width: hexWidth, radius: hexRadius, color: HEX_CONFIG[type].color });
                    });
                });
            }}
        </Canvas>
    );
}
