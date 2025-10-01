import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { useMouseMove } from 'hooks/useMouseMove';

import { IMapProps } from '../../types';
import { HEX_CONFIG } from '../hexConfig';
import { useBrushObservableStore } from '../stores/brushStore';
import { useGridObservableStore } from '../stores/gridSwitchStore';
import { useHexMapObservableStore } from '../stores/hexMapStore';
import { getHexRadius } from '../utils';

import { getMapCoordinatesFromCursor } from './utils';

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

export function HexMap({ isEditable, zIndex }: IMapProps) {
    const {
        store: { hexWidth, data, zoom, opacity, position, isVisible },
        setStore: setHexMapStore,
    } = useHexMapObservableStore();

    const { brush } = useBrushObservableStore().store;
    const { isGridTurnedOn } = useGridObservableStore().store;

    const container = { updateMap: (_x: number, _y: number) => {} };
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const { startMoving } = useMouseMove((e) => container.updateMap(e.offsetX, e.offsetY), isEditable);

    if (!data?.length || !isVisible) {
        return null;
    }

    const hexRadius = getHexRadius(hexWidth) * zoom;
    const hexHeight = hexRadius * 1.5;

    container.updateMap = (x: number, y: number) => {
        if (!data?.length) {
            return;
        }

        const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth, hexRadius);

        if (mapX < 0 || mapY < 0 || mapY >= data.length || mapX >= data[mapY].length || data[mapY][mapX] === brush!) {
            return;
        }

        data[mapY][mapX] = brush!;

        setHexMapStore({ data: [...data] });
    };

    const children = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, screenWidth, screenHeight);

        for (let y = 0; y < data!.length; y += 1) {
            if (y * hexHeight + position.y > screenHeight) {
                break;
            }

            const row = data![y];

            for (let x = 0; x < row.length; x += 1) {
                if (x * hexWidth + position.x > screenWidth) {
                    break;
                }

                const hexType = row[x];

                Hex({
                    ctx,
                    position: { x, y },
                    offset: position,
                    width: hexWidth,
                    radius: hexRadius,
                    color: HEX_CONFIG[hexType].color,
                    isGridTurnedOn,
                });
            }
        }
    };

    return (
        <Canvas
            id="hex-map"
            width={screenWidth}
            height={screenHeight}
            style={{ zIndex, opacity }}
            onMouseDown={
                isEditable
                    ? (ctx, x, y) => {
                          if (brush !== null) {
                              container.updateMap(x, y);
                              startMoving();
                          }
                      }
                    : undefined
            }
        >
            {children}
        </Canvas>
    );
}
