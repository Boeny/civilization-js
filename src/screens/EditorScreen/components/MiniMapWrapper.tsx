import { PropsWithChildren, ReactNode, useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';

import { EyeButton } from './EyeButton';
import { OpacityBar } from './OpacityBar';

type Props = PropsWithChildren & {
    title: string;
    map: ReactNode;
} & ({ setVisible?: undefined } | { isVisible: boolean; setVisible: (v: boolean) => void }) &
    ({ setOpacity?: undefined } | { opacity: number; setOpacity: (v: number) => void });

export function MiniMapWrapper({ title, map, children, ...props }: Props) {
    const [isOpened, setOpened] = useState(true);

    return (
        <>
            <div className="title">
                {title}

                <Block
                    noGaps
                    alignCenter
                >
                    {map && props.setVisible && (
                        <EyeButton
                            isVisible={props.isVisible}
                            toggleVisible={() => props.setVisible(!props.isVisible)}
                        />
                    )}

                    {(map || children) && (
                        <Button
                            style={{ padding: 0, width: 25, height: 25, marginLeft: 3 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpened(!isOpened);
                            }}
                        >
                            {isOpened ? '-' : '+'}
                        </Button>
                    )}
                </Block>
            </div>

            {isOpened && (
                <>
                    {map && props.setOpacity && (
                        <OpacityBar
                            opacity={props.opacity}
                            onChange={props.setOpacity}
                        />
                    )}

                    {map && <div className="mini-map">{map}</div>}

                    {children}
                </>
            )}
        </>
    );
}
