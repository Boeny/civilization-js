import './styles.css';

import { IPoint, LAYER_TYPE } from 'types';
import { getClasses, vectorDiv, vectorMult, vectorSub } from 'utils';

import { useLayerStore } from '../../layerStore';
import { getLayer, getLayerTypes, getMaps, ZOOM_CONFIG } from '../config';
import { CREATE_TYPE } from '../hex/types';
import { useMapMovementParamsStore } from '../mapMovingStore';

import { adaptMapBorders } from './utils';

type Props = {
    screenSize: IPoint;
    panelWidth: number;
};

export const Layers = ({ panelWidth, screenSize }: Props) => {
    const {
        store: { layer },
        setStore: setLayer,
    } = useLayerStore();
    const { setStore: setMapMovementParams } = useMapMovementParamsStore();

    const layers = getLayerTypes();
    const storesWithMap = getMaps();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer !== type) {
            setLayer({ layer: type });
        }
    };

    const handleSetMapCommonParams = (createdMapType: LAYER_TYPE, newImageSize: IPoint, _creationType?: CREATE_TYPE) => {
        // if some map exists - check if the new map is bigger and set borders
        if (storesWithMap.length > 0) {
            const otherMaps = storesWithMap.filter((store) => store.type !== createdMapType).map((store) => store.map);
            const adaptedImageSize = adaptMapBorders({ width: newImageSize.x, height: newImageSize.y }, otherMaps);

            setMapMovementParams({ imageSize: adaptedImageSize });

            return;
        }

        // if it's the first map - set basic params relying on it
        const initialZoom = ZOOM_CONFIG.minWidth / newImageSize.x; // set minimal size

        setMapMovementParams({
            imageSize: newImageSize,
            zoom: initialZoom,
            position: vectorDiv(vectorSub(screenSize, vectorMult(newImageSize, initialZoom)), 2),
        });
    };

    return (
        <div className="layers">
            {layers.map((type) => {
                const config = getLayer(type);
                const isSelected = layer === type;

                return (
                    <div
                        key={type}
                        onClick={() => handleLayerClick(type)}
                        className={getClasses(['layer', isSelected && 'selected'])}
                    >
                        <config.miniMapComponent
                            panelWidth={panelWidth}
                            title={config.title}
                            isSelected={isSelected}
                            setMapCommonParams={(imageSize, creationType) => handleSetMapCommonParams(type, imageSize, creationType)}
                            mapsCount={storesWithMap.length}
                        />
                    </div>
                );
            })}
        </div>
    );
};
