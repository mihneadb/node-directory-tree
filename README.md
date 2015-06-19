    var treeOptions = {
                'hideFiles': true,
                'hideEmptyDirectories': false,
                'ignoreList': ignoreList,
                'fileExtensions': []
            };
            var tree = dirTree.directoryTree(path.resolve(options.uploadDir), treeOptions);
