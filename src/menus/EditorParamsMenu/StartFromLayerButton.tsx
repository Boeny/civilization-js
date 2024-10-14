import { LAYER_TYPE } from 'screens/EditorScreen/types';

interface IProps {
    layer: LAYER_TYPE;
    setLayer: (layer: LAYER_TYPE) => void;
}
export const StartFromLayer = ({ layer, setLayer }: IProps) => {
    const isImageLayer = layer === LAYER_TYPE.image;

    return (
        <button onClick={() => setLayer(isImageLayer ? LAYER_TYPE.hex : LAYER_TYPE.image)}>
            Start from {isImageLayer ? 'image' : 'hex'} map layer
        </button>
    );
};
