import './styles.css';

import { LAYER_CONFIG } from 'screens/EditorScreen/layersConfig';
import { useEditorStore } from 'screens/EditorScreen/store';
import { LAYER_TYPE } from 'screens/EditorScreen/types';
import { getClasses } from 'utils';

import { EyeButton } from './EyeButton';

interface IParams {
    width: number;
}
export const Layers = ({ width }: IParams) => {
    const [{ layer, data, visibility }, setStore] = useEditorStore();

    const handleLayerClick = (type: LAYER_TYPE) => {
        if (layer === type) return;

        setStore({ layer: type, isPainting: false });
    };

    const toggleVisibility = (type: LAYER_TYPE) => {
        setStore({ visibility: { ...visibility, [type]: !visibility[type] } });
    };

    const layers = Object.keys(LAYER_CONFIG).map(Number) as LAYER_TYPE[];

    return (
        <div className="layers">
            {layers.map((type) => {
                const { title, miniMapComponent: MiniMap } = LAYER_CONFIG[type];
                const isSelected = layer === type;
                const mapData = data[type];

                return (
                    <div
                        key={type}
                        onClick={MiniMap ? () => handleLayerClick(type) : undefined}
                        className={getClasses(['layer', isSelected && 'selected', MiniMap && 'implemented'])}
                    >
                        <div className="title">
                            {title}
                            {mapData && (
                                <EyeButton
                                    isVisible={!!visibility[type]}
                                    toggleVisibility={() => toggleVisibility(type)}
                                />
                            )}
                        </div>
                        {MiniMap && mapData && (
                            <MiniMap
                                data={mapData}
                                width={width}
                                title={title}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
