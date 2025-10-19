import { createStoreHook } from 'hooks/createStoreHook';

import { HEX_TYPE } from '../../types';

const [useBrushStore, brushStoreConfig] = createStoreHook<{ brush: HEX_TYPE | null }>({ brush: null });

export { useBrushStore, brushStoreConfig };
