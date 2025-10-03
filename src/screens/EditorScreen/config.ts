import { useBrushStore } from './layersConfig/hex/stores/brushStore';
import { useGridStore } from './layersConfig/hex/stores/gridSwitchStore';
import { useHexMapStore } from './layersConfig/hex/stores/hexMapStore';
import { useImageMapStore } from './layersConfig/image/imageMapStore';
import { useLayerStore } from './layerStore';

export const editorScreenResetStores = [useLayerStore, useHexMapStore, useImageMapStore, useBrushStore, useGridStore];
