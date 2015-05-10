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
  "type": "directory",
  "children": [
    {
      "path": "summer",
      "name": "summer",
      "type": "directory",
      "children": [
        {
          "path": "summer/june",
          "name": "june",
          "type": "directory",
          "children": [
            {
              "path": "summer/june/windsurf.jpg",
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
      "type": "directory",
      "children": [
        {
          "path": "winter/january",
          "name": "january",
          "type": "directory",
          "children": [
            {
              "path": "winter/january/ski.png",
              "name": "ski.png",
              "type": "file"
            },
            {
              "path": "winter/january/snowboard.jpg",
              "name": "snowboard.jpg",
              "type": "file"
            }
          ]
        }
      ]
    }
  ]
}
```

##How to use


To use this library you first need to include it.
```javascript
var dirTree = require('directory-tree');
```

After that you can turn every directory tree in a json object.

```javascript
var dirTree = require('directory-tree');

// Get full directory tree
var tree = dirTree.directoryTree('/photos');

// Only get the structure which contains *.jpg or *.png files.
var filteredTree = dirTree.directoryTree('/photos',  {'fileTypes': ['.jpg', '.png']} );

// Remove the 'winter' direcory from the result
var filteredTree = dirTree.directoryTree('/photos',  {'ignoreList': ['winter']} );
```

##Options

###fileTypes 
Using the `fileTypes` parameter you can narrow the found results by only including files with a certain filetype. The files you want to look for are given as an array.

*example:*

```javascript
var jsFilesTree = dirTree.directoryTree('/photos', {'fileTypes': ['.png']});

/*
{
  "path": "",
  "name": "photos",
  "type": "directory",
  "children": [
    {
      "path": "winter",
      "name": "winter",
      "type": "directory",
      "children": [
        {
          "path": "winter/january",
          "name": "january",
          "type": "directory",
          "children": [
            {
              "path": "winter/january/ski.png",
              "name": "ski.png",
              "type": "file"
            }
          ]
        }
      ]
    }
  ]
}


 */

```   


###ignoreList 
Using the `ignoreList` paramater you can exclude (ignore) certain files and/or directories from the result.

*example:*

```javascript
var jsFilesTree = dirTree.directoryTree('/photos', {'ignoreList': ['winter']});

/*
{
  "path": "",
  "name": "photos",
  "type": "directory",
  "children": [
    {
      "path": "summer",
      "name": "summer",
      "type": "directory",
      "children": [
        {
          "path": "summer/june",
          "name": "june",
          "type": "directory",
          "children": [
            {
              "path": "summer/june/windsurf.jpg",
              "name": "windsurf.jpg",
              "type": "file"
            }
          ]
        }
      ]
    }
  ]
}

 */
```   


