import { createStoreHook } from 'hooks/createStoreHook';

const [useGridObservableStore] = createStoreHook({ isGridTurnedOn: true });

export { useGridObservableStore };
