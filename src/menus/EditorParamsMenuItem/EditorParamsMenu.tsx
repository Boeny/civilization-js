import { useState } from 'react';

import { MenuItem } from 'components/Menu/MenuItem';
import { IEditorParamsMenuState, IHexMapParams, LAYER_TYPE } from 'types';
import { isValuePositiveNumber } from 'utils';

import { HexMapParamsBlock } from './HexMapParamsBlock';
import { LayerSwitcher } from './LayerSwitcher';

type HexMapField = keyof IHexMapParams;

function isValid(data: IHexMapParams): HexMapField[] {
    const errorFields: HexMapField[] = [];

    (Object.keys(data) as HexMapField[]).forEach((field) => {
        if (!isValuePositiveNumber(data[field])) {
            errorFields.push(field);
        }
    });

    return errorFields;
}

interface IProps {
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenu = ({ onSubmit }: IProps) => {
    const [layer, setLayer] = useState(LAYER_TYPE.image);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const isHex = layer === LAYER_TYPE.hex;

    function submitHandler() {
        if (!isHex) {
            onSubmit({ layer: LAYER_TYPE.image });

            return;
        }

        const errors = isValid({ width, height });

        if (errors.length === 0) {
            onSubmit({ width, height, layer });
        }
    }

    return (
        <>
            <MenuItem
                name="Back"
                action="back"
                style={{ marginBottom: 24 }}
            />

            <LayerSwitcher
                layer={layer}
                onLayerChange={setLayer}
            >
                {isHex && (
                    <HexMapParamsBlock
                        setWidth={setWidth}
                        setHeight={setHeight}
                        onEnterKeyDown={submitHandler}
                    />
                )}
            </LayerSwitcher>

            <MenuItem
                alignRight
                name="Create map"
                style={{ marginTop: 24 }}
                onClick={submitHandler}
            />
        </>
    );
};
