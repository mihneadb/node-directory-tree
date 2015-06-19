[![Build Status](https://travis-ci.org/Meistercoach83/node-directory-tree.svg)](https://travis-ci.org/Meistercoach83/node-directory-tree)

#directory-tree

Creates an object representing a directory tree.

From:

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

To:

```json
{
  "path": "",
  "name": "photos",
  "size": 600,
  "type": "directory",
  "children": [
    {
      "path": "summer",
      "name": "summer",
      "size": 400,
      "type": "directory",
      "children": [
        {
          "path": "summer/june",
          "name": "june",
          "size": 400,
          "type": "directory",
          "children": [
            {
              "path": "summer/june/windsurf.jpg",
              "size": 400,
              "name": "windsurf.jpg",
              "type": "file"
            }
          ]
        }
      ]
    },
    {
      "path": "winter",
      "name": "winter",
      "size": 200,
      "type": "directory",
      "children": [
        {
          "path": "winter/january",
          "name": "january",
          "size": 200,
          "type": "directory",
          "children": [
            {
              "path": "winter/january/ski.png",
              "name": "ski.png",
              "size": 100,
              "type": "file"
            },
            {
              "path": "winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "size": 100,
              "type": "file"
            }
          ]
        }
      ]
    }
  ]
}
```

##Usage

```javascript
var dirTree = require('directory-tree');
var tree = dirTree.directoryTree('/some/path');
```

And you can also add some options:

```javascript
var dirTree = require('directory-tree');
var treeOptions = {
                'hideFiles': true, // show only directories in tree
                'hideEmptyDirectories': false, // display empty folders
                'ignoreList': ['Winter', 'Summer.txt'], // define a ignoreList of files / directories
                'fileExtensions': ['.jpg', '.png'] // show only certain fileExtensions
            };
            var filteredTree = dirTree.directoryTree('/some/path', treeOptions);
```


## Dev

To run tests go the package root in your CLI and run,

```bash
$ mocha
```

Make sure you have the dev dependcies installed (e.g. `npm install .`)
