import { Block } from 'components/Block';

interface IParams {
    openParentMenu: () => void;
}
export const OptionsMenu = ({ openParentMenu }: IParams) => {
    return (
        <>
            <button onClick={openParentMenu}>Back to main menu</button>
            <Block />
            <button onClick={openParentMenu}>Apply</button>
        </>
    );
};
