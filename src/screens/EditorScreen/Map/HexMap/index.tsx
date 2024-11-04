import './styles.css';

import { useCallback, useMemo } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { useMouseMove } from 'hooks/useMouseMove';
import { useBrushStore } from 'screens/EditorScreen/HexBrushes';
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

export function HexMap({ isEditable, opacity, width, height, data, zIndex, onDataUpdate }: IMapProps<MapData>) {
    const [{ hexWidth }] = useEditorStore();
    const [{ brush }] = useBrushStore();
    const [{ isGridTurnedOn }] = useGridStore();

    const config = useMemo(() => ({ updateMap: (_x: number, _y: number) => {} }), []);

    const { startMoving } = useMouseMove((e) => {
        config.updateMap(e.offsetX, e.offsetY);
    }, isEditable);

    const hexRadius = useMemo(() => getHexRadius(hexWidth), [hexWidth]);
    const hexHeight = useMemo(() => hexRadius * 1.5, [hexRadius]);

    config.updateMap = useCallback(
        (x: number, y: number) => {
            if (!data?.length) return;

            const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth, hexRadius);

            if (mapX < 0 || mapY < 0 || mapY >= data.length || mapX >= data[mapY].length || data[mapY][mapX] === brush!) {
                return;
            }

            data[mapY][mapX] = brush!;

            onDataUpdate(data);
        },
        [brush, data, hexRadius, hexWidth],
    );

    if (!data?.length) return null;

    return (
        <Canvas
            id="hex-map"
            width={width}
            height={height}
            style={{ zIndex, opacity }}
            onMouseDown={
                isEditable
                    ? (ctx, x, y) => {
                          if (brush !== null) {
                              config.updateMap(x, y);
                              startMoving();
                          }
                      }
                    : undefined
            }
        >
            {(ctx) => {
                for (let y = 0; y < data.length; y += 1) {
                    if (y * hexHeight > height) break;

                    const row = data[y];

                    for (let x = 0; x < row.length; x += 1) {
                        if (x * hexWidth > width) break;

                        const hexType = row[x];

                        Hex({
                            ctx,
                            x,
                            y,
                            width: hexWidth,
                            radius: hexRadius,
                            color: HEX_CONFIG[hexType].color,
                            isGridTurnedOn,
                        });
                    }
                }
            }}
        </Canvas>
    );
}
