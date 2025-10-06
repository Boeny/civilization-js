import './styles.css';

import { IPoint, LAYER_TYPE } from 'types';
import { getClasses, getVector, getZeroVector, vectorDiv, vectorMult, vectorSub } from 'utils';

import { useLayerStore } from '../../layerStore';
import { getLayers, getMaps, LAYER_CONFIG, ZOOM_CONFIG } from '../config';
import { mapMovementParamsConfig } from '../mapMovingStore';

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const Layers = ({ panelWidth, screenSize }: Props) => {
    const {
        store: { layer },
        setStore: setLayer,
    } = useLayerStore();
    const setMapMovementParams = mapMovementParamsConfig.setStore;

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer === type) {
            return;
        }

        setLayer({ layer: type });
    };

    const handleSetMapCommonParams = (newWidth: number, newHeight: number) => {
        const maps = getMaps();

        // if some map exists - check if the new map is bigger and set borders
        if (maps.some(Boolean)) {
            const currentMapMaxSize = getZeroVector();
            maps.forEach((map) => {
                if (!map) {
                    return;
                }
                if (currentMapMaxSize.x < map.width) {
                    currentMapMaxSize.x = map.width;
                }
                if (currentMapMaxSize.y < map.height) {
                    currentMapMaxSize.y = map.height;
                }
            });

            if (newWidth > currentMapMaxSize.x) {
                currentMapMaxSize.x = newWidth;
            }
            if (newHeight > currentMapMaxSize.y) {
                currentMapMaxSize.y = newHeight;
            }

            setMapMovementParams({
                imageSize: currentMapMaxSize,
            });

            return;
        }

        // if it's the first map - set basic params relying on it
        const initialZoom = ZOOM_CONFIG.minWidth / newWidth; // set minimal size
        const imageSize = getVector(newWidth, newHeight);

        setMapMovementParams({
            imageSize,
            zoom: initialZoom,
            position: vectorDiv(vectorSub(screenSize, vectorMult(imageSize, initialZoom)), 2),
        });
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
                            panelWidth={panelWidth}
                            title={config.title}
                            setMapCommonParams={handleSetMapCommonParams}
                        />
                    </div>
                );
            })}
        </div>
    );
};
