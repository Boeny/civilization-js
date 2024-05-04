import './HexMap.css'

import { MapData } from "types"
import { HEX_TYPE, LAYER_TYPE } from 'const'
import { HEX_MAP_UPDATE_EVENT, HEX_MINI_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from 'screens/EditorScreen/const'
import { trigger } from 'utils'
import { getHexRadius, getMapCoordinatesFromCursor } from 'logic'

import { getHexMapData, getHexFromHexMapData, setMapPointAction } from 'state/mapActions'
import { isPainting, setPainting } from 'state/paintingActions'
import { getBrush } from 'state/brushActions'
import { isGridTurnedOn } from 'state/gridStatusActions'
import { getLayer } from 'state/layerActions'

import { observable, observableAttrs } from 'hoc/observable'
import { Canvas } from 'components/base/Canvas'
import { Hex } from './Hex'
import { getScreenParams } from 'state/screenParamsActions'

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

interface Params extends ContainerParams {
    hexMapData: MapData
    hexWidth: number
    isGridTurnedOn: boolean
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
}

function HexMap({ width, height, hexMapData, hexWidth, isGridTurnedOn, onMouseDown, onMouseMove, onMouseUp}: Params) {
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
            onMouseDown,
            onMouseMove,
            onMouseUp,
        }
    )
}

const HexMapLayerChangeContainer = observableAttrs<Params>(
    LAYER_CHANGE_EVENT,
    HexMap,
    [
        {name: 'onMouseDown', value: ({onMouseDown}) => getLayer() === LAYER_TYPE.hex ? onMouseDown : undefined},
        {name: 'onMouseMove', value: ({onMouseMove}) => getLayer() === LAYER_TYPE.hex ? onMouseMove : undefined},
        {name: 'onMouseUp', value: ({onMouseUp}) => getLayer() === LAYER_TYPE.hex ? onMouseUp : undefined},
    ]
)


function drawHex(ctx: CanvasRenderingContext2D, brushType: HEX_TYPE, x: number, y: number, mapWidth: number, mapHeight: number, hexWidth: number) {
    const hexRadius = getHexRadius(hexWidth)

    const [mapX, mapY] = getMapCoordinatesFromCursor(x, y, hexWidth, hexRadius)
    if (mapX < 0 || mapY < 0 || mapX >= mapWidth || mapY >= mapHeight) return

    if (getHexFromHexMapData(mapX, mapY) === brushType) return

    Hex({ctx, x: mapX, y: mapY, width: hexWidth, radius: hexRadius, type: brushType, isGridTurnedOn: isGridTurnedOn()})

    setMapPointAction(mapX, mapY, brushType)
    trigger(HEX_MINI_MAP_UPDATE_EVENT)
}

interface ContainerParams {
    width: number
    height: number
}

export const HexMapContainer = observable(HEX_MAP_UPDATE_EVENT, (params: ContainerParams) => {
    const hexMapData = getHexMapData()
    const {width: mapWidth, height: mapHeight, hexWidth} = getScreenParams()!

    return HexMapLayerChangeContainer({
        hexMapData,
        hexWidth,
        isGridTurnedOn: isGridTurnedOn(),
        ...params,
        onMouseDown: (ctx, x, y) => {
            const brushType = getBrush()

            if (brushType !== null) {
                drawHex(ctx, brushType, x, y, mapWidth, mapHeight, hexWidth)
                setPainting(true)
            }
        },
        onMouseMove: (ctx, x, y) => {
            if (isPainting()) {
                drawHex(ctx, getBrush()!, x, y, mapWidth, mapHeight, hexWidth)
            }
        },
        onMouseUp: () => {
            setPainting(false)
        },
    })
})
