import { ReactNode } from 'react';

import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { LAYER_TYPE } from 'types';

interface IProps {
    layer: LAYER_TYPE;
    children: ReactNode;
    onLayerChange: (value: LAYER_TYPE) => void;
}
export function LayerSwitcher({ layer, children, onLayerChange }: IProps) {
    return (
        <Radio
            name="layer"
            value={layer}
            label="Start with:"
            onChange={onLayerChange}
        >
            {(props) => (
                <>
                    <RadioItem
                        {...props}
                        value={LAYER_TYPE.image}
                        label="Image layer (you can load image or heightmap to generate hex map)"
                    />
                    <RadioItem
                        {...props}
                        value={LAYER_TYPE.hex}
                        label="Hex map layer"
                    >
                        {children}
                    </RadioItem>
                </>
            )}
        </Radio>
    );
}
