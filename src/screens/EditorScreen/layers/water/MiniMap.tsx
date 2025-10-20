import { useCallback } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { EMPTY_COLOR, WATER_COLOR } from 'const';
import { getHexHeight } from 'hexUtils';
import { useKey } from 'hooks/useKey';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';

import { HexMapData } from '../models';
import { IMiniMapProps } from '../types';

import { useStore } from './store';

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
export const MiniMap = ({ isSelected, title, panelWidth, onMapCreate, createMapKeyBinding }: IMiniMapProps) => {
    const {
        store: { map, isVisible, opacity, showCreateButton },
        setStore,
    } = useStore();

    const handleMapCreate = useCallback(() => {
        onMapCreate({ shouldCreateWaterMap: true });
    }, []);

    const handleCreateMapByKey = useCallback(
        (key: string) => {
            if (isSelected && key === createMapKeyBinding) {
                handleMapCreate();
            }
        },
        [createMapKeyBinding, handleMapCreate, isSelected],
    );

    useKey(handleCreateMapByKey);

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
                        map={map}
                    />
                )
            }
            title={title}
        >
            {showCreateButton && (
                <div>
                    <Block
                        alignCenter
                        noPadding
                    >
                        <Button onClick={handleMapCreate}>Create Map ({createMapKeyBinding})</Button>
                    </Block>
                </div>
            )}
        </MiniMapWrapper>
    );
};
