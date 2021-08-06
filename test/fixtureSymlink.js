tree = {
  "path": "./test/test_data",
  "name": "test_data",
  "type": "directory",
  "children": [
    {
      "path": "test/test_data/file_a.txt",
      "name": "file_a.txt",
      "size": 12,
      "type": "file",
      "extension": ".txt"
    },
    {
      "path": "test/test_data/file_b.txt",
      "name": "file_b.txt",
      "size": 3756,
      "type": "file",
      "extension": ".txt"
    },
    {
      "path": "test/test_data/some_dir",
      "name": "some_dir",
      "type": "directory",
      "children": [
        {
          "path": "test/test_data/some_dir/another_dir",
          "name": "another_dir",
          "type": "directory",
          "children": [
            {
              "path": "test/test_data/some_dir/another_dir/file_a.txt",
              "name": "file_a.txt",
              "size": 12,
              "type": "file",
              "extension": ".txt"
            },
            {
              "path": "test/test_data/some_dir/another_dir/file_b.txt",
              "name": "file_b.txt",
              "size": 3756,
              "type": "file",
              "extension": ".txt"
            }
          ],
          "size": 3768
        },
        {
          "path": "test/test_data/some_dir/file_a.txt",
          "name": "file_a.txt",
          "size": 12,
          "type": "file",
          "extension": ".txt"
        },
        {
          "path": "test/test_data/some_dir/file_b.txt",
          "name": "file_b.txt",
          "size": 3756,
          "type": "file",
          "extension": ".txt"
        }
      ],
      "size": 7536
    },
    {
      "path": "test/test_data/some_dir_2",
      "name": "some_dir_2",
      "type": "directory",
      "children": [
        {
          "path": "test/test_data/some_dir_2/.gitkeep",
          "name": ".gitkeep",
          "size": 0,
          "type": "file",
          "extension": ""
        }
      ],
      "size": 0
    },
    {
      "children": [
        {
          "extension": ".txt",
          "name": "file_a.txt",
          "path": "test/test_data/symlink/file_a.txt",
          "size": 12,
          "type": "file",
        },
        {
          "extension": ".txt",
          "name": "file_b.txt",
          "path": "test/test_data/symlink/file_b.txt",
          "size": 3756,
          "type": "file",
        },
        {
          "children": [
            {
              "children": [
                {
                  "extension": ".txt",
                  "name": "file_a.txt",
                  "path": "test/test_data/symlink/some_dir/another_dir/file_a.txt",
                  "size": 12,
                  "type": "file",
                },
                {
                  "extension": ".txt",
                  "name": "file_b.txt",
                  "path": "test/test_data/symlink/some_dir/another_dir/file_b.txt",
                  "size": 3756,
                  "type": "file",
                }
              ],
              "name": "another_dir",
              "path": "test/test_data/symlink/some_dir/another_dir",
              "size": 3768,
              "type": "directory"
            },
            {
              "extension": ".txt",
              "name": "file_a.txt",
              "path": "test/test_data/symlink/some_dir/file_a.txt",
              "size": 12,
              "type": "file"
            },
            {
              "extension": ".txt",
              "name": "file_b.txt",
              "path": "test/test_data/symlink/some_dir/file_b.txt",
              "size": 3756,
              "type": "file"
            }
          ],
          "name": "some_dir",
          "path": "test/test_data/symlink/some_dir",
          "size": 7536,
          "type": "directory"
        },
        {
          "children": [
            {
              "extension": "",
              "name": ".gitkeep",
              "path": "test/test_data/symlink/some_dir_2/.gitkeep",
              "size": 0,
              "type": "file"
            }
          ],
          "name": "some_dir_2",
          "path": "test/test_data/symlink/some_dir_2",
          "size": 0,
          "type": "directory"
        }
      ],
      "isSymbolicLink": true,
      "name": "symlink",
      "path": "test/test_data/symlink",
      "size": 11304,
      "type": "directory"
    }
  ],
  "size": 22608
}

module.exports = tree;
