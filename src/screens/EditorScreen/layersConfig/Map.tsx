import { useLayerObservableStore } from '../layerStore';

import { getLayers, LAYER_CONFIG } from './config';

export const Map = () => {
    const { layer } = useLayerObservableStore().store;

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
                    />
                );
            })}
        </div>
    );
};
