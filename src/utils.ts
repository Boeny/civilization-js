import { Content } from "types";


export function insertContent(container: HTMLElement, content: Content) {
    if (Array.isArray(content))
        content.forEach(item => insertContent(container, item));
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
