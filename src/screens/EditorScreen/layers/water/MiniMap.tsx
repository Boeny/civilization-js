import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { EMPTY_COLOR, WATER_COLOR } from 'const';
import { generateEmptyMapData, getHexHeight } from 'hexUtils';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';

import { hexMapStoreConfig } from '../hex/store';
import { HexMapData } from '../models';
import { IMiniMapProps } from '../types';

import { useStore } from './store';

const WATER_EXISTS = 1;

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData;
};

const MiniMapComponent = ({ panelWidth, title, map }: Props) => {
    const miniHexWidth = panelWidth / (map.rowLength + 10);
    const miniHexHeight = getHexHeight(miniHexWidth);

    return (
        <Canvas
            title={title}
            width={panelWidth + miniHexWidth / 2}
            height={(miniHexHeight + 1) * map.columnLength}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                map.data.forEach((row, y) => {
                    row.forEach((isWaterExist, x) => {
                        Hex({ ctx, position: { x, y }, width: miniHexWidth, color: isWaterExist ? WATER_COLOR : EMPTY_COLOR });
                    });
                });
            }}
        </Canvas>
    );
};

// eslint-disable-next-line import/no-unused-modules
export const MiniMap = ({ title, panelWidth }: IMiniMapProps) => {
    const {
        store: { map, isVisible, opacity },
        setStore,
    } = useStore();

    const heightMap = hexMapStoreConfig.store;

    const handleCreateMap = () => {
        setStore({
            map: new HexMapData(generateEmptyMapData(heightMap.map!.mapSize, WATER_EXISTS)),
            zoom: heightMap.zoom,
            position: heightMap.position,
        });
    };

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setStore({ isVisible: value })}
            opacity={opacity}
            setOpacity={(value) => setStore({ opacity: value })}
            map={
                map && (
                    <MiniMapComponent
                        panelWidth={panelWidth}
                        title={title}
                        map={map!}
                    />
                )
            }
            title={title}
        >
            {heightMap.map && (
                <div>
                    <Block
                        alignCenter
                        noPadding
                    >
                        <Button onClick={handleCreateMap}>Create Map</Button>
                    </Block>
                </div>
            )}
        </MiniMapWrapper>
    );
};
