import { createStoreHook } from 'hooks/createStoreHook';

const [useGridObservableStore, gridStoreConfig] = createStoreHook({ isGridTurnedOn: true });

export { useGridObservableStore, gridStoreConfig };
