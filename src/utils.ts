import { Attrs, Content } from "types";

export function insertContent(container: HTMLElement, content: Content) {
    if (Array.isArray(content))
        content.flat().forEach(item => insertContent(container, item));
    else if (typeof content === 'object' && content)
        container.appendChild(content);
    else if (content)
        container.innerHTML = content;
}

export function body(content: Content, reset = false) {
    if (reset) document.body.innerHTML = '';
    insertContent(document.body, content);
}

export function onLoad(callback: () => void) {
    document.addEventListener('DOMContentLoaded', callback);
}

export function forEach(n: number, callback: (i: number) => boolean | void) {
    for (let i = 0; i < n; i += 1) {
        if (callback(i) === false) break;
    }
}

export async function asyncForEach(n: number, callback: (i: number) => void) {
    for (let i = 0; i < n; i += 1) {
        await callback(i);
    }
}

export async function asyncMap<T, Q>(array: T[], callback: (el: T, i: number) => Promise<Q>): Promise<Q[]> {
    const result: Q[] = [];

    for (let i = 0; i < array.length; i += 1) {
        result.push(await callback(array[i], i));
    }

    return result;
}

export function range(from: number, to?: number): number[] {
    const count = to ? to - from : from;

    return [...Array(count)].map((item, i) => i);
}

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value);
}

export function getAsyncCallback<T>(callback: () => T, timeout = 0): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(callback()), timeout);
    });
}

export function trigger(event: string) {
    document.dispatchEvent(new Event(event));
}

function getStyleAttr(attr: string | number): string {
    return typeof attr === 'number' ? `${attr}px` : attr;
}

function applyStyleAttr(element: HTMLElement, param: string | number | undefined, styleAttr: string) {
    if (param !== undefined) (element.style as any)[styleAttr] = getStyleAttr(param);
}

export function adaptAndSetAttrs<T>(element: HTMLElement, params: T, attrs: {name: string, value: (params: T) => any}[]) {
    const adaptedAttrs = attrs.reduce<Attrs>((acc, attr) => {
        (acc as any)[attr.name] = attr.value(params);
        return acc;
    }, {});

    applyCommonAttrs(element, adaptedAttrs);
}

export function applyCommonAttrs(element: HTMLElement, params?: Attrs) {
    if (params?.id) element.id = params.id;
    if (params?.className) element.className = params.className;
    if (params?.display) element.style.display = params.display;

    applyStyleAttr(element, params?.margin, 'margin');
    applyStyleAttr(element, params?.marginLeft, 'marginLeft');
    applyStyleAttr(element, params?.marginRight, 'marginRight');
    applyStyleAttr(element, params?.marginTop, 'marginTop');
    applyStyleAttr(element, params?.marginBottom, 'marginBottom');

    applyStyleAttr(element, params?.padding, 'padding');
    applyStyleAttr(element, params?.paddingLeft, 'paddingLeft');
    applyStyleAttr(element, params?.paddingRight, 'paddingRight');
    applyStyleAttr(element, params?.paddingTop, 'paddingTop');
    applyStyleAttr(element, params?.paddingBottom, 'paddingBottom');

    applyStyleAttr(element, params?.left, 'left');
    applyStyleAttr(element, params?.top, 'top');
    applyStyleAttr(element, params?.width, 'width');
    applyStyleAttr(element, params?.height, 'height');

    if (params?.onClick) {
        element.onclick = Array.isArray(params?.onClick) ?
            () => (params.onClick as (() => void)[]).forEach((callback) => callback()) :
            () => (params.onClick as () => void)();
    }
    if (params?.onMouseDown) element.onmousedown = params.onMouseDown;
    if (params?.onMouseUp) element.onmouseup = params.onMouseUp;
    if (params?.onMouseMove) element.onmousemove = params.onMouseMove;
}

export async function uploadFile() {
    try {
        const [imageFile] = await window.showOpenFilePicker({
            types: [{
                description: "Images",
                accept: {"image/*": [".png", ".gif", ".jpeg", ".jpg"]},
            }],
            excludeAcceptAllOption: true,
            multiple: false,
        })

        const file = await imageFile.getFile();
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.error("Cannot load image");
        };

        return new Promise<HTMLImageElement>(resolve => {
            img.onload = function () {
                URL.revokeObjectURL(img.src);
                resolve(img);
            }
        });
    }
    catch(e) {
        console.error(e);
    }
}

// function makeDraggable(el, dragElement, onMove, onUp) {
//     if (!dragElement) dragElement = el;

//     dragElement.style.cursor = 'move';
//     el.style.position = 'absolute';

//     dragElement.addEventListener('mousedown', (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         let oldZIndex = el.style.zIndex;
//         el.style.zIndex = 10;

//         let oldX = e.clientX;
//         let oldY = e.clientY;

//         dragElement.addEventListener('mouseup', up);

//         function up(e) {
//             e.preventDefault();
//             e.stopPropagation();

//             el.style.zIndex = oldZIndex;
//             onUp?.(e);

//             document.removeEventListener('mousemove', move);
//             document.removeEventListener('mouseup', up);
//         }

//         dragElement.addEventListener('mousemove', move);

//         function move(e) {
//             e.preventDefault();
//             e.stopPropagation();

//             let x = e.clientX;
//             let y = e.clientY;

//             // calculate the new cursor position:
//             dX = oldX - x;
//             dY = oldY - y;
//             oldX = e.clientX;
//             oldY = e.clientY;

//             // set the element's new position:
//             x = el.offsetLeft - dX;
//             y = el.offsetTop - dY;
//             el.style.left = x + "px";
//             el.style.top = y + "px";

//             onMove?.(e);
//         }
//     });
// }

// function removeDraggable(el, dragElement) {
//     if (!dragElement) dragElement = el;

//     dragElement.style.cursor = 'default';
//     el.style.position = 'initial';
// }

// function makeDraggableInsideBlock(el, dragElement, onMove, onUp) {
//     if (!dragElement) dragElement = el;

//     dragElement.style.cursor = 'move';

//     dragElement.addEventListener('mousedown', (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         let oldX = e.clientX + parseInt(el.style.marginLeft.replace('px',''));
//         let oldY = e.clientY+ parseInt(el.style.marginTop.replace('px',''));

//         dragElement.addEventListener('mouseup', up);

//         function up(e) {
//             e.preventDefault();
//             e.stopPropagation();

//             onUp?.(e);

//             document.removeEventListener('mousemove', move);
//             dragElement.removeEventListener('mouseup', up);
//         }

//         document.addEventListener('mousemove', move);

//         function move(e) {
//             e.preventDefault();
//             e.stopPropagation();

//             let x = e.clientX;
//             let y = e.clientY;

//             // calculate the new cursor position:
//             dX = x - oldX;
//             dY = y - oldY;

//             // set the element's new position:
//             el.style.marginLeft = dX + "px";
//             el.style.marginTop = dY + "px";

//             onMove?.(e);
//         }
//     });
// }
