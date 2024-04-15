const { body, div, makeDraggable, removeDraggable, makeDraggableInsideBlock } = require('./utils');

document.addEventListener('DOMContentLoaded', function() {
    //this.refs.input.dispatchEvent(new Event('change'));
    //makeDraggable(popup, this.refs.title);

    const menu = document.getElementById('menu');
    const createBlockButton = document.getElementById('createBlockButton');
    const createButtonButton = document.getElementById('createButtonButton');
    let x, y;

    document.body.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        document.body.querySelectorAll('.corner').forEach(el => el.style.display = 'none');

        menu.style.display = 'flex';
    });
    createBlockButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const el = div('', 'block', `position: absolute;background: #fff;border: 1px solid;width: 100px;height: 100px;left: ${x};top: ${y};`);
        body(el);

        const corner = div('', 'corner', 'position: absolute;background: #fff;border: 1px solid;width: 10px;height: 10px;');
        corner.style.left = parseInt(el.style.width.replace('px','')) + 'px';
        corner.style.top = parseInt(el.style.height.replace('px','')) + 'px';
        el.appendChild(corner);

        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            document.body.querySelectorAll('.corner').forEach(el => el.style.display = 'none');
            corner.style.display = 'block';
        });

        makeDraggable(corner, corner, () => {
            el.style.width = corner.offsetLeft + 'px';
            el.style.height = corner.offsetTop + 'px';
        });

        let oldBorder, oldCoveredBlock, coveredBlock;
        makeDraggable(el, el,
            (e) => {
                coveredBlock = document.elementsFromPoint(e.clientX, e.clientY)[1];
                if (coveredBlock && coveredBlock !== oldCoveredBlock) {
                    if (oldCoveredBlock) {
                        oldCoveredBlock.style.outline = oldBorder;
                    }
                    oldCoveredBlock = coveredBlock;
                    oldBorder = coveredBlock.style.outline;
                    coveredBlock.style.outline = '2px solid red';
                }
            },
            (e) => {
                if (coveredBlock) {
                    coveredBlock.style.outline = oldBorder;

                    if (!Array.from(coveredBlock.querySelectorAll('.block')).includes(el)) {
                        removeDraggable(el);
                        coveredBlock.appendChild(el);
                        makeDraggableInsideBlock(el);
                    }
                }
            }
        );

        menu.style.display = 'none';
    });
    createButtonButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        menu.style.display = 'none';
    });
});
