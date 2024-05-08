import './HexMiniMap.css'
import { HEX_MINI_MAP_UPDATE_EVENT } from 'screens/EditorScreen/const'
import { observable } from 'hoc/observable'
import { Canvas } from 'components/base/Canvas'
import { Hex } from 'screens/EditorScreen/Map/HexMap/Hex'
import { editorScreenStore } from 'screens/EditorScreen/store'
import { MapData } from 'screens/EditorScreen/types'
import { getHexRadius } from 'screens/EditorScreen/utils'

interface Params extends ObservableParams {
    mapData: MapData
}
function HexMiniMap({mapData, width, title}: Params) {
    const hexWidth = width / mapData[0].length
    const hexRadius = getHexRadius(hexWidth)

    return Canvas(
        (ctx) => {
            mapData.forEach((row, y) => {
                row.forEach((type, x) => {
                    Hex({ctx, x, y, width: hexWidth, radius: hexRadius, type})
                })
            })
        },
        {
            className: 'hex-mini-map',
            title,
            width: width + hexWidth / 2,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius / 2,
        }
    )
}

interface ObservableParams {
    width: number
    title: string
}
export const HexMiniMapToggleObservable = observable(HEX_MINI_MAP_UPDATE_EVENT, ({width, title}: ObservableParams) => {
    const {hexMapData} = editorScreenStore
    if (!hexMapData.value) return null

    return HexMiniMap({mapData: hexMapData.value, width, title})
})