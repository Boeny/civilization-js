const {
    getFolder,
    resolvePath,
    resolveFolder,
    getLastElement,
    isExcluded,
    isExcludedFromLoad,
    isExcludedFile,
    getElementsExceptLast,
    getFileName,
    vectorLength,
    sendRequest,
    loadInSteps,
    removeBlocks,
    createDiv,
    createBlock,
    makeDraggable,
    insertContent,
    body,
    createConnections,
    createContainer
} = require('./utils');

const {TREE_FILTER_EXCLUDE} = require('./constants');

const ALLOWED_EXTENTIONS_TO_PARSE = ['js', 'jsx', 'ts', 'tsx', 'css'];
const ROOT_PATH = '/Users/aleksandr.sychev/projects/deepringc-web/src';
const FILE_PATH = resolvePath(ROOT_PATH, 'index.js');
const FILES_EXCLUDED_FROM_DELETION = ['favicon.ico', 'react-app-env.d.ts', 'expanded-theme.ts'].map(path => ROOT_PATH + '/' + path);
const FILE_REG_EXCLUDED_FROM_DELETION = ['.spec.', '.test.'];
const FOLDERS_EXCLUDED_FROM_DELETION = ['/Users/aleksandr.sychev/projects/deepringc-web/src/deep/components/AddReferralsForm', '__tests__'];

const STORE = {
    file: {
        path: FILE_PATH,
        importsTree: { // tree of imports
            root: {
                path: 'index.js',
                absolutePath: FILE_PATH
            },
            imports: []
        },
        loadedProjectFilesWithImportsMap: {}, // flat list of loaded project files
        absoluteFilePathList: [FILE_PATH], // absolute file paths list
        projectFilesMap: {}, // grouped files of the project by folders
        realFilesMap: {}, // real files grouped by folders
        notUsedFiles: [],
    },
    filters: {
        parse: true,
        libs: true,
        json: true,
        css: true,
        ['@']: true,
    },
    refs: {
        parseButton: null,
        popup: null,
        title: null,
        input: null,
        closeButton: null,
        backButton: null,
        filesContainer: null,
        shouldParseCheckbox: null,
        checkboxes: null,
    },

    getImports() {
        return this.file.importsTree.imports.map(f => f.root.path);
    },

    setupPopup() {
        const popup = document.getElementById('popup');
        const input = popup.querySelector('.input');
        const shouldParseCheckbox = popup.querySelector('.should_parse');

        this.refs.popup = popup;
        this.refs.title = popup.querySelector('.title');
        this.refs.input = input;
        this.refs.closeButton = popup.querySelector('.close');
        this.refs.backButton = popup.querySelector('.back_button')
        this.refs.filesContainer = popup.querySelector('.content');
        this.refs.shouldParseCheckbox = shouldParseCheckbox;
        this.refs.checkboxes = document.querySelectorAll('[class^=include_]');

        makeDraggable(popup, this.refs.title);

        this.refs.closeButton.onclick = () => {
            this.hidePopup();
        };

        this.refs.backButton.onclick = () => {
            this.setPopupInput(getFolder(input.value) || '/');
            this.file.path = '';
            this.triggerInputChange();
        };

        input.addEventListener('change', e => {
            const path = e.target.value || '/';
            this.setPopupTitle(getFileName(path) || 'Root');
            openDir(path);
        });

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') this.triggerInputChange();
        });

        shouldParseCheckbox.checked = this.filters.parse;
        shouldParseCheckbox.onclick = () => {
            const {path} = this.file;
            this.filters.parse = shouldParseCheckbox.checked;

            if (path && getFileName(path).includes('.')) {
                removeBlocks();
                openFile(path);
            }
        };

        this.refs.checkboxes.forEach(el => {
            el.checked = this.filters[el.name];
            el.onclick = () => {
                const {path} = this.file;
                this.filters[el.name] = el.checked;

                if (path && this.filters.parse) {
                    const excludeArr = Object.entries(this.filters).filter(([key, checked]) => !checked).map(([key]) => key);
                    const result = this.excludeFiles(this.getImports(), excludeArr);
                    renderImports(result);
                    removeBlocks();
                    //renderTree(getFolder(path), path, result);
                }
            }
        });
    },

    showPopup() {
        this.refs.popup.style.display = 'block';
    },
    hidePopup() {
        this.refs.popup.style.display = 'none';
    },

    triggerInputChange() {
        this.refs.input.dispatchEvent(new Event('change'));
    },
    setPopupTitle(value) {
        this.refs.title.innerText = value;
    },
    setPopupInput(value) {
        this.refs.input.value = value;
    },

    excludeFiles(files, excludeArr) {
        if (files.length === 0) return [];

        let result = files;

        excludeArr.map((type) => {
            result = result.filter(TREE_FILTER_EXCLUDE[type]);
        });

        return result;
    },
};

