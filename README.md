[![Build Status](https://travis-ci.org/tborychowski/node-directory-tree.svg?branch=master)](https://travis-ci.org/tborychowski/node-directory-tree)

#directory-tree

Creates an object representing a directory tree.


##Usage

```javascript
var dirTree = require('directory-tree');
var tree = dirTree('/some/path');
```

And you can also filter by extensions:

```javascript
var dirTree = require('directory-tree');
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
  "path": "photos",
  "name": "photos",
  "size": 600,
  "children": [
    {
      "path": "photos/summer",
      "name": "summer",
      "size": 400,
      "children": [
        {
          "path": "photos/summer/june",
          "name": "june",
          "size": 400,
          "children": [
            {
              "path": "photos/summer/june/windsurf.jpg",
              "size": 400,
              "name": "windsurf.jpg",
            }
          ]
        }
      ]
    },
    {
      "path": "photos/winter",
      "name": "winter",
      "size": 200,
      "children": [
        {
          "path": "photos/winter/january",
          "name": "january",
          "size": 200,
          "children": [
            {
              "path": "photos/winter/january/ski.png",
              "name": "ski.png",
              "size": 100,
            },
            {
              "path": "photos/winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "size": 100,
            }
          ]
        }
      ]
    }
  ]
}
```
