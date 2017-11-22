tree = {
    path: './test/test_data',
    name: 'test_data',
    children:
        [{
            path: 'test/test_data/file_a.txt',
            name: 'file_a.txt',
            size: 12,
            extension: '.txt',
            type: 'file'
        },
            {
                path: 'test/test_data/file_b.txt',
                name: 'file_b.txt',
                size: 3756,
                extension: '.txt',
                type: 'file'
            },
            {
                path: 'test/test_data/some_dir',
                name: 'some_dir',
                type: 'directory'
            },
            {
                path: 'test/test_data/some_dir_2',
                name: 'some_dir_2',
                type: 'directory'
            }],
    size: 0,
    type: 'directory'
}
module.exports = tree;
