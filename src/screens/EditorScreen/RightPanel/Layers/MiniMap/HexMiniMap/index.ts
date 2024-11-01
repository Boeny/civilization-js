/* eslint-disable @typescript-eslint/no-unused-vars */
import './styles.css';

//import { Hex } from 'screens/EditorScreen/Map/HexMap/Hex';
import { MapData } from 'screens/EditorScreen/types';
//import { getHexRadius } from 'screens/EditorScreen/utils';

interface IProps {
    data: MapData;
    width: number;
    title: string;
}
export function HexMiniMap({ data, width, title }: IProps) {
    if (!data?.length) return null;

    const hexWidth = width / data[0].length;
    //const hexRadius = getHexRadius(hexWidth);

    return null;
    // return Canvas(
    //     (ctx) => {
    //         mapData.forEach((row, y) => {
    //             row.forEach((type, x) => {
    //                 Hex({ ctx, x, y, width: hexWidth, radius: hexRadius, type });
    //             });
    //         });
    //     },
    //     {
    //         className: 'hex-mini-map',
    //         title,
    //         width: width + hexWidth / 2,
    //         height: (3 * hexRadius * mapData.length) / 2 + hexRadius / 2,
    //     },
    // );
}
