import { uploadFile } from './utils';

interface IProps {
    onDataUpdate: (data: HTMLImageElement) => void;
}
export function LoadImageButton({ onDataUpdate }: IProps) {
    const handleClick = async () => {
        const data = await uploadFile();

        if (data) {
            onDataUpdate(data);
        }
    };

    return <button onClick={handleClick}>Load Image</button>;
}
