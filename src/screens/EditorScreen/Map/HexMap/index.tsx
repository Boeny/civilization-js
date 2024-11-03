import './styles.css';

import { useState } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { HEX_CONFIG } from 'screens/EditorScreen/hexConfig';
import { useEditorStore } from 'screens/EditorScreen/store';
import { useGridStore } from 'screens/EditorScreen/TopPanel/ToggleGridButton';
import { MapData } from 'screens/EditorScreen/types';
import { getHexRadius } from 'screens/EditorScreen/utils';

import { IMapProps } from '../types';

import { getMapCoordinatesFromCursor } from './utils';

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

export function HexMap({ width, height, data, zIndex, onDataUpdate }: IMapProps<MapData>) {
    const [isPainting, setPainting] = useState(false);
    const [{ hexWidth, brush }] = useEditorStore();
    const [{ isGridTurnedOn }] = useGridStore();

    const hexRadius = getHexRadius(hexWidth);

    const updateMap = (x: number, y: number) => {
        const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth, hexRadius);

        if (!data[mapY] || data[mapY]?.[mapX] === brush || mapX < 0 || mapY < 0 || mapX >= width || mapY >= height) {
            return;
        }

        data[mapY][mapX] = brush!;

        onDataUpdate(data);
    };

    return (
        <Canvas
            id="hex-map"
            width={width}
            height={height}
            style={{ zIndex }}
            onMouseDown={(ctx, x, y) => {
                if (brush !== null) {
                    updateMap(x, y);
                    setPainting(true);
                }
            }}
            onMouseMove={(ctx, x, y) => {
                if (isPainting) {
                    updateMap(x, y);
                }
            }}
            onMouseUp={() => {
                setPainting(false);
            }}
        >
            {(ctx) => {
                for (let y = 0; y < data.length; y += 1) {
                    if (y * hexRadius * 1.5 > height) break;

                    const row = data[y];

                    for (let x = 0; x < row.length; x += 1) {
                        if (x * hexWidth > width) break;

                        Hex({
                            ctx,
                            x,
                            y,
                            width: hexWidth,
                            radius: hexRadius,
                            color: HEX_CONFIG[row[x]].color,
                            isGridTurnedOn,
                        });
                    }
                }
            }}
        </Canvas>
    );
}
