var expect = require('chai').expect,
        dirtree = require('../lib/directory-tree'),
        fs = require('fs');

describe('directoryTree', function () {

    it('should return an Object', function () {
        var tree = dirtree.directoryTree('./test/test_data');
        expect(tree).to.be.an('object');
    });

    describe('Tests for listing files', function () {
        it('should list the children in a directory [default]', function () {
            var tree = dirtree.directoryTree('./test/test_data');
            expect(tree.children.length).to.equal(4);
        });

        it('should list the children in a directory', function () {
            var tree = dirtree.directoryTree('./test/test_data', {'hideFiles': false});
            expect(tree.children.length).to.equal(4);
        });

        it('should hide files in a directory listing', function () {
            var tree = dirtree.directoryTree('./test/test_data', {'hideFiles': true});
            expect(tree.children.length).to.equal(2);
        });
    });

    describe('Tests for ignoring files and / or directories', function () {

        it('should ignore files', function () {
            var tree = dirtree.directoryTree('./test/test_data/some_dir_2', {'ignoreList': ['.DS_Store', '.gitkeep']});
            expect(tree.children.length).to.equal(0);
        });

        it('should ignore directories', function () {
            var tree = dirtree.directoryTree('./test/test_data', {'ignoreList': ['test/test_data/some_dir_2']});
            expect(tree.children.length).to.equal(3);
        });

        it('should ignore files and directories', function () {
            var tree = dirtree.directoryTree('./test/test_data', {'ignoreList': ['test/test_data/some_dir_2', 'file_a.txt']});
            expect(tree.children.length).to.equal(2);
        });
    });

    describe('Tests for fileExtensions', function () {

        it('should get only files with certain extensions', function () {
            var tree = dirtree.directoryTree('./test/test_data/some_dir', {'fileExtensions': ['.png']});
            expect(tree.children.length).to.equal(2);
        });

    });

    /*
     *  Tests for empty directories
     */
    describe('Tests for empty directories', function () {
        beforeEach(function (done) {
            fs.mkdir('./test/test_data/some_dir_2/test-dir', function () {
                done();
            });
        });

        it('should show empty directories [default]', function () {
            var tree = dirtree.directoryTree('./test/test_data/some_dir_2');
            expect(tree.children.length).to.equal(2);
        });

        it('should show empty directories', function () {
            var tree = dirtree.directoryTree('./test/test_data/some_dir_2', {'hideEmptyDirectories': false});
            expect(tree.children.length).to.equal(2);
        });

        it('should hide empty directories', function () {
            var tree = dirtree.directoryTree('./test/test_data/some_dir_2', {'hideEmptyDirectories': true});
            expect(tree.children.length).to.equal(1);
        });

        afterEach(function (done) {
            fs.rmdir('./test/test_data/some_dir_2/test-dir', function () {
                done();
            });
        });
    });

});
