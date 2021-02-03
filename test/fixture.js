tree = {
  "path": "./test/test_data",
  "name": "test_data",
  "children": [
    {
      "path": "test/test_data/depth1",
      "name": "depth1",
      "children": [
        {
          "path": "test/test_data/depth1/depth2",
          "name": "depth2",
          "children": [
            {
              "path": "test/test_data/depth1/depth2/depth3",
              "name": "depth3",
              "children": [
                {
                  "path": "test/test_data/depth1/depth2/depth3/depth4",
                  "name": "depth4",
                  "children": [
                    {
                      "path": "test/test_data/depth1/depth2/depth3/depth4/depth5",
                      "name": "depth5",
                      "children": [
                        {
                          "path": "test/test_data/depth1/depth2/depth3/depth4/depth5/some_file",
                          "name": "some_file",
                          "size": 0,
                          "extension": "",
                          "type": "file"
                        }
                      ],
                      "size": 0,
                      "type": "directory"
                    }
                  ],
                  "size": 0,
                  "type": "directory"
                }
              ],
              "size": 0,
              "type": "directory"
            }
          ],
          "size": 0,
          "type": "directory"
        }
      ],
      "size": 0,
      "type": "directory"
    },
    {
      "path": "test/test_data/file_a.txt",
      "name": "file_a.txt",
      "size": 12,
      "extension": ".txt",
      "type": "file"
    },
    {
      "path": "test/test_data/file_b.txt",
      "name": "file_b.txt",
      "size": 3756,
      "extension": ".txt",
      "type": "file"
    },
    {
      "path": "test/test_data/some_dir",
      "name": "some_dir",
      "children": [
        {
          "path": "test/test_data/some_dir/another_dir",
          "name": "another_dir",
          "children": [
            {
              "path": "test/test_data/some_dir/another_dir/file_a.txt",
              "name": "file_a.txt",
              "size": 12,
              "extension": ".txt",
              "type": "file"
            },
            {
              "path": "test/test_data/some_dir/another_dir/file_b.txt",
              "name": "file_b.txt",
              "size": 3756,
              "extension": ".txt",
              "type": "file"
            }
          ],
          "size": 3768,
          "type": "directory"
        },
        {
          "path": "test/test_data/some_dir/file_a.txt",
          "name": "file_a.txt",
          "size": 12,
          "extension": ".txt",
          "type": "file"
        },
        {
          "path": "test/test_data/some_dir/file_b.txt",
          "name": "file_b.txt",
          "size": 3756,
          "extension": ".txt",
          "type": "file"
        }
      ],
      "size": 7536,
      "type": "directory"
    },
    {
      "path": "test/test_data/some_dir_2",
      "name": "some_dir_2",
      "children": [
        {
          "path": "test/test_data/some_dir_2/.gitkeep",
          "name": ".gitkeep",
          "size": 0,
          "extension": "",
          "type": "file"
        }
      ],
      "size": 0,
      "type": "directory"
    }
  ],
  "size": 11304,
  "type": "directory"
}

module.exports = tree;
