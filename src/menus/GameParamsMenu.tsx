interface IParams {
    openParentMenu: () => void;
    onSubmit: () => void;
}
export function GameParamsMenu({ openParentMenu, onSubmit }: IParams) {
    return (
        <>
            <button onClick={openParentMenu}>Back to main menu</button>
            <button onClick={onSubmit}>Play</button>
        </>
    );
}
