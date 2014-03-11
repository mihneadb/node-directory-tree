var fs = require('fs');
var path = require('path');

function directoryTree(basepath, extensions) {
    var _directoryTree = function (name, extensions) {
        var stats = fs.statSync(name);
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
        } else {
            item.type = 'directory';
            item.children = fs.readdirSync(name).map(function (child) {
                return _directoryTree(path.join(name, child), extensions);
            }).filter(function (e) {
                return e != null;
            });

            if (item.children.length == 0) {
                return null;
            }
        }

        return item;
    }
    return _directoryTree(basepath, extensions);
}

exports.directoryTree = directoryTree;

