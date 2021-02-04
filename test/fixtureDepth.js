tree = {
  "path": "./test/depth_test",
  "name": "depth_test",
  "children": [
    {
      "path": "test/depth_test/depth1_file",
      "name": "depth1_file",
      "size": 0,
      "extension": "",
      "type": "file"
    },
    {
      "path": "test/depth_test/depth2",
      "name": "depth2",
      "children": [
        {
          "path": "test/depth_test/depth2/depth2_file",
          "name": "depth2_file",
          "size": 0,
          "extension": "",
          "type": "file"
        },
        {
          "path": "test/depth_test/depth2/depth3",
          "name": "depth3",
          "children": [],
          "type": "directory",
          "size": null
        }
      ],
      "size": 0,
      "type": "directory"
    }
  ],
  "size": 0,
  "type": "directory"
}


module.exports = tree;
