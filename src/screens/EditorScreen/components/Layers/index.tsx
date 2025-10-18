import './styles.css';

import { FC, useEffect, useState } from 'react';

import { IMiniMapProps } from 'screens/EditorScreen/layersConfig/types';
import { IPoint, LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { getLayerTypes, LAYER_CONFIG } from '../../layersConfig/config';
import { useLayerStore } from '../../layerStore';

type MiniMapType = { type: LAYER_TYPE; component: FC<IMiniMapProps> };

async function getMiniMapComponent(type: LAYER_TYPE): Promise<FC<IMiniMapProps>> {
    return import('../../layersConfig/' + type + '/MiniMap').then((module) => module.MiniMap);
}

async function getMiniMapObject(type: LAYER_TYPE): Promise<MiniMapType> {
    return new Promise<MiniMapType>((resolve) => getMiniMapComponent(type).then((component) => resolve({ type, component })));
}

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const Layers = ({ panelWidth, screenSize }: Props) => {
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
                        />
                    </div>
                );
            })}
        </div>
    );
};