document.addEventListener('DOMContentLoaded', function() {
    STORE.refs.parseButton = document.getElementById('parse_button');
    STORE.setupPopup();

    STORE.refs.parseButton.onclick = () => {
        const path = STORE.file.path || '/';
        const name = getFileName(path);

        removeBlocks();
        STORE.showPopup();
        STORE.setPopupTitle(name || 'Root');
        STORE.setPopupInput(path);

        openDir(path);
    };
});

async function openDir(path) {
    const {filesContainer, input} = STORE.refs;
    const files = parseFolder(path);

    removeBlocks();
    filesContainer.innerHTML = '';

    if (!Array.isArray(files)) { // error: it's a file
        openFile(input.value);
        return;
    }

    STORE.file.path = '';
    files.sort((a, b) => a.isFile !== b.isFile ? a.isFile && 1 || -1 : 1);
    files.forEach(f => createFileElement(f.isFile, f.name));
}

function createFileElement(isFile, name) {
    const {filesContainer, input} = STORE.refs;
    const fileElement = document.createElement('div');
    fileElement.style.cursor = 'pointer';

    if (!isFile) {
        fileElement.style.backgroundColor = 'yellow';
    }

    fileElement.innerText = name;
    filesContainer.appendChild(fileElement);

    fileElement.onclick = () => {
        const path = (input.value + '/' + name).replaceAll('//', '/');
        STORE.setPopupInput(path);

        if (!isFile) {
            STORE.file.path = '';
        }

        STORE.triggerInputChange();
    };
}

function len(obj) {
    return Object.keys(obj).length;
}

async function openFile(path) {
    STORE.file.path = path;
    const {filesContainer} = STORE.refs;

    if (STORE.filters.parse) {
        const ext = getLastElement(path.split('.'));

        if (!ALLOWED_EXTENTIONS_TO_PARSE.includes(ext)) {
            filesContainer.innerHTML = `Can not parse .${ext} file!`;
            return;
        }

        STORE.file.importsTree.imports = (await parseFile(getFileName(path), getFolder(path), 1)).originalImports;
        STORE.file.projectFilesMap = getProjectFilesMap(STORE.file.absoluteFilePathList);

        renderImports(STORE.getImports());
        removeBlocks();
        // insertContent(document.getElementById('main-content'), renderTree(STORE.file.importsTree, createContainer()));

        createShowAllFilesCheckbox();
    } else {
        const {content} = await sendRequest(`/readFile?path=${path}`);

        filesContainer.innerHTML = '';
        filesContainer.innerText = content;
    }
}

async function createShowAllFilesCheckbox() {
    // show all files
    // on click ->
    STORE.file.realFilesMap = await getAllFolders(ROOT_PATH);
    STORE.file.notUsedFiles = checkDifferences(STORE.file.projectFilesMap, STORE.file.realFilesMap);

    console.log(STORE.file.notUsedFiles);

    if (Object.values(STORE.file.notUsedFiles).filter(files => files.unused.length > 0).length > 0) {
        console.log('deleted')
        //createDeleteUnusedFilesButton();
    }
}

async function createDeleteUnusedFilesButton() {
    // delete unused files
    // on click ->
    await deleteFiles(STORE.file.notUsedFiles);
}

async function deleteFiles(filesMap) {
    const folders = Object.keys(filesMap);

    for (let i = 0; i < folders.length; i++) {
        const dir = folders[i];
        const files = filesMap[dir].unused;

        if (files.length > 0) {
            await sendRequest(`/deleteFiles?dir=${dir}&files=${JSON.stringify(files)}`);
        }
    }
}

function arraysDiff(smallArray, bigArray) {
    if (smallArray.length > bigArray.length) return arraysDiff(bigArray, smallArray);

    return bigArray.map(bigItem => smallArray.includes(bigItem) ? null : bigItem).filter(Boolean);
}

function checkDifferences(partialMap, fullMap) {
    const diff = {};

    Object.entries(fullMap).forEach(([dir, files]) => {
        let result = [];

        if (partialMap[dir]) {
            const arraysDifference = arraysDiff(partialMap[dir], files);
            if (arraysDifference.length > 0) {
                result = arraysDifference;
            }
        } else {
            result = files;
        }

        if (result.length > 0) {
            diff[dir] = {
                diff: result,
                unused: result.filter(file => couldBeDeleted(dir, file))
            };
        }
    });

    return diff;
}

