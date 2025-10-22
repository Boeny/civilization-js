import { useCallback, useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { useKey } from 'hooks/useKey';
import { IPoint } from 'types';
import { getVector } from 'utils';

import { useKeyBinding } from '../../hooks/useKeyBinding';
import { CREATE_MODE } from '../../types';

import { HexMapParamsBlock } from './HexMapParamsBlock';

type Props = {
    isSelected: boolean;
    hasImageMap: boolean;
    onSubmit: (mapSize: IPoint, creationMode: CREATE_MODE, shouldCreateWaterMap: boolean) => void;
    createMapKeyBinding: string[];
};

export const NewHexMapParams = ({ isSelected, hasImageMap, onSubmit, createMapKeyBinding }: Props) => {
    const [mapSize, setMapSize] = useState(getVector(100, 100));
    const [creationMode, setCreationMode] = useState(CREATE_MODE.fitScreen);
    const [isError, setError] = useState(false);
    const [shouldCreateWaterMap, setCreationWaterMap] = useState(false);

    const handleSubmit = useCallback(() => {
        onSubmit(mapSize, creationMode, shouldCreateWaterMap);
    }, [creationMode, mapSize, shouldCreateWaterMap, onSubmit]);

    const handleSubmitByKey = useKeyBinding(createMapKeyBinding, isSelected, handleSubmit);

    useKey(handleSubmitByKey);

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
                    Create map ({createMapKeyBinding})
                </Button>
            </Block>

            <Checkbox
                label="create water map"
                value={shouldCreateWaterMap}
                onChange={setCreationWaterMap}
            />
        </>
    );
};
