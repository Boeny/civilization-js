import './styles.css';

import { getClasses } from 'utils';

import { getBrushes, HEX_CONFIG } from '../hexConfig';
import { useBrushObservableStore } from '../stores/brushStore';
import { HEX_TYPE } from '../types';

export function HexBrushes() {
    const {
        store: { brush },
        setStore: setBrush,
    } = useBrushObservableStore();

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
