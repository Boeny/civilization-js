import { FC, useEffect, useState } from 'react';

import { useMapMoving } from 'hooks/useMapMoving';
import { IPoint, LAYER_TYPE } from 'types';

import { useLayerStore } from '../layerStore';

import { getLayerTypes } from './config';
import { IMapProps } from './types';

type MapType = { type: LAYER_TYPE; component: FC<IMapProps> };

async function getMapComponent(type: LAYER_TYPE): Promise<FC<IMapProps>> {
    return import('./' + type + '/Map').then((module) => module.Map);
}

async function getMapObject(type: LAYER_TYPE): Promise<MapType> {
    return new Promise<MapType>((resolve) => getMapComponent(type).then((component) => resolve({ type, component })));
}

type Props = {
    screenSize: IPoint;
};

export const Maps = ({ screenSize }: Props) => {
    const { layer } = useLayerStore().store;
    const [maps, setMaps] = useState<MapType[]>([]);

    useEffect(() => {
        (async () => {
            setMaps(await Promise.all(getLayerTypes().map(getMapObject)));
        })();
    }, []);

    useMapMoving(screenSize);

    return (
        <div>
            {maps.map((map, i) => (
                <map.component
                    key={map.type}
                    isEditable={layer === map.type}
                    zIndex={i}
                    screenSize={screenSize}
                />
            ))}
        </div>
    );
};
