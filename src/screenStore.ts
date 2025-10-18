import { createStoreHook } from 'hooks/createStoreHook';
import { SCREEN_TYPE } from 'types';

const [useScreenStore, screenStoreConfig] = createStoreHook<{ screen: SCREEN_TYPE }>({ screen: SCREEN_TYPE.main });

export { useScreenStore, screenStoreConfig };
