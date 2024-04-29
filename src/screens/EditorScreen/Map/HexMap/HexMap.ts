import './HexMap.css';

import { MapData } from "types";
import { HEX_MAP_KEY, HEX_MINI_MAP_KEY, SQRT_3 } from 'screens/EditorScreen/const';
import { getMapData, getMapPoint, setMapPointAction } from 'state/mapActions';
import { getHexWidth } from 'state/hexWidthActions';
import { isGridTurnedOn } from 'state/gridStatusActions';

import { observable } from 'hoc/observable';
import { Canvas } from 'components/Canvas/Canvas';
import { getBrush } from 'state/brushActions';
import { Hex } from './Hex';
import { getMapCoordinatesFromCursor } from 'logic';
import { isPainting, setPainting } from 'state/paintingActions';
import { trigger } from 'utils';
import { HEX_TYPE } from 'const';

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

interface Params extends ContainerParams {
    mapData: MapData;
    hexWidth: number;
    isGridTurnedOn: boolean;
    onMouseDown: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseMove: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseUp: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}

function HexMap ({mapData, hexWidth, width, height, isGridTurnedOn, onMouseDown, onMouseMove, onMouseUp}: Params) {
    return Canvas(
        (ctx) => {
            const hexRadius = hexWidth / SQRT_3;

            for (let y = 0; y < mapData.length; y += 1) {
                if (y * hexRadius * 1.5 > height) break;

                const row = mapData[y];

                for (let x = 0; x < row.length; x += 1) {
                    if (x * hexWidth > width) break;

                    Hex({ctx, x, y, width: hexWidth, radius: hexRadius, type: row[x], isGridTurnedOn})
                }
            }
        },
        {
            id: 'hex-map',
            width,
            height,
            onMouseDown,
            onMouseMove,
            onMouseUp,
        }
    );
}


function drawHex(ctx: CanvasRenderingContext2D, brushType: HEX_TYPE, x: number, y: number) {
    const hexWidth = getHexWidth();
    const hexRadius = hexWidth / SQRT_3;

    const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth, hexRadius);
    if (mapX < 0) return;

    if (getMapPoint(mapX, mapY) === brushType) return;

    console.log(mapX, mapY);
    Hex({ctx, x: mapX, y: mapY, width: hexWidth, radius: hexRadius, type: brushType, isGridTurnedOn: isGridTurnedOn()});

    setMapPointAction(mapX, mapY, brushType);
    trigger(HEX_MINI_MAP_KEY);
}

interface ContainerParams {
    width: number;
    height: number;
}

export const HexMapContainer = observable(HEX_MAP_KEY, (params: ContainerParams): HTMLElement => {
    return HexMap({
        mapData: getMapData(),
        hexWidth: getHexWidth(),
        isGridTurnedOn: isGridTurnedOn(),
        ...params,
        onMouseDown: (ctx, x, y) => {
            const brushType = getBrush();
            if (brushType) {
                drawHex(ctx, brushType, x, y);
                setPainting(true);
            }
        },
        onMouseMove: (ctx, x, y) => {
            if (isPainting()) {
                drawHex(ctx, getBrush()!, x, y);
            }
        },
        onMouseUp: () => {
            setPainting(false);
        },
    });
});
