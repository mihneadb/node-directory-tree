var fs = require('fs');
var path = require('path');

/**
 * Looks if any if array values is found in the given string.
 *     ex.
 *     array  = ['asdf', 1, 'test.js']
 *     string = 'this/is/the/test/string.js' // expected return: false
 *     string = 'this/is/a/test.js' // expected return: true
*
 * @param  {string} string  The haystack which you want to search through
 * @param  {array} array    The needles which you are looking for
 * @return {boolean}        True if a needle is found, otherwise false.
 */
searchSubstring = function(string, array){
    var found = false;
    array.forEach( function(value, key){
        if (string.indexOf( value ) > 0 ) {
            found = true;
            return true;
        }
    })
    return found;
}


function directoryTree(basepath, options) {

    var _directoryTree = function (name, options) {


        var ignore = false;
        if ( typeof options.ignoreList === "object") {
            // // Check if the name (file | directory) is on the ignore list
            if ( searchSubstring(name, options.ignoreList) ) {
                ignore = true;
            }
        }
        if (!ignore) {

            var stats = fs.statSync(name);
            var item = {
                path: path.relative(basepath, name),
                name: path.basename(name)
            };

            if (stats.isFile()) {
                if (options.extensions &&
                    options.extensions.length > 0 &&
                    options.extensions.indexOf(path.extname(name).toLowerCase()) == -1) {
                    return null;
                }
                item.type = 'file';
            } else {
                item.type = 'directory';
                item.children = fs.readdirSync(name).map(function (child) {
                    return _directoryTree(path.join(name, child), options);
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
    return _directoryTree(basepath, options);
}


exports.directoryTree = directoryTree;


