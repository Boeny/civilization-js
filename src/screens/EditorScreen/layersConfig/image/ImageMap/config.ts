export const FILE_PICKER_CONFIG = {
    types: [
        {
            description: 'Images',
            accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

export const ZOOM_CONFIG = {
    pixelsInDelta: 40,
    pixelsAddition: 0,
    minWidth: 300,
    maxWidth: 1000000,
};
