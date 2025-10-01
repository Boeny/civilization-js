import { useEffect } from 'react';

interface Props {
    setUpPressed: (isPressed: boolean) => void;
    setDownPressed: (isPressed: boolean) => void;
    setLeftPressed: (isPressed: boolean) => void;
    setRightPressed: (isPressed: boolean) => void;
    includeWASD?: boolean;
}
export function useArrowKeys({ setUpPressed, setDownPressed, setLeftPressed, setRightPressed, includeWASD = true }: Props) {
    useEffect(() => {
        function setPressed(key: string, isPressed: boolean) {
            switch (key) {
                case 'w':
                    if (!includeWASD) {
                        return;
                    }
                case 'ArrowUp':
                    setUpPressed(isPressed);

                    return;
                case 's':
                    if (!includeWASD) {
                        return;
                    }
                case 'ArrowDown':
                    setDownPressed(isPressed);

                    return;
                case 'a':
                    if (!includeWASD) {
                        return;
                    }
                case 'ArrowLeft':
                    setLeftPressed(isPressed);

                    return;
                case 'd':
                    if (!includeWASD) {
                        return;
                    }
                case 'ArrowRight':
                    setRightPressed(isPressed);

                    return;
                default:
                    return;
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
