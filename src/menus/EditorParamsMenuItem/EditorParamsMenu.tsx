import { useCallback, useState } from 'react';

import { MenuItem } from 'components/Menu/MenuItem';
import { IEditorParamsMenuState, LAYER_TYPE } from 'types';

import { HexMapParamsBlock } from './HexMapParamsBlock';
import { LayerSwitcher } from './LayerSwitcher';

interface IProps {
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenu = ({ onSubmit }: IProps) => {
    const [layer, setLayer] = useState(LAYER_TYPE.image);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const isHex = layer === LAYER_TYPE.hex;
    const isValid = !isHex || (width && height);

    const handleLayerChange = useCallback((newLayer: LAYER_TYPE) => {
        setLayer(newLayer);
        setWidth(100);
        setHeight(100);
    }, []);

    const handleImageSubmit = useCallback(() => {
        onSubmit({ layer: LAYER_TYPE.image });
    }, []);

    const handleHexSubmit = useCallback(() => {
        if (isValid) {
            onSubmit({ width, height, layer: LAYER_TYPE.hex });
        }
    }, [isValid, width, height]);

    return (
        <>
            <MenuItem
                name="Back"
                action="back"
                style={{ marginBottom: 24 }}
            />

            <LayerSwitcher
                layer={layer}
                onLayerChange={handleLayerChange}
            >
                {isHex && (
                    <HexMapParamsBlock
                        width={width}
                        height={height}
                        setWidth={setWidth}
                        setHeight={setHeight}
                        onEnterKeyDown={handleHexSubmit}
                    />
                )}
            </LayerSwitcher>

            <MenuItem
                disabled={!isValid}
                alignRight
                name="Create map"
                style={{ marginTop: 24 }}
                onClick={isHex ? handleHexSubmit : handleImageSubmit}
            />
        </>
    );
};
