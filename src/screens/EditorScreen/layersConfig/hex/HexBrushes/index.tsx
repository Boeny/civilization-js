import './styles.css';

import { getClasses } from 'utils';

import { getBrushes, BRUSH_MAP } from '../config';
import { useBrushStore } from '../stores/brushStore';
import { HEX_TYPE } from '../types';

export function HexBrushes() {
    const {
        store: { brush },
        setStore: setBrush,
    } = useBrushStore();

    const handleBrushClick = (type: HEX_TYPE) => {
        setBrush({ brush: brush === null || brush !== type ? type : null });
    };

    const brushes = getBrushes().filter((type) => type !== HEX_TYPE.water);

    return (
        <div style={{ paddingBottom: 80 }}>
            {brushes.map((type) => {
                const { title, color } = BRUSH_MAP[type];
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
