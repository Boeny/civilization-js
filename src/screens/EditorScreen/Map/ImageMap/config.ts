export const filePickerConfig = {
    types: [
        {
            description: 'Images',
            accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

export const zoomConfig = {
    pixelsInDelta: 40,
    pixelsAddition: 20,
    minWidth: 1000,
    maxWidth: 1000000,
};
