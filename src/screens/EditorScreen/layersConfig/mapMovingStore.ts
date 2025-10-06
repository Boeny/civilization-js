import { createStoreHook } from 'hooks/createStoreHook';
import { getZeroVector } from 'utils';

const [useMapMovementParamsStore, mapMovementParamsConfig] = createStoreHook({
    position: getZeroVector(),
    zoom: 1,
    imageSize: getZeroVector(),
});

export { useMapMovementParamsStore, mapMovementParamsConfig };
