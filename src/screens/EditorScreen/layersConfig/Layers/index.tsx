import './styles.css';

import { LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { useLayerObservableStore } from '../../layerStore';
import { getLayers, LAYER_CONFIG } from '../config';

export const Layers = ({ width }: { width: number }) => {
    const {
        store: { layer },
        setStore: setLayer,
    } = useLayerObservableStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer === type) {
            return;
        }

        setLayer({ layer: type });
    };

    return (
        <div className="layers">
            {getLayers().map((type) => {
                const config = LAYER_CONFIG[type];

                return (
                    <div
                        key={type}
                        onClick={() => handleLayerClick(type)}
                        className={getClasses(['layer', layer === type && 'selected'])}
                    >
                        <config.miniMapComponent
                            width={width}
                            title={config.title}
                        />
                    </div>
                );
            })}
        </div>
    );
};
