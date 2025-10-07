import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { IPoint } from 'types';
import { getVector } from 'utils';

import { HexMapParamsBlock } from './HexMapParamsBlock';

type Props = {
    onSubmit: (mapSize: IPoint) => void;
};

export const NewHexMapParams = ({ onSubmit }: Props) => {
    const [mapSize, setMapSize] = useState(getVector(100, 100));
    const [isError, setError] = useState(false);

    const handleSubmit = () => {
        onSubmit(mapSize);
    };

    return (
        <>
            <HexMapParamsBlock
                mapSize={mapSize}
                setMapSize={setMapSize}
                onEnterKeyDown={handleSubmit}
                isError={isError}
                setError={setError}
            />

            <Block
                alignCenter
                noPadding
            >
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
