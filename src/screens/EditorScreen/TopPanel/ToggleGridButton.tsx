import { memo } from 'react';

import { useStore } from 'hoc/useStore';

const [useGridStore] = useStore({ isGridTurnedOn: false });

// eslint-disable-next-line import/no-unused-modules
export { useGridStore };

export const ToggleGridButton = memo(() => {
    const [{ isGridTurnedOn }, setStore] = useGridStore();

    return (
        <button
            onClick={() => setStore({ isGridTurnedOn: !isGridTurnedOn })}
            style={{ padding: '6px 20px' }}
        >
            Grid: {isGridTurnedOn ? 'On' : 'Off'}
        </button>
    );
});
