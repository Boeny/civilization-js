import './styles.css';

import { FC, useEffect, useState } from 'react';

import { generateEmptyMapData } from 'hexUtils';
import { useLayerStore } from 'screens/EditorScreen/layerStore';
import { IPoint, LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { getLayerTypes, LAYER_CONFIG } from '../config';
import { heightMapStoreConfig } from '../height/store';
import { HexMapData } from '../models';
import { IMiniMapProps } from '../types';
import { waterMapStoreConfig } from '../water/store';

type MiniMapType = { type: LAYER_TYPE; component: FC<IMiniMapProps> };

const WATER_EXISTS = 1;

async function getMiniMapComponent(type: LAYER_TYPE): Promise<FC<IMiniMapProps>> {
    return import('../' + type + '/MiniMap').then((module) => module.MiniMap);
}

async function getMiniMapObject(type: LAYER_TYPE): Promise<MiniMapType> {
    return new Promise<MiniMapType>((resolve) => getMiniMapComponent(type).then((component) => resolve({ type, component })));
}

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const MiniMaps = ({ panelWidth, screenSize }: Props) => {
    const {
        store: { layer: currentLayer },
        setStore: setLayer,
    } = useLayerStore();

    const [miniMaps, setMiniMaps] = useState<MiniMapType[]>([]);

    useEffect(() => {
        (async () => {
            setMiniMaps(await Promise.all(getLayerTypes().map(getMiniMapObject)));
        })();
    }, []);

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (currentLayer !== type) {
            setLayer({ layer: type });
        }
    };

    const handleMapCreate = (type: LAYER_TYPE, params?: { shouldCreateWaterMap: boolean }) => {
        switch (type) {
            case LAYER_TYPE.height:
            case LAYER_TYPE.water:
                // eslint-disable-next-line no-case-declarations
                const { zoom, position, map } = heightMapStoreConfig.store;

                if (!params?.shouldCreateWaterMap) {
                    waterMapStoreConfig.setStore({
                        zoom,
                        position,
                        showCreateButton: true,
                    });

                    return;
                }

                waterMapStoreConfig.setStore({
                    zoom,
                    position,
                    showCreateButton: false,
                    map: new HexMapData(generateEmptyMapData(map!.mapSize, WATER_EXISTS)),
                });

                return;

            case LAYER_TYPE.image:
                heightMapStoreConfig.setStore({ hasImageMap: true });

                return;

            default:
                break;
        }
    };

    return (
        <div className="layers">
            {miniMaps.map((miniMap) => {
                const isSelected = currentLayer === miniMap.type;

                return (
                    <div
                        key={miniMap.type}
                        onClick={() => handleLayerClick(miniMap.type)}
                        className={getClasses(['layer', isSelected && 'selected'])}
                    >
                        <miniMap.component
                            screenSize={screenSize}
                            title={LAYER_CONFIG[miniMap.type].title}
                            panelWidth={panelWidth}
                            isSelected={isSelected}
                            onMapCreate={(params) => handleMapCreate(miniMap.type, params)}
                            createMapKeyBinding="c"
                        />
                    </div>
                );
            })}
        </div>
    );
};
