import { getVector } from 'utils';

export const TOP_PANEL_HEIGHT = 32;

const RIGHT_PANEL = { innerWidth: 200, padding: 20, width: 0 };
RIGHT_PANEL.width = RIGHT_PANEL.innerWidth + RIGHT_PANEL.padding * 2;

export { RIGHT_PANEL };

export const ZOOM_CONFIG = {
    pixelsInDelta: 50,
    pixelsAddition: 0,
    minWidth: 500,
    maxWidth: 1000000,
};

export const KEY_PAN_SPEED = 40;
export const WHEEL_PAN_SPEED = 5;
export const BORDER_SIZE = getVector(200, 200);
