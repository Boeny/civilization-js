import { useState } from 'react';

import { Block } from 'components/Block';
import { IEditorParamsMenuOption, MENU_TYPE } from 'menus/types';
import { LAYER_TYPE } from 'screens/EditorScreen/types';

import { HexMapParamsBlock } from './HexMapParamsBlock';
import { StartFromLayer } from './StartFromLayerButton';
import { DEFAULT_EDITOR_PARAMS, IEditorParamsMenuState } from './store';
import { checkSubmitValidity } from './utils';

interface IProps {
    parent: IEditorParamsMenuOption['parent'];
    openParentMenu: () => void;
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenu = ({ parent, openParentMenu, onSubmit }: IProps) => {
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
            <button onClick={openParentMenu}>Back to {parent === MENU_TYPE.main ? 'main' : 'editor'} menu</button>

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

            <button onClick={submitHandler}>Create map</button>
        </>
    );
};
