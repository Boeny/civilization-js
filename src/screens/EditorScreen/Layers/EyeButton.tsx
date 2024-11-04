import { memo, MouseEvent } from 'react';

import eyeClosed from 'assets/eye-closed.svg';
import eyeOpened from 'assets/eye-opened.svg';
import { Svg } from 'components/Svg';
import { useStore } from 'hooks/useStore';

import { getLayersObject } from '../layersConfig';
import { LAYER_TYPE } from '../types';

const [useVisibilityStore] = useStore({ visibility: getLayersObject(true) });

export { useVisibilityStore };

interface IProps {
    layer: LAYER_TYPE;
}
export const EyeButton = memo(({ layer }: IProps) => {
    const [{ visibility }, setStore] = useVisibilityStore();
    const isVisible = visibility[layer];

    const toggleEye = (e: MouseEvent) => {
        e.stopPropagation();
        setStore({ visibility: { ...visibility, [layer]: !isVisible } });
    };

    const image = isVisible ? eyeOpened : eyeClosed;

    return (
        <div
            className="eye"
            onClick={toggleEye}
        >
            <Svg
                src={image}
                width={20}
            />
        </div>
    );
});
