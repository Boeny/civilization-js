import { useState } from 'react';

import { MenuItem } from 'components/Menu/MenuItem';
import { useLayerStore } from 'layerStore';
import { useScreenStore } from 'screenStore';
import { LAYER_TYPE, SCREEN_TYPE } from 'types';

import { HexMapParamsBlock } from './HexMapParamsBlock';
import { LayerSwitcher } from './LayerSwitcher';

export const EditorParamsMenu = () => {
    const [, setScreen] = useScreenStore();
    const [, setLayerConfig] = useLayerStore();
    const [layer, setLayer] = useState(LAYER_TYPE.image);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const isHex = layer === LAYER_TYPE.hex;
    const isValid = !isHex || (width && height);

    const handleLayerChange = (newLayer: LAYER_TYPE) => {
        setLayer(newLayer);
        setWidth(100);
        setHeight(100);
    };

    const handleImageSubmit = () => {
        setLayerConfig({ layer: LAYER_TYPE.image });
        setScreen({ screen: SCREEN_TYPE.editor });
    };

    const handleHexSubmit = () => {
        if (isValid) {
            setLayerConfig({ width, height, layer: LAYER_TYPE.hex });
            setScreen({ screen: SCREEN_TYPE.editor });
        }
    };

    return (
        <>
            <MenuItem
                title="Back"
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
                title="Create map"
                style={{ marginTop: 24 }}
                onClick={isHex ? handleHexSubmit : handleImageSubmit}
            />
        </>
    );
};
