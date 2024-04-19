import { Block } from "components/Block/Block";
import { range } from "utils";
import { HexRow } from "./HexRow";

interface Params {
    width: number;
    height: number;
    id?: string;
}

export function Map({width, height, ...params}: Params): HTMLElement {
    return Block(
        range(height).map((y) => HexRow(y, width)),
        params,
    )
}
