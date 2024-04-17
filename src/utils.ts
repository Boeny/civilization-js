export type Content = string | HTMLElement | HTMLElement[] | HTMLElement[][];

export function insertContent(container: HTMLElement, content: Content) {
    if (Array.isArray(content))
        content.forEach(item => insertContent(container, item));
    else if (typeof content === 'object')
        container.appendChild(content);
    else
        container.innerHTML = content;
}

export function body(content: Content) {
    insertContent(document.body, content);
}

export function onLoad(callback: () => void) {
    document.addEventListener('DOMContentLoaded', callback);
}

export function multiply(n: number, callback: (i: number) => boolean | void) {
    for (let i = 0; i < n; i += 1) {
        if (callback(i) === false) break;
    }
}

export function range(from: number, to?: number): number[] {
    const count = to ? to - from : from;
    return [...Array(count)].map((item, i) => i);
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
