var fs = require('fs');
var path = require('path');

function directoryTree(basepath, myOptions) {
    var _directoryTree = function (name, myOptions) {
        
        if(!myOptions){
            myOptions = [];
        }
        
        var options = {
            'hideFiles': myOptions.hideFiles || false,
            'hideEmptyDirectories': myOptions.hideEmptyDirectories ||false,
            'ignoreList': myOptions.ignoreList || [],
            'fileExtensions': myOptions.fileExtensions || []
        };

        var stats = fs.statSync(name);

        var item = {
            path: path.relative(basepath, name),
            name: path.basename(name)
        };

        if (options.hideFiles && stats.isFile()) {
            return null;
        }

        if (options.ignoreList.length > 0) { 
            var ignore = false;
            options.ignoreList.forEach(function (value) {
                if (name.indexOf(value) > -1) { 
                    ignore = true;
                }
            });
            if(ignore){
                return null;
            }
        }

        if (stats.isFile()) {
            if (options.fileExtensions.length > 0 && 
                    options.fileExtensions.indexOf(path.extname(name).toLowerCase()) === -1) {
                return null;
            }
            item.type = 'file';
        } else {
            item.type = 'directory';
            item.children = fs.readdirSync(name).map(function (child) {
                return _directoryTree(path.join(name, child), options);
            }).filter(function (e) {
                return e !== null;
            });
            
            if (options.hideEmptyDirectories && item.children.length === 0) {
                return null;
            }
        }

        return item;
    };
    return _directoryTree(basepath, myOptions);
}

exports.directoryTree = directoryTree;
