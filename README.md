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
  "depth": 0,
  "size": 608,
  "type": "directory",
  "children": [
    {
      "path": "summer",
      "name": "summer",
      "depth": 1,
      "size": 404,
      "type": "directory",
      "children": [
        {
          "path": "summer/june",
          "name": "june",
          "depth": 2,
          "size": 402,
          "type": "directory",
          "children": [
            {
              "path": "summer/june/windsurf.jpg",
              "depth": 3,
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
      "depth": 1,
      "size": 204,
      "type": "directory",
      "children": [
        {
          "path": "winter/january",
          "name": "january",
          "depth": 2,
          "size": 202,
          "type": "directory",
          "children": [
            {
              "path": "winter/january/ski.png",
              "name": "ski.png",
              "depth": 3,
              "size": 100,
              "type": "file"
            },
            {
              "path": "winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "depth": 3,
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

And you can also filter by extensions:

```javascript
var dirTree = require('directory-tree');
var filteredTree = dirTree.directoryTree('/some/path', ['.jpg', '.png']);
```


And you can also specify a depth limit for the directory tree:

```javascript
var dirTree = require('directory-tree');
var filteredTree = dirTree.directoryTree('/some/path', ['.jpg', '.png'], 2);
```


In general the arguments to `directoryTree` are `path`, Array `extensions` to be filtered, and desired
 tree `depth`. If no `depth` argument is passed the entire file tree will be
 constructed for the given path.
