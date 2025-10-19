import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { IPoint } from 'types';
import { getVector } from 'utils';

import { CREATE_MODE } from '../../types';

import { HexMapParamsBlock } from './HexMapParamsBlock';

type Props = {
    hasImageMap: boolean;
    onSubmit: (mapSize: IPoint, creationMode: CREATE_MODE) => void;
};

export const NewHexMapParams = ({ hasImageMap, onSubmit }: Props) => {
    const [mapSize, setMapSize] = useState(getVector(100, 100));
    const [creationMode, setCreationMode] = useState(CREATE_MODE.fitScreen);
    const [isError, setError] = useState(false);

    const handleSubmit = () => {
        onSubmit(mapSize, creationMode);
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

            <Radio
                name="hexMapCreationMode"
                value={creationMode}
                onChange={setCreationMode}
            >
                {(params) => (
                    <>
                        {hasImageMap && (
                            <RadioItem
                                {...params}
                                label="Fit the image"
                                value={CREATE_MODE.fitImage}
                            />
                        )}
                        <RadioItem
                            {...params}
                            value={CREATE_MODE.fitScreen}
                            label="Fit the screen"
                        />
                        <RadioItem
                            {...params}
                            value={CREATE_MODE.center}
                            label="Screen center"
                        />
                        <RadioItem
                            {...params}
                            value={CREATE_MODE.free}
                            label="Free transform"
                        />
                    </>
                )}
            </Radio>

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
