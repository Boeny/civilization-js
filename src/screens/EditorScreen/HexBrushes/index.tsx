import './styles.css';

import { getBrushes, HEX_CONFIG } from 'screens/EditorScreen/hexConfig';
import { HEX_TYPE } from 'screens/EditorScreen/types';
import { getClasses } from 'utils';

import { useBrushStore } from '../brushStore';

export function HexBrushes() {
    const [{ brush }, setBrush] = useBrushStore();

    const handleBrushClick = (type: HEX_TYPE) => {
        setBrush({ brush: brush === null || brush !== type ? type : null });
    };

    const brushes = getBrushes();

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
