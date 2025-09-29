import { Popup } from 'components/Popup';
import { NewHexMapParams } from './NewHexMapParams';
import { useState } from 'react';

type Props = {
    show: boolean;
    onSubmit: (width: number, height: number) => void;
};
export function NewHexMapPopup({ show, onSubmit }: Props) {
    const [] = useState(show);

    return (
        <Popup>
            <NewHexMapParams
                onSubmit={(width, height) => {
                    onSubmit(width, height);
                }}
            />
        </Popup>
    );
}
