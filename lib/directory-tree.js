'use strict';

const FS = require('fs');
const PATH = require('path');
const constants = {
    DIRECTORY: 'directory',
    FILE: 'file'
}

function safeReadDirSync (path) {
    let dirData = {};
    try {
        dirData = FS.readdirSync(path);
    } catch(ex) {
        if (ex.code == "EACCES")
        //User does not have permissions, ignore directory
            return null;
        else throw ex;
    }
    return dirData;
}

function directoryTree (path, options, onEachFile) {
    const name = PATH.basename(path);
    const item = { path, name };
    let stats;
    let depth = 1;
    if(!options){
        options = {}
        options.depth = -1;
    }
    if(options.depth == null){
        options.depth = -1;

    }
    try { stats = FS.statSync(path); }
    catch (e) { return null; }

    // Skip if it matches the exclude regex
    if (options && options.exclude && options.exclude.test(path))
        return null;

    if (stats.isFile()) {

        const ext = PATH.extname(path).toLowerCase();

        // Skip if it does not match the extension regex
        if (options && options.extensions && !options.extensions.test(ext))
            return null;

        item.size = stats.size;  // File size in bytes
        item.extension = ext;
        item.type = constants.FILE;
        if (onEachFile) {
            onEachFile(item, PATH);
        }
    }
    else if (stats.isDirectory()) {
        if(depth<options.depth || options.depth == -1){
            let dirData = safeReadDirSync(path);
            if (dirData === null) return null;
            var childOptions = Object.assign({}, options);
            if(childOptions.depth>0){
                childOptions.depth--;
            }

            item.children = dirData
                .map(child => directoryTree(PATH.join(path, child), childOptions, onEachFile))
                .filter(e => !!e);
            item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);

            depth++;
        }
        item.type = constants.DIRECTORY;

    } else {
        return null; // Or set item.size = 0 for devices, FIFO and sockets ?
    }
    return item;
}

module.exports = directoryTree;
