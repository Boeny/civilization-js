/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

interface IParams {
    setUpPressed: (isPressed: boolean) => void;
    setDownPressed: (isPressed: boolean) => void;
    setLeftPressed: (isPressed: boolean) => void;
    setRightPressed: (isPressed: boolean) => void;
}
export function useArrowKeys({ setUpPressed, setDownPressed, setLeftPressed, setRightPressed }: IParams) {
    useEffect(() => {
        function setPressed(key: string, isPressed: boolean) {
            switch (key) {
                case 'w':
                case 'ArrowUp':
                    setUpPressed(isPressed);
                    break;
                case 's':
                case 'ArrowDown':
                    setDownPressed(isPressed);
                    break;
                case 'a':
                case 'ArrowLeft':
                    setLeftPressed(isPressed);
                    break;
                case 'd':
                case 'ArrowRight':
                    setRightPressed(isPressed);
                    break;
                default:
                    break;
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            setPressed(e.key, true);
        }
        function handleKeyUp(e: KeyboardEvent) {
            setPressed(e.key, false);
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
}
