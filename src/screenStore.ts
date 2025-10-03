import { createStoreHook } from 'hooks/createStoreHook';
import { SCREEN_TYPE } from 'types';

type IStore = {
    screen: SCREEN_TYPE;
};

const [useScreenObservableStore, screenStoreConfig] = createStoreHook<IStore>({ screen: SCREEN_TYPE.main });

export { useScreenObservableStore, screenStoreConfig };
