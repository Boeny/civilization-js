import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';

import { BRUSH_MAP } from '../hex/config';
import { HexMapData } from '../hex/models';
import { hexMapStoreConfig } from '../hex/stores/hexMapStore';
import { HEX_TYPE } from '../hex/types';
import { generateEmptyMapData, getHexHeight } from '../hex/utils';
import { IMiniMapProps } from '../types';

import { useWaterMapStore } from './waterMapStore';

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
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: miniHexWidth, color: BRUSH_MAP[type].color });
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
        setStore: setWaterMap,
    } = useWaterMapStore();

    const heightMap = hexMapStoreConfig.store;

    const handleCreateMap = () => {
        setWaterMap({
            map: new HexMapData(generateEmptyMapData(heightMap.map!.mapSize, HEX_TYPE.water)),
            zoom: heightMap.zoom,
            position: heightMap.position,
        });
    };

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setWaterMap({ isVisible: value })}
            opacity={opacity}
            setOpacity={(value) => setWaterMap({ opacity: value })}
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
