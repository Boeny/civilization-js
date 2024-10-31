import { memo } from 'react';

// import { LeftPanelContainer } from './LeftPanel';
// import { Map } from './Map';
// import { RIGHT_PANEL_WIDTH, RightPanelToggleObserver } from './RightPanel';
// import { TopPanel } from './TopPanel';
// import { IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';

// import { DEFAULT_STATE } from './store';
// import { LAYER_TYPE } from './types';
// import { generateEmptyMapData } from './utils';

const TOP_PANEL_HEIGHT = 32;

// interface IProps extends IEditorParamsMenuState {
// }
//{ width, height, hexWidth: defaultHexWidth, layer: defaultLayer }: IProps
export const EditorScreen = memo(() => {
    // const [brush, setBrush] = useState(DEFAULT_STATE.brush);
    // const [layer, setLayer] = useState(defaultLayer);
    // const [isPainting, setPainting] = useState(DEFAULT_STATE.isPainting);
    // const [hexWidth, setHexWidth] = useState(defaultHexWidth);
    // const [hexMapData, setHexMapData] = useState(() =>
    //     defaultLayer === LAYER_TYPE.hex ? generateEmptyMapData(width, height) : DEFAULT_STATE.hexMapData,
    // );
    // const [imageMapData, setImageMapData] = useState(DEFAULT_STATE.imageMapData);
    // const [isGridTurnedOn, setGridTurnedOn] = useState(DEFAULT_STATE.isGridTurnedOn);
    // const [isLeftPanelOpened, setLeftPanelOpened] = useState(DEFAULT_STATE.isLeftPanelOpened);
    // const [isRightPanelOpened, setRightPanelOpened] = useState(DEFAULT_STATE.isRightPanelOpened);

    return (
        <div
            className="screen"
            style={{ paddingTop: TOP_PANEL_HEIGHT }}
        >
            {/* <Map
                width={window.innerWidth}
                height={window.innerHeight - TOP_PANEL_HEIGHT}
            />
            <TopPanel
                rightPanelWidth={RIGHT_PANEL_WIDTH}
                style={{ height: TOP_PANEL_HEIGHT }}
            />
            <LeftPanelContainer />
            <RightPanelToggleObserver /> */}
        </div>
    );
});
