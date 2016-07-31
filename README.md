[![Build Status](https://travis-ci.org/mihneadb/node-directory-tree.svg)](https://travis-ci.org/mihneadb/node-directory-tree)

#directory-tree

Creates an javascript object representing a directory tree.

## Install
```js
npm i -S directory-tree

```


##Usage

```js
var dirTree = require('directory-tree');
var tree = dirTree('/some/path');
```

And you can also filter by extensions:

```js
var dirTree = require('directory-tree');
var filteredTree = dirTree('/some/path', ['.jpg', '.png']);
```

This will take a directory tree:

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

And return a js object:

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
              "name": "windsurf.jpg",
              "size": 400,
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
              "extension": ".png"
            },
            {
              "path": "photos/winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "size": 100,
              "extension": ".jpg"
            }
          ]
        }
      ]
    }
  ]
}
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

Make sure you have the dev dependcies installed (e.g. `npm install .`)


## Node version

Check out version `0.1.1` if you need support for older versions of node.
