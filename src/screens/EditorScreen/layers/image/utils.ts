const FILE_PICKER_CONFIG = {
    types: [
        {
            description: 'Images',
            accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

export async function uploadImage(): Promise<HTMLImageElement | null> {
    try {
        const [imageFile] = await window.showOpenFilePicker(FILE_PICKER_CONFIG);

        const file = await imageFile.getFile();
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.error('Cannot load image');
        };

        return new Promise<HTMLImageElement>((resolve) => {
            img.onload = function () {
                URL.revokeObjectURL(img.src);
                img.name = imageFile.name;
                resolve(img);
            };
        });
    } catch (e) {
        console.error(e);

        return null;
    }
}
