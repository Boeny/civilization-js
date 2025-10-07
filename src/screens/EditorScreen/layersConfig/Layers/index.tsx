import './styles.css';

import { IPoint, LAYER_TYPE } from 'types';
import { getClasses, getZeroVector, vectorDiv, vectorMult, vectorSub } from 'utils';

import { useLayerStore } from '../../layerStore';
import { getLayer, getLayerTypes, getMapsWithoutCurrent, ZOOM_CONFIG } from '../config';
import { useMapMovementParamsStore } from '../mapMovingStore';

import { adaptMapBorders } from './utils';

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const Layers = ({ panelWidth, screenSize }: Props) => {
    const {
        store: { layer: currentLayer },
        setStore: setLayer,
    } = useLayerStore();
    const { setStore: setMapMovementParams } = useMapMovementParamsStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (currentLayer !== type) {
            setLayer({ layer: type });
        }
    };

    const handleSetMapCommonParams = (
        createdMapType: LAYER_TYPE,
        newImageSize: IPoint,
        movingParams?: { zoom: number; position: IPoint },
    ) => {
        const otherExistingMaps = getMapsWithoutCurrent(createdMapType);

        // if some map exists - check if the new map is bigger and set borders
        if (otherExistingMaps.length > 0) {
            const adaptedImageSize = adaptMapBorders({ width: newImageSize.x, height: newImageSize.y }, otherExistingMaps);
            setMapMovementParams({ imageSize: adaptedImageSize });

            return;
        }

        // if it's the first map - set basic params relying on it
        let initialZoom = 1;
        let initialPosition = getZeroVector();

        if (movingParams) {
            initialZoom = movingParams.zoom;
            initialPosition = movingParams.position;
        } else {
            initialZoom = ZOOM_CONFIG.minWidth / newImageSize.x; // set minimal size
            const zoomedImageSize = vectorMult(newImageSize, initialZoom);
            initialPosition = vectorDiv(vectorSub(screenSize, zoomedImageSize), 2); // set in the screen center
        }

        setMapMovementParams({
            imageSize: newImageSize,
            zoom: initialZoom,
            position: initialPosition,
        });
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
                            setMapCommonParams={(imageSize, movingParams) => handleSetMapCommonParams(type, imageSize, movingParams)}
                            otherExistingMapsCount={getMapsWithoutCurrent(type).length}
                        />
                    </div>
                );
            })}
        </div>
    );
};
