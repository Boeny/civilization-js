import './styles.css';

import { useLayerObservableStore } from 'layerStore';
import { LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { getLayers, LAYER_CONFIG } from '../config';

export const Layers = ({ width }: { width: number }) => {
    const [{ layer }, setLayer] = useLayerObservableStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer === type) {
            return;
        }

        //     if (type === LAYER_TYPE.hex && !data[type]) {
        //         showPopup(
        //             <MenuPopup>
        //                 <CreateMapMenu
        //                     onSubmit={(params) => {
        //                         setStore({
        //                             layer: type,
        //                             data: { ...data, [type]: generateEmptyMapData(params.width, params.height) },
        //                         });
        //                     }}
        //                 />
        //             </MenuPopup>,
        //         );

        //         return;
        //     }

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
