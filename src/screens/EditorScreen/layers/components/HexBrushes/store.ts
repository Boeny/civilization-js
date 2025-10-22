import { createStoreHook } from 'hooks/createStoreHook';

import { HEX_TYPE } from '../../types';

const [useBrushStore, brushStoreConfig] = createStoreHook<{ brush: HEX_TYPE | null; size: number }>({ brush: null, size: 1 });

export { useBrushStore, brushStoreConfig };
