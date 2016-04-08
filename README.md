[![Build Status](https://travis-ci.org/tborychowski/node-directory-tree.svg?branch=master)](https://travis-ci.org/tborychowski/node-directory-tree)

#directory-tree

Creates an object representing a directory tree.


##Usage

```javascript
var dirTree = require('directory-tree').directoryTree;
var tree = dirTree('/some/path');
```

And you can also filter by extensions:

```javascript
var dirTree = require('directory-tree').directoryTree;
var filteredTree = dirTree('/some/path', ['.jpg', '.png']);
```




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
