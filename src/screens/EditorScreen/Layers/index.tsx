/* eslint-disable @typescript-eslint/no-unused-vars */
import './styles.css';

import { Button } from 'components/Button';
import { MenuPopup } from 'components/MenuPopup';
import { HexMapParamsBlock } from 'menus/EditorParamsMenuItem/HexMapParamsBlock';
import { getLayers, LAYER_CONFIG } from 'screens/EditorScreen/layersConfig';
import { useEditorStore } from 'screens/EditorScreen/store';
import { LAYER_TYPE } from 'types';
import { getClasses } from 'utils';

import { generateEmptyMapData } from '../utils';

import { EyeButton, useVisibilityStore } from './EyeButton';
import { OpacityBar } from './OpacityBar';

interface IParams {
    width: number;
}
export const Layers = ({ width }: IParams) => {
    const [{ layer, data }, setStore] = useEditorStore();
    const [{ visibility }] = useVisibilityStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer === type) return;

        // if (type === LAYER_TYPE.hex && !data[type]) {
        //     showPopup(
        //         <MenuPopup>
        //             <CreateMapMenu
        //                 onSubmit={(params) => {
        //                     setStore({
        //                         layer: type,
        //                         data: { ...data, [type]: generateEmptyMapData(params.width, params.height) },
        //                     });
        //                 }}
        //             />
        //         </MenuPopup>,
        //     );

        //     return;
        // }

        setStore({ layer: type });
    };

    const layers = getLayers();

    return (
        <div className="layers">
            {layers.map((type) => {
                const { title, miniMapComponent: MiniMap } = LAYER_CONFIG[type];
                const isSelected = layer === type;
                const mapData = data[type];
                const isVisible = visibility[type];

                return (
                    <div
                        key={type}
                        onClick={MiniMap ? () => handleLayerClick(type) : undefined}
                        className={getClasses(['layer', isSelected && 'selected', MiniMap && 'implemented'])}
                    >
                        <div className="title">
                            {title}
                            {mapData && <EyeButton layer={type} />}
                        </div>

                        {mapData && isVisible && <OpacityBar layer={type} />}

                        <div className="mini-map">
                            {MiniMap && (
                                <MiniMap
                                    data={mapData}
                                    width={width}
                                    title={title}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
