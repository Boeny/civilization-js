import { useStore } from 'hooks/useStore';

const [useGridObservableStore] = useStore({ isGridTurnedOn: true });

export { useGridObservableStore };
