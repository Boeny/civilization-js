import './styles.css';

import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { IPoint, LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { useLayerStore } from '../../layerStore';
import { getLayer, getLayerTypes, getMapsWithoutCurrent } from '../config';

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const Layers = ({ panelWidth, screenSize }: Props) => {
    useMapMovementParamsStore(); // to update on common params change (new map)
    const {
        store: { layer: currentLayer },
        setStore: setLayer,
    } = useLayerStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (currentLayer !== type) {
            setLayer({ layer: type });
        }
    };

    return (
        <div className="layers">
            {getLayerTypes().map((type) => {
                const config = getLayer(type);
                const isSelected = currentLayer === type;

                return (
                    <div
                        key={type}
                        onClick={() => handleLayerClick(type)}
                        className={getClasses(['layer', isSelected && 'selected'])}
                    >
                        <config.miniMapComponent
                            screenSize={screenSize}
                            title={config.title}
                            panelWidth={panelWidth}
                            isSelected={isSelected}
                            otherExistingMaps={getMapsWithoutCurrent(type)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
