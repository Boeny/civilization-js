type ContentElement = string | null | undefined | HTMLElement;

export type Content = ContentElement | ContentElement[] | ContentElement[][];

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
