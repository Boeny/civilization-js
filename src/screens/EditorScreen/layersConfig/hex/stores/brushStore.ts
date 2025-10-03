import { createStoreHook } from 'hooks/createStoreHook';

import { HEX_TYPE } from '../types';

const [useBrushObservableStore, brushStoreConfig] = createStoreHook<{ brush: HEX_TYPE | null }>({ brush: null });

export { useBrushObservableStore, brushStoreConfig };
