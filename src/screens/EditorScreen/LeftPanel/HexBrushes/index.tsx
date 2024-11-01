import './styles.css';

import { HEX_CONFIG } from 'screens/EditorScreen/hexConfig';
import { useEditorStore } from 'screens/EditorScreen/store';
import { HEX_TYPE } from 'screens/EditorScreen/types';
import { getClasses } from 'utils';

export function HexBrushes() {
    const [{ brush }, setStore] = useEditorStore();

    const handleBrushClick = (type: HEX_TYPE) => {
        if (brush === null || brush !== type) {
            setStore({ brush: type });
        } else {
            setStore({ brush: null });
        }
    };

    const brushes = Object.keys(HEX_CONFIG).map(Number) as HEX_TYPE[];

    return (
        <div style={{ paddingBottom: 80 }}>
            {brushes.map((type) => {
                const { title, color } = HEX_CONFIG[type];
                const isSelected = brush === type;

                return (
                    <div
                        key={type}
                        style={{ background: color }}
                        className={getClasses(['brush', isSelected && 'selected'])}
                        onClick={() => handleBrushClick(type)}
                    >
                        {title}
                    </div>
                );
            })}
        </div>
    );
}
