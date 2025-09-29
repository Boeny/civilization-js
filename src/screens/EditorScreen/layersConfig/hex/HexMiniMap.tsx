import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { usePopup } from 'components/Popup';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { NewHexMapPopup } from './NewHexMapPopup';
import { useHexMapObservableStore } from './stores/hexMapStore';
import { generateEmptyMapData, getHexRadius } from './utils';

const MapComponent = ({ width, title }: IMiniMapProps) => {
    const [{ data }] = useHexMapObservableStore();

    if (!data?.length) {
        return null;
    }

    const hexWidth = width / (data[0].length + 10);
    const hexRadius = getHexRadius(hexWidth);

    return (
        <Canvas
            title={title}
            width={width + hexWidth / 2}
            height={(3 * hexRadius * data.length) / 2 + hexRadius / 2}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: hexWidth, radius: hexRadius, color: HEX_CONFIG[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

export const HexMiniMap = ({ width, title }: IMiniMapProps) => {
    const [{ data, isVisible, opacity }, setHexMap] = useHexMapObservableStore();
    const { showPopup } = usePopup();

    if (!data) {
        const handleClick = async () => {
            try {
                const params = await showPopup<{ width: number; height: number }>(<NewHexMapPopup />);
                setHexMap({ data: generateEmptyMapData(params.width, params.height) });
            } catch (e) {}
        };

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                }}
            >
                <Button onClick={handleClick}>Create Hex Map</Button>
            </div>
        );
    }

    return (
        <>
            <div className="title">
                {title}
                <EyeButton
                    isVisible={isVisible}
                    toggleVisible={() => setHexMap({ isVisible: !isVisible })}
                />
            </div>

            {isVisible && (
                <OpacityBar
                    opacity={opacity}
                    onChange={(newOpacity) => setHexMap({ opacity: newOpacity })}
                />
            )}

            <div className="mini-map">
                {isVisible && (
                    <MapComponent
                        width={width}
                        title={title}
                    />
                )}
            </div>
        </>
    );
};
