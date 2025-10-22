import { useCallback } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { EMPTY_COLOR, WATER_COLOR } from 'const';
import { useKey } from 'hooks/useKey';

import { MiniMapWrapper } from '../components/MiniMapWrapper';
import { useKeyBinding } from '../hooks/useKeyBinding';
import { HexMapData } from '../models';
import { IMiniMapProps } from '../types';
import { getHexMiniMapSize } from '../utils';

import { useStore } from './store';

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData;
};

const MiniMapComponent = ({ panelWidth, title, map }: Props) => {
    const { width, height, hexWidth } = getHexMiniMapSize(panelWidth, map);

    return (
        <Canvas
            title={title}
            width={width}
            height={height}
        >
            {(ctx) => {
                ctx.clearRect(0, 0, width, height);

                map.data.forEach((row, y) => {
                    row.forEach((isWaterExist, x) => {
                        Hex({ ctx, position: { x, y }, width: hexWidth, color: isWaterExist ? WATER_COLOR : EMPTY_COLOR });
                    });
                });
            }}
        </Canvas>
    );
};

// eslint-disable-next-line import/no-unused-modules
export const MiniMap = ({ isSelected, title, panelWidth, onMapCreate, createMapKeyBinding }: IMiniMapProps) => {
    const {
        store: { map, isVisible, showCreateButton },
        setStore,
    } = useStore();

    const handleMapCreate = useCallback(() => {
        onMapCreate({ shouldCreateWaterMap: true });
    }, []);

    const handleCreateMapByKey = useKeyBinding(createMapKeyBinding, isSelected, handleMapCreate);

    useKey(handleCreateMapByKey);

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setStore({ isVisible: value })}
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
