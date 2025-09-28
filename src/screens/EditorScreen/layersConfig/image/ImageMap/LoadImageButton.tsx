import { Button } from 'components/Button';

import { uploadFile } from './utils';

interface IProps {
    disabled?: boolean;
    onDataUpdate: (data: HTMLImageElement) => void;
}
export function LoadImageButton({ disabled, onDataUpdate }: IProps) {
    const handleClick = async () => {
        const data = await uploadFile();

        if (data) {
            onDataUpdate(data);
        }
    };

    return (
        <Button
            disabled={disabled}
            onClick={handleClick}
        >
            Load Image
        </Button>
    );
}
