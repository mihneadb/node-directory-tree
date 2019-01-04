const tree = {
  'path': './test/test_data',
  'name': 'test_data',
  'children': [
    {
      'path': 'test/test_data/file_a.txt',
      'name': 'file_a.txt',
      'size': 12,
      'extension': '.txt',
      'type': 'file'
    },
    {
      'path': 'test/test_data/file_b.txt',
      'name': 'file_b.txt',
      'size': 3756,
      'extension': '.txt',
      'type': 'file'
    },
    {
      'path': 'test/test_data/some_dir',
      'name': 'some_dir',
      'children': [
        {
          'path': 'test/test_data/some_dir/file_a.txt',
          'name': 'file_a.txt',
          'size': 12,
          'extension': '.txt',
          'type': 'file'
        },
        {
          'path': 'test/test_data/some_dir/file_b.txt',
          'name': 'file_b.txt',
          'size': 3756,
          'extension': '.txt',
          'type': 'file'
        }
      ],
      'type': 'directory',
      'size': 3768
    }
  ],
  'size': 7536,
  'type': 'directory'
};

module.exports = tree;
