function readFile(fs, path) {
    try {
        return fs.readFileSync(path, 'utf-8');
    } catch (e) {
        return e.message;
    }
}

// ----------------------- Async

async function sendRequest(url) {
    const response = await fetch(url);
    return response.json();
}

// ----------------------- DOM

function insertContent(el, content) {
    if (Array.isArray(content))
        content.forEach(item => insertContent(el, item));
    else if (typeof content === 'object')
        el.appendChild(content);
    else
        el.innerHTML = content;
}

function body(content) {
    insertContent(document.body, content);
}

function div(content = '', className, style) {
    const el = document.createElement('div');
    el.className = className;
    el.style = style;

    insertContent(el, content);
    return el;
}

function makeDraggable(el, dragElement, onMove, onUp) {
    if (!dragElement) dragElement = el;

    dragElement.style.cursor = 'move';
    el.style.position = 'absolute';

    dragElement.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let oldZIndex = el.style.zIndex;
        el.style.zIndex = 10;

        let oldX = e.clientX;
        let oldY = e.clientY;

        dragElement.addEventListener('mouseup', up);

        function up(e) {
            e.preventDefault();
            e.stopPropagation();

            el.style.zIndex = oldZIndex;
            onUp?.(e);

            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }

        dragElement.addEventListener('mousemove', move);

        function move(e) {
            e.preventDefault();
            e.stopPropagation();

            let x = e.clientX;
            let y = e.clientY;

            // calculate the new cursor position:
            dX = oldX - x;
            dY = oldY - y;
            oldX = e.clientX;
            oldY = e.clientY;

            // set the element's new position:
            x = el.offsetLeft - dX;
            y = el.offsetTop - dY;
            el.style.left = x + "px";
            el.style.top = y + "px";

            onMove?.(e);
        }
    });
}

function removeDraggable(el, dragElement) {
    if (!dragElement) dragElement = el;

    dragElement.style.cursor = 'default';
    el.style.position = 'initial';
}

function makeDraggableInsideBlock(el, dragElement, onMove, onUp) {
    if (!dragElement) dragElement = el;

    dragElement.style.cursor = 'move';

    dragElement.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let oldX = e.clientX + parseInt(el.style.marginLeft.replace('px',''));
        let oldY = e.clientY+ parseInt(el.style.marginTop.replace('px',''));

        dragElement.addEventListener('mouseup', up);

        function up(e) {
            e.preventDefault();
            e.stopPropagation();

            onUp?.(e);

            document.removeEventListener('mousemove', move);
            dragElement.removeEventListener('mouseup', up);
        }

        document.addEventListener('mousemove', move);

        function move(e) {
            e.preventDefault();
            e.stopPropagation();

            let x = e.clientX;
            let y = e.clientY;

            // calculate the new cursor position:
            dX = x - oldX;
            dY = y - oldY;

            // set the element's new position:
            el.style.marginLeft = dX + "px";
            el.style.marginTop = dY + "px";

            onMove?.(e);
        }
    });
}

module.exports = {
    readFile,
    sendRequest,
    div,
    makeDraggable,
    removeDraggable,
    makeDraggableInsideBlock,
    insertContent,
    body,
}
