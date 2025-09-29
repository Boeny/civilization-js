import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';

import { HexMapParamsBlock } from './HexMapParamsBlock';

type Props = {
    onClose: () => void;
    onSubmit: (width: number, height: number) => void;
};

export const NewHexMapParams = ({ onSubmit, onClose }: Props) => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [isError, setError] = useState(false);

    const handleSubmit = () => {
        onSubmit(width, height);
    };

    return (
        <>
            <HexMapParamsBlock
                width={width}
                height={height}
                setWidth={setWidth}
                setHeight={setHeight}
                onEnterKeyDown={handleSubmit}
                isError={isError}
                setError={setError}
            />

            <Block
                align
                noPadding
            >
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    disabled={isError}
                    onClick={handleSubmit}
                >
                    Create map
                </Button>
            </Block>
        </>
    );
};
