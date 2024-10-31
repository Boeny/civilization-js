import { Block } from './Block';
import { Popup } from './Popup';

interface IProps {
    children: any;
}
export function MenuPopup({ children }: IProps) {
    return (
        <Popup>
            <Block alignedVertically>{children}</Block>
        </Popup>
    );
}
