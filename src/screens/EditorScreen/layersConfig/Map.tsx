import { useMapMoving } from 'hooks/useMapMoving';
import { IPoint } from 'types';

import { useLayerStore } from '../layerStore';

import { getLayer, getLayerTypes } from './config';

type Props = {
    screenSize: IPoint;
};

export const Map = ({ screenSize }: Props) => {
    const { layer } = useLayerStore().store;

    useMapMoving(screenSize);

    return (
        <div>
            {getLayerTypes().map((type, i) => {
                const config = getLayer(type);

                if (!config.mapComponent) {
                    return null;
                }

                return (
                    <config.mapComponent
                        key={type}
                        isEditable={layer === type}
                        zIndex={i}
                        screenSize={screenSize}
                    />
                );
            })}
        </div>
    );
};
