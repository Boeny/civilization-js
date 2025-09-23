import { useStore } from 'hooks/useStore';
import { SCREEN_TYPE } from 'types';

type IStore = {
    screen: SCREEN_TYPE;
};

const [useScreenObservableStore, useScreenStore] = useStore<IStore>({ screen: SCREEN_TYPE.main });

export { useScreenObservableStore, useScreenStore };
