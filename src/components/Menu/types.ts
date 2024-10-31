export type Children = JSX.Element | JSX.Element[];
export type MenuItemComponent = (props: { children: Children | string; onClick: () => void }) => JSX.Element;
