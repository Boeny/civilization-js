type ContentElement = string | null | undefined | HTMLElement;

export type Content = ContentElement | ContentElement[];

export interface CustormFieldSetElement<T> extends HTMLFieldSetElement {
    name: string;
    value: string;
    getValue: () => T;
    checkSubmitValidity: () => boolean;
    setSubmitError: () => void;
    removeSubmitError: () => void;
}

export type MapData = number[][];

export type MapDataRow = number[];

export interface Attrs {
    id?: string;
    className?: string;
    left?: string | number;
    top?: string | number;
    width?: string | number;
    height?: string | number;
    display?: string;
    margin?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
    padding?: string | number;
    paddingLeft?: string | number;
    paddingRight?: string | number;
    paddingTop?: string | number;
    paddingBottom?: string | number;
    onClick?: (() => void) | (() => void)[];
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseMove?: () => void;
}
