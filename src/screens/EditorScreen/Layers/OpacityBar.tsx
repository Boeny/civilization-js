import { memo } from 'react';

import { Bar } from 'components/Bar';
import { useStore } from 'hooks/useStore';

import { getLayersObject } from '../layersConfig';
import { LAYER_TYPE } from '../types';

const [useOpacityStore] = useStore({ opacity: getLayersObject(1) });

export { useOpacityStore };

interface IProps {
    layer: LAYER_TYPE;
}
export const OpacityBar = memo(({ layer }: IProps) => {
    const [{ opacity }, setStore] = useOpacityStore();

    return (
        <Bar
            width={162}
            buttonSize={16}
            defaultValue={opacity[layer]}
            onChange={(value) => setStore({ opacity: { ...opacity, [layer]: value } })}
        />
    );
});
