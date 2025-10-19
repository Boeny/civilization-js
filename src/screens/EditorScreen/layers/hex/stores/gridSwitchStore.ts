import { createStoreHook } from 'hooks/createStoreHook';

const [useGridStore, gridStoreConfig] = createStoreHook({ isGridTurnedOn: true });

export { useGridStore, gridStoreConfig };
