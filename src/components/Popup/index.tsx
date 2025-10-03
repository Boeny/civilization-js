import './styles.css';
import { CSSProperties, ReactNode, useEffect } from 'react';

import { Layout } from 'components/Layout';
import { createStoreHook } from 'hooks/createStoreHook';
import { getClasses } from 'utils';

type PopupContextProps<T> = {
    showPopup: <U>(content: ReactNode) => Promise<U>;
    onAccept: (value?: T) => void;
    onReject: () => void;
};

const context: PopupContextProps<any> = {
    showPopup: () => {},
    onAccept: () => {},
    onReject: () => {},
} as any;

const [usePopupObservableStore] = createStoreHook<{ popupContent: ReactNode }>({
    popupContent: null,
});

interface Props {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    testId?: string;
}
export function PopupComponent({ children, className, style, testId }: Props) {
    return (
        <Layout>
            <div
                className={getClasses(['popup', className])}
                style={style}
                data-testid={testId}
            >
                {children}
            </div>
        </Layout>
    );
}

export function Popup() {
    const {
        store: { popupContent },
        setStore: setPopup,
    } = usePopupObservableStore();

    useEffect(() => {
        const params = { resolvePopup: () => {}, rejectPopup: () => {} } as any;

        const showPopup = <T,>(content: ReactNode) => {
            return new Promise<T>((resolve, reject) => {
                setPopup({ popupContent: content });
                params.resolvePopup = resolve;
                params.rejectPopup = () => reject();
            });
        };

        const closePopup = () => {
            setPopup({ popupContent: null });
            params.resolvePopup = null;
            params.rejectPopup = null;
        };

        const onAccept = <T,>(value?: T) => {
            params.resolvePopup?.(value);
            closePopup();
        };

        const onReject = () => {
            params.rejectPopup?.();
            closePopup();
        };

        Object.assign(context, {
            showPopup,
            onAccept,
            onReject,
        });
    }, []);

    if (!popupContent) {
        return null;
    }

    return <PopupComponent>{popupContent}</PopupComponent>;
}

// eslint-disable-next-line import/no-unused-modules
export function usePopup<T = undefined>(): PopupContextProps<T> {
    return context;
}
