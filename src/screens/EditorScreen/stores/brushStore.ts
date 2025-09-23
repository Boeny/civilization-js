import { useStore } from 'hooks/useStore';

import { HEX_TYPE } from '../types';

const [useBrushObservableStore] = useStore<{ brush: HEX_TYPE | null }>({ brush: null });

export { useBrushObservableStore };
