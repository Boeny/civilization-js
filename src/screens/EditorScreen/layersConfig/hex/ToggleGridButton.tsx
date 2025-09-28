import { useGridObservableStore } from './stores/gridSwitchStore';

export const ToggleGridButton = () => {
    const [{ isGridTurnedOn }, setGridTurnedOn] = useGridObservableStore();

    return (
        <button
            onClick={() => setGridTurnedOn({ isGridTurnedOn: !isGridTurnedOn })}
            style={{ padding: '6px 20px' }}
        >
            Grid: {isGridTurnedOn ? 'On' : 'Off'}
        </button>
    );
};
