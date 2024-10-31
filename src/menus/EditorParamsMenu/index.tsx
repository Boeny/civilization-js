import { useState } from 'react';

import { Block } from 'components/Block';
import { MenuItem } from 'components/Menu/MenuItem';
import { LAYER_TYPE } from 'screens/EditorScreen/types';

import { HexMapParamsBlock } from './HexMapParamsBlock';
import { StartFromLayer } from './StartFromLayerButton';
import { DEFAULT_EDITOR_PARAMS, IEditorParamsMenuState } from './store';
import { checkSubmitValidity } from './utils';

interface IProps {
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenu = ({ onSubmit }: IProps) => {
    const [layer, setLayer] = useState(DEFAULT_EDITOR_PARAMS.layer);
    const [width, setWidth] = useState(DEFAULT_EDITOR_PARAMS.width);
    const [height, setHeight] = useState(DEFAULT_EDITOR_PARAMS.height);
    const [hexWidth, setHexWidth] = useState(DEFAULT_EDITOR_PARAMS.hexWidth);

    function submitHandler() {
        const errors = checkSubmitValidity({ width, height, hexWidth });

        if (errors.length === 0) {
            onSubmit({ width, height, hexWidth, layer });
        }
    }

    return (
        <>
            <MenuItem
                name="Back"
                action="back"
            />

            <HexMapParamsBlock
                disabled={layer === LAYER_TYPE.image}
                width={width}
                setWidth={setWidth}
                height={height}
                setHeight={setHeight}
                hexWidth={hexWidth}
                setHexWidth={setHexWidth}
                onEnterKeyDown={submitHandler}
            />

            <Block bordered>
                <StartFromLayer
                    layer={layer}
                    setLayer={setLayer}
                />
            </Block>

            <MenuItem
                name="Create map"
                onClick={submitHandler}
            />
        </>
    );
};
