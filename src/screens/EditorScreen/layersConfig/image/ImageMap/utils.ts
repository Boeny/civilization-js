import { FILE_PICKER_CONFIG } from './config';

export async function uploadFile(): Promise<HTMLImageElement | null> {
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
                resolve(img);
            };
        });
    } catch (e) {
        console.error(e);

        return null;
    }
}
