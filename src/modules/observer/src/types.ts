import { IAttrs, Element } from "modules/renderer";

export type FComponent<T> = (params: T) => Element

export interface IObserverAttr<T> {
    name: keyof IAttrs
    value: (params: T) => IAttrs[keyof IAttrs]
}
