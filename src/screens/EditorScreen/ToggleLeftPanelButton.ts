import { LAYER_TYPE } from 'const';
import { LAYER_CHANGE_EVENT } from './const';
import { showOnLayer } from 'hoc/showOnLayer';
import { ArrowButton } from 'components/ArrowButton';

export const ToggleLeftPanelButtonContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, ArrowButton)
