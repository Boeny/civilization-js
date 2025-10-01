import { createStoreHook } from 'hooks/createStoreHook';

const [useGridObservableStore, useGridStore] = createStoreHook({ isGridTurnedOn: true });

export { useGridObservableStore, useGridStore };
