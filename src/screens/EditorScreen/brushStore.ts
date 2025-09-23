import { useStore } from 'hooks/useStore';

import { HEX_TYPE } from './types';

const [useBrushStore] = useStore<{ brush: HEX_TYPE | null }>({ brush: null });

export { useBrushStore };
