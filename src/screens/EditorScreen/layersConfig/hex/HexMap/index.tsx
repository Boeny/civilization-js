import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { useMouseMove } from 'hooks/useMouseMove';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { useImageMapObservableStore } from '../../image/imageMapStore';
import { IMapProps } from '../../types';
import { HEX_CONFIG } from '../hexConfig';
import { useBrushObservableStore } from '../stores/brushStore';
import { useGridObservableStore } from '../stores/gridSwitchStore';
import { useHexMapObservableStore } from '../stores/hexMapStore';
import { HEX_TYPE, HexMapData } from '../types';
import { getHexRadius } from '../utils';

import { getMapCoordinatesFromCursor } from './utils';

const screenSize = getVector(window.innerWidth, window.innerHeight);

function fillHex({
    point,
    hexWidth,
    hexRadius,
    mapSize,
    brush,
    data,
}: {
    point: IPoint;
    hexWidth: number;
    hexRadius: number;
    mapSize: IPoint;
    brush: HEX_TYPE | null;
    data: HexMapData;
}): HexMapData {
    const mapPoint = getMapCoordinatesFromCursor(point, hexWidth, hexRadius);

    if (
        mapPoint.x < 0 ||
        mapPoint.y < 0 ||
        mapPoint.x >= mapSize.x ||
        mapPoint.y >= mapSize.y ||
        !brush ||
        data[mapPoint.y][mapPoint.x] === brush
    ) {
        return data;
    }

    data[mapPoint.y][mapPoint.x] = brush;

    return data;
}

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    data: HexMapData;
};

function HexMapComponent({ isEditable, zIndex, data }: Props) {
    const {
        store: { hexWidth: originalHexWidth, opacity, position: originalPosition },
        setStore: setHexMap,
    } = useHexMapObservableStore();
    const { zoom, position: imagePosition } = useImageMapObservableStore().store;
    const { brush } = useBrushObservableStore().store;
    const { isGridTurnedOn } = useGridObservableStore().store;

    const position = vectorSum(originalPosition, imagePosition);
    const hexWidth = originalHexWidth * zoom;
    const hexRadius = getHexRadius(hexWidth);
    const hexHeight = hexRadius * 1.5;
    const mapSize = getVector(data[0].length, data.length);

    const { startMoving } = useMouseMove((e) => {
        const newData = fillHex({
            point: vectorSub(getVector(e.offsetX, e.offsetY), position),
            hexWidth,
            hexRadius,
            mapSize,
            brush,
            data,
        });
        setHexMap({ data: [...newData] });
    }, isEditable);

    const handleMouseDown = (ctx: CanvasRenderingContext2D, point: IPoint) => {
        if (brush !== null) {
            startMoving();
            const newData = fillHex({
                point: vectorSub(point, position),
                hexWidth,
                hexRadius,
                mapSize,
                brush,
                data,
            });
            setHexMap({ data: [...newData] });
        }
    };

    return (
        <Canvas
            id="hex-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex, opacity }}
            onMouseDown={isEditable ? handleMouseDown : undefined}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);

                for (let y = 0; y < data.length; y += 1) {
                    if (y * hexHeight + position.y > screenSize.y) {
                        break;
                    }

                    const row = data[y];

                    for (let x = 0; x < row.length; x += 1) {
                        if (x * hexWidth + position.x > screenSize.x) {
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
            }}
        </Canvas>
    );
}

export function HexMap(props: IMapProps) {
    const { isVisible, data } = useHexMapObservableStore().store;

    if (!isVisible || !data?.length) {
        return null;
    }

    return (
        <HexMapComponent
            {...props}
            data={data}
        />
    );
}
