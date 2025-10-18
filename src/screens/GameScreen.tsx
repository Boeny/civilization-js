import './styles.css';
import { MenuItem } from 'components/Menu/MenuItem';

export function GameScreen() {
    return (
        <div
            id="game-screen"
            className="screen"
        >
            <MenuItem
                title="Open menu"
                action="back"
            />
        </div>
    );
}
