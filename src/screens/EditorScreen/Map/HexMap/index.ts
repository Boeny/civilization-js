import './HexMap.css'
import { Canvas } from 'modules/renderer'
import { observer, trigger } from 'modules/observer'
import { LAYER_TYPE, MapData } from 'screens/EditorScreen/types'
import { HEX_MAP_UPDATE_EVENT, HEX_MINI_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT, LAYER_CONFIG } from '../../const'
import { getHexRadius, getMapCoordinatesFromCursor } from 'screens/EditorScreen/utils'
import { editorScreenStore } from '../../store'
import { Hex } from './Hex'

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

interface IParams extends IToggleParams {
    hexMapData: MapData
    hexWidth: number
    isGridTurnedOn: boolean
}
function HexMap({ width, height, hexMapData, hexWidth, isGridTurnedOn, onMouseDown, onMouseMove, onMouseUp}: IParams) {
    return Canvas(
        (ctx) => {
            const hexRadius = getHexRadius(hexWidth)

            for (let y = 0; y < hexMapData.length; y += 1) {
                if (y * hexRadius * 1.5 > height) break

                const row = hexMapData[y]

                for (let x = 0; x < row.length; x += 1) {
                    if (x * hexWidth > width) break

                    Hex({ctx, x, y, width: hexWidth, radius: hexRadius, type: row[x], isGridTurnedOn})
                }
            }
        },
        {
            id: 'hex-map',
            width,
            height,
            style: {zIndex: LAYER_CONFIG[LAYER_TYPE.hex].zIndex},
            onMouseDown,
            onMouseMove,
            onMouseUp,
        }
    )
}


interface IToggleParams extends ILayerChangeParams {
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
}
const HexMapToggleObserver = observer(HEX_MAP_UPDATE_EVENT, (params: IToggleParams) => {
    const {hexMapData, isGridTurnedOn, hexWidth} = editorScreenStore

    if (!hexMapData.value) return null

    return HexMap({
        ...params,
        hexWidth: hexWidth.value,
        hexMapData: hexMapData.value,
        isGridTurnedOn: isGridTurnedOn.value,
    })
})


function drawHex(ctx: CanvasRenderingContext2D, x: number, y: number, params: ILayerChangeParams) {
    const {width: mapWidth, height: mapHeight} = params
    const {brush, hexMapData, isGridTurnedOn, hexWidth} = editorScreenStore
    const hexRadius = getHexRadius(hexWidth.value)
    const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth.value, hexRadius)

    if (mapX < 0 || mapY < 0 || mapX >= mapWidth || mapY >= mapHeight) return
    if (hexMapData.getHex(mapX, mapY) === brush.value) return

    Hex({ctx, x: mapX, y: mapY, width: hexWidth.value, radius: hexRadius, type: brush.value!, isGridTurnedOn: isGridTurnedOn.value})

    hexMapData.setHex(mapX, mapY, brush.value!)
    trigger(HEX_MINI_MAP_UPDATE_EVENT)
}

interface ILayerChangeParams {
    width: number
    height: number
}
export const HexMapLayerChangeObserver = observer(LAYER_CHANGE_EVENT, (params: ILayerChangeParams) => {
    const {layer, brush, isPainting} = editorScreenStore

    return HexMapToggleObserver({
        ...params,
        ...(layer.value === LAYER_TYPE.hex ? {
            onMouseDown: (ctx, x, y) => {
                if (brush.value !== null) {
                    drawHex(ctx, x, y, params)
                    isPainting.value = true
                }
            },
            onMouseMove: (ctx, x, y) => {
                if (isPainting.value) drawHex(ctx, x, y, params)
            },
            onMouseUp: () => {
                isPainting.value = false
            },
        } : {})
    })
})
