import './styles.css';

import { FC, useEffect, useState } from 'react';

import { useLayerStore } from 'screens/EditorScreen/layerStore';
import { IPoint, LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { getLayerTypes, LAYER_CONFIG } from '../config';
import { heightMapStoreConfig } from '../height/store';
import { IMiniMapProps } from '../types';
import { waterMapStoreConfig } from '../water/store';

type MiniMapType = { type: LAYER_TYPE; component: FC<IMiniMapProps> };

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
            const miniMaps = await Promise.all(getLayerTypes().map(getMiniMapObject));

            setMiniMaps(miniMaps);
        })();
    }, []);

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (currentLayer !== type) {
            setLayer({ layer: type });
        }
    };

    const handleMapCreate = (type: LAYER_TYPE) => {
        switch (type) {
            case LAYER_TYPE.height:
                waterMapStoreConfig.reset();

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
                            onMapCreate={() => handleMapCreate(miniMap.type)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