function couldBeDeleted(dir, file) {
    if (FOLDERS_EXCLUDED_FROM_DELETION.some(path => dir.includes(path))) {
        return false;
    }
    if (FILES_EXCLUDED_FROM_DELETION.some(path => getFolder(path) === dir && file === getFileName(path))) {
        return false;
    }
    if (FILE_REG_EXCLUDED_FROM_DELETION.some(reg => file.includes(reg))) {
        return false;
    }

    return true;
}

function getProjectFilesMap(paths) {
    const projectFilesMap = {};

    paths.forEach(path => {
        const dir = getFolder(path);

        if (!projectFilesMap[dir]) {
            projectFilesMap[dir] = [];
        }
        projectFilesMap[dir].push(getFileName(path));
    });

    return projectFilesMap;
}

async function openFolders(folders) { // unique folder list
    const realFilesMap = {};

    for (let i = 0; i < folders.length; i++) {
        const files = await parseFolder(folders[i]);
        realFilesMap[folders[i]] = files.filter(f => f.isFile).map(f => f.name);
    }

    return realFilesMap;
}

async function getAllFolders(rootFolder) {
    let resultMap = {};
    const objects = await parseFolder(rootFolder);
    const folders = objects.filter(f => !f.isFile).map(f => f.path + '/' + f.name);
    const files = objects.filter(f => f.isFile).map(f => f.name);

    if (files.length > 0) { // if folder consists of the files, not only folders
        resultMap[rootFolder] = files;
    }

    for (let i = 0; i < folders.length; i++) {
        const childMap = await getAllFolders(folders[i]);
        resultMap = {...resultMap, ...childMap};
    }

    return resultMap;
}

async function parseFolder(path) {
    const {files} = await sendRequest(`/scanDir?path=${path}`);
    return files;
}

async function parseFile(rootFileName, rootFolder) {
    const tree = await sendRequest(`/parseFile?path=${rootFileName}&dir=${rootFolder}`);

    if (typeof tree === 'string') { // error
        console.error('error', resolvePath(rootFolder, rootFileName), tree);
        return {originalRoot: rootFileName, originalImports: []};
    }

    tree.imports.sort();

    const filteredTree = [];

    // load imports array for each import except the exception list
    for (let i = 0; i < tree.imports.length; i++) {
        const path = tree.imports[i];
        const isRelativePath = path.includes('./');
        const childFolder = resolveFolder(isRelativePath ? rootFolder : ROOT_PATH, path);
        const fileName = getFileName(path);
        let absolutePath = resolvePath(childFolder, fileName);

        if (isExcludedFromLoad(path)) { // all excuded except css
            if (isExcludedFile(path)) { // image or json
                STORE.file.absoluteFilePathList.push(absolutePath);
            } else {
                absolutePath = path;
            }

            filteredTree.push({
                root: {path, absolutePath},
                imports: [],
            });

            continue;
        }

        let childrenImportsTree = [];

        if (!STORE.file.loadedProjectFilesWithImportsMap[absolutePath]) {
            STORE.file.loadedProjectFilesWithImportsMap[absolutePath] = true;
            const {originalRoot, originalImports} = await parseFile(fileName, childFolder);
            STORE.file.loadedProjectFilesWithImportsMap[absolutePath] = true;

            childrenImportsTree = originalImports;
            STORE.file.absoluteFilePathList.push(originalRoot);
        }

        filteredTree.push({
            root: {path, absolutePath},
            imports: childrenImportsTree,
        });
    }

    return {originalRoot: tree.root, originalImports: filteredTree};
}

function renderImports(imports) {
    const {filesContainer} = STORE.refs;
    filesContainer.innerHTML = '';

    imports.forEach(f => {
        const element = createDiv(f);

        if (STORE.filters.libs && isExcludedFromLoad(f)) {
            element.style.backgroundColor = 'rgb(218 120 36)';
        }

        element.addEventListener('onclick', () => {

        });

        filesContainer.appendChild(element);
    });
}

function renderTree(tree, rootContainer) {
    const rootBlock = createBlock(getFileName(tree.root.path));
    insertContent(rootContainer, rootBlock);

    if (tree.imports.length === 0) return rootContainer;

    const childrenContainer = createContainer();

    return tree.imports.map((child) => {
        return renderTree(child, childrenContainer);
    });
}
