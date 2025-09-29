import { usePopup } from 'components/Popup';

import { NewHexMapParams } from './NewHexMapParams';

export function NewHexMapPopup() {
    const { onAccept, onReject } = usePopup<{ width: number; height: number }>();

    return (
        <NewHexMapParams
            onSubmit={(width, height) => onAccept({ width, height })}
            onClose={onReject}
        />
    );
}
