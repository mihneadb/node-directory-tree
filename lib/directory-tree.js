var fs = require('fs');
var path = require('path');

function directoryTree(basepath, extensions, depth) {
    var _directoryTree = function (name, extensions, currentDepth) {
        /*
         * Certain symbolic links/weird files break when you try to stat them
         */
        try {
            var stats = fs.statSync(name);
        } catch(e) {
            return null;
        }

        var item = {
            path: path.relative(basepath, name),
            name: path.basename(name),
            depth: currentDepth,
            size: stats.size  // File size in bytes
        };

        if (stats.isFile()) {
            if (extensions &&
                extensions.length > 0 &&
                extensions.indexOf(path.extname(name).toLowerCase()) == -1) {
                return null;
            }
            item.type = 'file';
        } else {
            item.type = 'directory';

            if (depth === undefined || currentDepth < depth) {
                item.children = fs.readdirSync(name).map(function (child) {
                    return _directoryTree(
                        path.join(name, child), extensions, currentDepth + 1
                    );
                }).filter(function (e) {
                    return e != null;
                });

                if (item.children.length == 0) {
                    return null;
                }
            }
        }

        return item;
    }
    return _directoryTree(basepath, extensions, 0);
}

exports.directoryTree = directoryTree;

