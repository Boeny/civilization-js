import { createStoreHook } from 'hooks/createStoreHook';
import { SCREEN_TYPE } from 'types';

type IStore = {
    screen: SCREEN_TYPE;
};

const [useScreenStore, screenStoreConfig] = createStoreHook<IStore>({ screen: SCREEN_TYPE.main });

export { useScreenStore, screenStoreConfig };
