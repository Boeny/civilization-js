import './styles.css';

import { getClasses } from 'utils';

import { HEX_TYPE } from '../../types';

import { getBrushes, BRUSH_MAP } from './config';
import { useBrushStore } from './store';

export function HexBrushes() {
    const {
        store: { brush },
        setStore: setBrush,
    } = useBrushStore();

    const handleBrushClick = (type: HEX_TYPE) => {
        setBrush({ brush: brush === null || brush !== type ? type : null });
    };

    return (
        <div style={{ paddingBottom: 80 }}>
            {getBrushes().map((type) => {
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
