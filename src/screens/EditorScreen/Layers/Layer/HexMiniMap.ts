import './HexMiniMap.css';
import { MapData } from 'types';
import { HEX_MINI_MAP_KEY } from 'screens/EditorScreen/const';
import { getHexRadius } from 'logic';
import { getHexMapData } from 'state/mapActions';
import { observable } from 'hoc/observable';
import { Canvas } from 'components/Canvas/Canvas';
import { Hex } from 'screens/EditorScreen/Map/HexMap/Hex';

function HexMiniMap(mapData: MapData, width: number, title: string) {
    const hexWidth = width / mapData[0].length;
    const hexRadius = getHexRadius(hexWidth);

    return Canvas(
        (ctx) => {
            mapData.forEach((row, y) => {
                row.forEach((type, x) => {
                    Hex({ctx, x, y, width: hexWidth, radius: hexRadius, type})
                })
            })
        },
        {
            className: 'hex-mini-map',
            title,
            width: width + hexWidth / 2,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius / 2,
        }
    );
}

export const HexMiniMapContainer = observable(HEX_MINI_MAP_KEY, ({width, title}: {width: number, title: string}) => {
    return HexMiniMap(getHexMapData(), width - 29, title);
})
