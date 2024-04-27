import './Map.css';
import { MapData } from "types";
import { Canvas } from 'components/Canvas/Canvas';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { Polygon } from 'components/Canvas/Polygon';
import { isGridTurnedOn } from 'state/gridStatusActions';
import { observable } from 'hoc/observable';
import { MAP_GRID_KEY } from 'screens/const';

// TODO: Ctrl+Z

interface Params extends ContainerParams {
    isGridTurnedOn: boolean;
}

function Map ({mapData, hexSize, width, height, isGridTurnedOn}: Params) {
    const halfHexWidth = hexSize / 2;
    const hexRadius = hexSize / Math.sqrt(3);

    return Canvas(
        (ctx) => {
            if (isGridTurnedOn) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
            }

            for (let y = 0; y < mapData.length; y += 1) {
                if ((y - 2) * 2 * hexRadius > height) break;

                const row = mapData[y];

                for (let x = 0; x < row.length; x += 1) {
                    if (x * hexSize > width) break;

                    const type: HEX_TYPE = row[x];

                    ctx.fillStyle = HEX_CONFIG[type].color;

                    const xOffset = (y % 2 === 0 ? 0 : halfHexWidth) + halfHexWidth;
                    const yOffset = hexRadius;

                    Polygon({
                        ctx,
                        centerPoint: {
                            x: x * hexSize + xOffset,
                            y: y * 3 * hexRadius / 2 + yOffset
                        },
                        startAngle: Math.PI / 2,
                        radius: hexRadius,
                        sides: 6,
                    });

                    if (isGridTurnedOn) {
                        ctx.stroke();
                    }

                    ctx.fill();
                }
            }
        },
        {
            id: 'map',
            width,
            height,
            //onClick: (x, y) => console.log(x, y),
        }
    );
}

interface ContainerParams {
    mapData: MapData;
    hexSize: number;
    width: number;
    height: number;
}

export const MapContainer = observable(MAP_GRID_KEY, (params: ContainerParams): HTMLElement => {
    return Map({...params, isGridTurnedOn: isGridTurnedOn()});
});
