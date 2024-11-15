import { useState } from 'react';

import { MenuItem } from 'components/Menu/MenuItem';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { IEditorParamsMenuState, IHexMapParams, LAYER_TYPE } from 'types';
import { isValuePositiveNumber } from 'utils';

import { HexMapParamsBlock } from './HexMapParamsBlock';

type HexMapField = keyof IHexMapParams;

function checkSubmitValidity(data: IHexMapParams): HexMapField[] {
    const errorFields: HexMapField[] = [];

    (Object.keys(data) as HexMapField[]).forEach((field) => {
        if (!isValuePositiveNumber(data[field])) {
            errorFields.push(field);
        }
    });

    return errorFields;
}

interface IProps {
    itemName: string;
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenuItem = ({ itemName, onSubmit }: IProps) => {
    const [layer, setLayer] = useState(LAYER_TYPE.image);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    function submitHandler() {
        const errors = checkSubmitValidity({ width, height });

        if (errors.length === 0) {
            onSubmit(layer === LAYER_TYPE.hex ? { width, height, layer } : { layer: LAYER_TYPE.image });
        }
    }

    return (
        <MenuItem
            name={itemName}
            menuStyle={{ height: 383 }}
        >
            <MenuItem
                name="Back"
                action="back"
                style={{ marginBottom: 24 }}
            />

            <Radio
                name="layer"
                value={layer}
                label="Start with:"
                onChange={setLayer}
            >
                <RadioItem
                    value={LAYER_TYPE.image}
                    label="Image layer (you can load image or heightmap to generate hex map)"
                />
                <RadioItem
                    value={LAYER_TYPE.hex}
                    label="Hex map layer"
                >
                    {layer === LAYER_TYPE.hex && (
                        <HexMapParamsBlock
                            width={width}
                            setWidth={setWidth}
                            height={height}
                            setHeight={setHeight}
                            onEnterKeyDown={submitHandler}
                            checkValidity={isValuePositiveNumber}
                        />
                    )}
                </RadioItem>
            </Radio>

            <MenuItem
                alignRight
                name="Create map"
                style={{ marginTop: 24 }}
                onClick={submitHandler}
            />
        </MenuItem>
    );
};
