'use strict';

const FS = require('fs');
const PATH = require('path');
const constants = {
    DIRECTORY: 'directory',
    FILE: 'file',
  };

function safeReadDirSync(path) {
  let dirData = {};
  try {
    dirData = FS.readdirSync(path);
  } catch (ex) {
    if (ex.code == 'EACCES')
    //User does not have permissions, ignore directory
        return null;
    else throw ex;
  }

  return dirData;
}

function directoryTree(path, options, onEachFile) {
  const name = PATH.basename(path);
  const item = { path, name };
  let stats;

  if (!options) {
    options = {};
  }

  try {
    stats = FS.statSync(path);
  }
  catch (e) {
    return null;
  }

  if (options.depth == undefined || options.depth == null || options.depth >= 0) {
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
    } else if (stats.isDirectory()) {
      item.type = constants.DIRECTORY;
      let childOptions = Object.assign({}, options);
      if (isNaN(childOptions.depth) == false) {
        childOptions.depth--;
      }

      item.children = getChildrenByPath(path, childOptions, onEachFile);
      if (item.children === null) return null;
      item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
      if (isNaN(item.size)) {
        item.size = 0;
      }

    } else {
      return null; // Or set item.size = 0 for devices, FIFO and sockets ?
    }

    return item;
  }
}

function getChildrenByPath(path, options, onEachFile) {
  var children = [];
  let dirData = safeReadDirSync(path);
  if (dirData !== null) {
    children = dirData
        .map(child => directoryTree(PATH.join(path, child), options, onEachFile))
        .filter(e => !!e);
  }else {
    children = null;
  }

  return children;
}

module.exports = directoryTree;
