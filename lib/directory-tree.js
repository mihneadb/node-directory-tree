var fs = require('fs');
var path = require('path');

function directoryTree(basepath, extensions) {
    var _directoryTree = function (name, extensions) {
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
            name: path.basename(name)
        };

        if (stats.isFile()) {
            if (extensions &&
                extensions.length > 0 &&
                extensions.indexOf(path.extname(name).toLowerCase()) == -1) {
                return null;
            }
            item.type = 'file';
            item.size = stats.size;  // File size in bytes
        } else {
            item.type = 'directory';
            item.children = fs.readdirSync(name).map(function (child) {
                return _directoryTree(path.join(name, child), extensions);
            }).filter(function (e) {
                return e != null;
            });

            if (item.children.length == 0) {
                return null;
            } else { // The dir has files inside of it, sum up their size
                item.size = item.children.reduce(function(previous, current) {
                    return previous + current.size;
                }, 0);
            }
        }

        return item;
    }
    return _directoryTree(basepath, extensions);
}

exports.directoryTree = directoryTree;

