import { IPoint } from 'types';

import { useLayerStore } from '../layerStore';

import { getLayers, LAYER_CONFIG } from './config';
import { useMapMoving } from './useMapMoving';

type Props = {
    screenSize: IPoint;
};

export const Map = ({ screenSize }: Props) => {
    const { layer } = useLayerStore().store;

    useMapMoving(screenSize);

    return (
        <div>
            {getLayers().map((type, i) => {
                const config = LAYER_CONFIG[type];

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
