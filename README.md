# directory-tree

Creates a JavaScript object representing a directory tree.

This library gets [~100k downloads per week](http://npm-stats.org/#/directory-tree). If you find it useful, feel free to <a href="https://www.buymeacoffee.com/pXhXnSXSbN"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee.&emoji=&slug=pXhXnSXSbN&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

## Install

```bash
$ npm install directory-tree
```

## Usage

```js
const dirTree = require("directory-tree");
const tree = dirTree("/some/path");
```

And you can also filter by an extensions regex:
This is useful for including only certain types of files.

```js
const dirTree = require("directory-tree");
const filteredTree = dirTree("/some/path", { extensions: /\.txt/ });
```

Example for filtering multiple extensions with Regex.

```js
const dirTree = require("directory-tree");
const filteredTree = dirTree("/some/path", {
  extensions: /\.(md|js|html|java|py|rb)$/
});
```

You can also exclude paths from the tree using a regex:

```js
const dirTree = require("directory-tree");
const filteredTree = dirTree("/some/path", { exclude: /some_path_to_exclude/ });
```

You can also specify which additional attributes you would like to be included about each file/directory:

```js
const dirTree = require('directory-tree');
const filteredTree = dirTree('/some/path', {attributes:['mode', 'mtime']});
```

The default attributes are `[name, path]` for Files and `[name, path, children]` for Directories

A callback function can be executed with each file that matches the extensions provided:

```js
const PATH = require('path');
const dirTree = require('directory-tree');

const tree = dirTree('./test/test_data', {extensions:/\.txt$/}, (item, PATH, stats) => {
  console.log(item);
});
```

The callback function takes the directory item (has path, name, size, and extension) and an instance of [node path](https://nodejs.org/api/path.html) and an instance of [node FS.stats](https://nodejs.org/api/fs.html#fs_class_fs_stats).

You can also pass a callback function for directories:
```js
const PATH = require('path');
const dirTree = require('directory-tree');

const tree = dirTree('./test/test_data', {extensions:/\.txt$/}, null, (item, PATH, stats) => {
  console.log(item);
});
```

## Options

`exclude` : `RegExp|RegExp[]` - A RegExp or an array of RegExp to test for exclusion of directories.

`extensions` : `RegExp` - A RegExp to test for exclusion of files with the matching extension.

`attributes` : `string[]` - Array of [FS.stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) attributes.

`normalizePath` : `Boolean` - If true, windows style paths will be normalized to unix style pathes (/ instead of \\).

`depth` : `number` - If presented, reads so many nested dirs as specified in argument. Usage of size attribute with depth option is prohibited.

## Result

Given a directory structured like this:

```
photos
├── summer
│   └── june
│       └── windsurf.jpg
└── winter
    └── january
        ├── ski.png
        └── snowboard.jpg
```

`directory-tree` with `attributes: ["size", "type", "extension"]`  will return this JS object:

```json
{
  "path": "photos",
  "name": "photos",
  "size": 600,
  "type": "directory",
  "children": [
    {
      "path": "photos/summer",
      "name": "summer",
      "size": 400,
      "type": "directory",
      "children": [
        {
          "path": "photos/summer/june",
          "name": "june",
          "size": 400,
          "type": "directory",
          "children": [
            {
              "path": "photos/summer/june/windsurf.jpg",
              "name": "windsurf.jpg",
              "size": 400,
              "type": "file",
              "extension": ".jpg"
            }
          ]
        }
      ]
    },
    {
      "path": "photos/winter",
      "name": "winter",
      "size": 200,
      "type": "directory",
      "children": [
        {
          "path": "photos/winter/january",
          "name": "january",
          "size": 200,
          "type": "directory",
          "children": [
            {
              "path": "photos/winter/january/ski.png",
              "name": "ski.png",
              "size": 100,
              "type": "file",
              "extension": ".png"
            },
            {
              "path": "photos/winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "size": 100,
              "type": "file",
              "extension": ".jpg"
            }
          ]
        }
      ]
    }
  ]
}
```

## Adding custom fields
You can easily extend a `DirectoryTree` object with custom fields by adding them to the custom field.
For example add an `id` based on the path of a `DirectoryTree` object for each directory and file like so:
```
import { createHash } from 'crypto';
import * as directoryTree from 'directory-tree';
import { DirectoryTree, DirectoryTreeOptions, DirectoryTreeCallback } from 'directory-tree';

const callback: DirectoryTreeCallback = (
            item: DirectoryTree,
            path: string
        ) => {
            item.custom = {id: createHash('sha1').update(path).digest('base64')};
        };

const dirTree: DirectoryTree & { id?: string } = directoryTree(
    "<your-directory-path>",
    {},
    callback,
    callback
);

// to explore the object with the new custom fields
console.log(JSON.stringify(dirTree, null, 2));

```

## Note

Device, FIFO and socket files are ignored.

Files to which the user does not have permissions are included in the directory
tree, however, directories to which the user does not have permissions, along
with all of its contained files, are completely ignored.

## Dev

To run tests go the package root in your CLI and run,

```bash
$ npm test
```

Make sure you have the dev dependencies installed (e.g. `npm install .`)

## Node version

This project requires at least Node v4.2.
Check out version `0.1.1` if you need support for older versions of Node.

## CLI usage

You can use script directly from command line for generating json data.

```bash
$ npx directory-tree --help
```
```bash
$ npx directory-tree --path /Users/user/target --attributes type,extension --pretty -o ./xz.json --depth 1 
```

### Available options
-p, --path string      🗂 The input folder to process. Required.                                     
-e, --exclude string   🐒 Exclude some folders from processing by regexp string. Ex -e "test_data/some_dir$|js|.DS_Store"                                            
-o, --output string    📝 Put result into file provided by this options. Overwrites if exists.       
-d, --depth number     ☞ Reads dirs in deep as specified. Usage of size attribute with depth option is prohibited.                                                                
--attributes string    ℹ️ Grab file attributes. Example: --attributes size,type,extension. Usage of size attribute with depth option is prohibited                                
--pretty               💎 Json pretty print
