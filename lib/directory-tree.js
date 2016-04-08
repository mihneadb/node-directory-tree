const FS = require('fs');
const PATH = require('path');

function directoryTree (path, extensions) {
    const stats = FS.statSync(path);
    const name = PATH.basename(path);
    const item = { path, name };

    if (stats.isFile()) {
        const ext = PATH.extname(path).toLowerCase();
        if (extensions && extensions.length && extensions.indexOf(ext) === -1) return null;
    }
    else {
        item.children = FS.readdirSync(path)
            .map(child => directoryTree(PATH.join(path, child), extensions))
            .filter(e => !!e);
        if (!item.children.length) return null;
    }
    return item;
}

exports.directoryTree = directoryTree;
