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

##Usage

```javascript
var tree = directoryTree('/some/path');
```

And you can also filter by extensions:

```javascript
var filteredTree = directoryTree('/some/path', ['.jpg', '.png']);
```
