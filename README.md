[![Build Status](https://travis-ci.org/mihneadb/node-directory-tree.svg)](https://travis-ci.org/mihneadb/node-directory-tree)

# directory-tree

Creates a JavaScript object representing a directory tree.

## Install
```bash
$ npm install directory-tree
```

## Usage

```js
const dirTree = require('directory-tree');
const tree = dirTree('/some/path');
```

And you can also filter by extensions:

```js
const dirTree = require('directory-tree');
const filteredTree = dirTree('/some/path', ['.jpg', '.png']);
```

A callback function can be executed with each file that matches the extensions provided:

```js
const PATH = require('path');
const dirTree = require('directory-tree');

const tree = dirTree('./test/test_data', ['.jpg'], (item, PATH) => {
	console.log(item);
});
```

The callback function takes the directory item (has path, name, size, and extension) and an instance of [node path](https://nodejs.org/api/path.html).

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

`directory-tree` will return this JS object:

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

Make sure you have the dev dependencies installed (e.g. `npm install .`)

## Node version

This project requires at least Node v4.2.
Check out version `0.1.1` if you need support for older versions of Node.
