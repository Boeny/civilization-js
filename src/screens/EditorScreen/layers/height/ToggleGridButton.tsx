import { useGridStore } from './stores/gridSwitchStore';

export const ToggleGridButton = () => {
    const {
        store: { isGridTurnedOn },
        setStore: setGridTurnedOn,
    } = useGridStore();

    return (
        <button
            onClick={() => setGridTurnedOn({ isGridTurnedOn: !isGridTurnedOn })}
            style={{ padding: '6px 20px' }}
        >
            Grid: {isGridTurnedOn ? 'On' : 'Off'}
        </button>
    );
};
