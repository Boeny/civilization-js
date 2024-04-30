import { HexMapContainer } from "./HexMap/HexMap";
import { ImageMapContainer } from "./ImageMap/ImageMap";

interface Params {
    width: number;
    height: number;
}

export function Map({width, height}: Params) {
    return [
        ImageMapContainer({width, height}),
        HexMapContainer({width, height}),
    ]
}
