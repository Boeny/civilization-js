import { createStoreHook } from 'hooks/createStoreHook';

import { HEX_TYPE } from '../types';

const [useBrushObservableStore] = createStoreHook<{ brush: HEX_TYPE | null }>({ brush: null });

export { useBrushObservableStore };
