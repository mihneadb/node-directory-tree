'use strict';

const expect = require('chai').expect;
const dirtree = require('../lib/directory-tree');
const testTree = require('./fixture.js');
const testTreeZeroDepth = require('./depth/fixtureZeroDepth.js');
const testTreeFirstDepth = require('./depth/fixtureFirstDepth.js');
const testTreeSecondDepth = require('./depth/fixtureSecondDepth.js');
const excludeTree = require('./fixtureExclude');
const excludeTree2 = require('./fixtureMultipleExclude');
const symlinkTree = require('./fixtureSymlink');


describe('directoryTree', () => {

  it('should not crash with empty options', () => {
    const tree = dirtree('./test/test_data');
  });

  it('should return an Object', () => {
    const tree = dirtree('./test/test_data', {extensions:/\.txt$/, followSymlinks: false });
    expect(tree).to.be.an('object');
  });

  it('should list the children in a directory', () => {
    const tree = dirtree('./test/test_data', {extensions:/\.txt$/, followSymlinks: false });

    // 4 including the empty `some_dir_2`.
    expect(tree.children.length).to.equal(4);
  });

  it('should execute a callback function for each file with no specified extensions', () => {
    let number_of_files =  7;
    let callback_executed_times = 0;

    const tree = dirtree('./test/test_data', { followSymlinks: false }, function(item, PATH) {
      callback_executed_times++;
    });

    expect(callback_executed_times).to.equal(number_of_files);
  });

  it('should execute a callback function for each directory', () => {
    let number_of_directories = 4;
    let callback_executed_times = 0;

    const tree = dirtree('./test/test_data', { followSymlinks: false }, null, function(item, PATH) {
      callback_executed_times++;
    });

    expect(callback_executed_times).to.equal(number_of_directories);
  });

  it('should execute a callback function for each file with specified extensions', () => {
    let number_of_files =  6;
    let callback_executed_times = 0;

    const tree = dirtree('./test/test_data', {extensions:/\.txt$/, followSymlinks: false }, function(item, PATH) {
      callback_executed_times++;
    });
    expect(callback_executed_times).to.equal(number_of_files);
  });

  it('should display the size of a directory (summing up the children)', () => {
    const tree = dirtree('./test/test_data', {extensions:/\.txt$/, attributes: ['size']});
    expect(tree.size).to.be.above(11000);
  });

  it('should not crash with directories where the user does not have necessary permissions', () => {
    const tree = dirtree('/root/', {extensions:/\.txt$/});
    expect(tree).to.equal(null);
  });

  it('should return the correct exact result', () => {
    const tree = dirtree('./test/test_data', {normalizePath: true, followSymlinks: false, attributes: ['size','type','extension'] });
    expect(tree).to.deep.equal(testTree);
  });

  it('should not swallow exceptions thrown in the callback function', () => {
    const error = new Error('Something happened!');
    const badFunction = function () {
      dirtree('./test/test_data', {extensions:/\.txt$/}, function(item) {
        throw error;
      });
    }
    expect(badFunction).to.throw(error);
  })

  it('should exclude the correct folders', () => {
    const tree = dirtree('./test/test_data',{exclude: /another_dir/, normalizePath: true, followSymlinks: false, attributes: ['size','type','extension']});
    expect(tree).to.deep.equal(excludeTree);
  });

  it('should exclude multiple folders', () => {
    const tree = dirtree('./test/test_data', {exclude: [/another_dir/, /some_dir_2/], normalizePath: true, followSymlinks: false, attributes: ['size','type','extension']});
    expect(tree).to.deep.equal(excludeTree2);

  });

  it('should include attributes', () => {
    const tree = dirtree('./test/test_data',{ attributes: ['mtime', 'ctime'], followSymlinks: false});
    tree.children.forEach((child) => {
      if(child.type == 'file'){
        expect(child).to.have.property('mtime')
        expect(child).to.have.property('ctime')
      }
    })
  });

  it('should follow symlinks', () => {
    const tree = dirtree('./test/test_data', {normalizePath: true, followSymlinks: true, attributes: ['size','type','extension'] });
    expect(tree).to.deep.equal(symlinkTree);
  })

  it('should respect "depth = 0" argument', () => {
    const tree = dirtree('./test/test_data', {depth: 0, normalizePath: true, followSymlinks: false, attributes: ['type','extension'] });
    expect(tree).to.deep.equal(testTreeZeroDepth);
  })

  it('should respect "depth = 1" argument', () => {
    const tree = dirtree('./test/test_data', {depth: 1, normalizePath: true, followSymlinks: false, attributes: ['type','extension'] });
    expect(tree).to.deep.equal(testTreeFirstDepth);
  })

  it('should respect "depth = 2" argument', () => {
    const tree = dirtree('./test/test_data', {depth: 2, normalizePath: true, followSymlinks: false, attributes: ['type','extension'] });
    expect(tree).to.deep.equal(testTreeSecondDepth);
  })

  it('should allow size attribute with depth option and set undefined for depth-limited directories', () => {
    const tree = dirtree('./test/test_data', {depth: 1, normalizePath: true, followSymlinks: false, attributes: ['size', 'type','extension'] });

    // Should not throw an error
    expect(tree).to.exist;
    expect(tree.children).to.be.an('array');

    // Files should have numeric size
    const fileNode = tree.children.find(child => child.type === 'file');
    expect(fileNode, 'test data should contain at least one file').to.exist;
    expect(fileNode.size).to.be.a('number');

    // Depth-limited directories should have size as undefined
    const dirNode = tree.children.find(child => child.type === 'directory');
    expect(dirNode, 'test data should contain at least one directory').to.exist;
    expect(dirNode.size).to.be.undefined;

    // Root directory should also have undefined size (propagation)
    expect(tree.size).to.be.undefined;
  })

  it('should handle empty directory with depth and size attributes', () => {
    const tree = dirtree('./test/test_data/some_dir_2', {depth: 0, normalizePath: true, attributes: ['size', 'type'] });

    // Empty directory at depth limit should have undefined size
    expect(tree).to.exist;
    expect(tree.type).to.equal('directory');
    expect(tree.size).to.be.undefined;
    expect(tree.children).to.be.undefined;
  })

  it('should calculate sizes correctly for directory with only files at depth limit', () => {
    const tree = dirtree('./test/test_data/some_dir/another_dir', {depth: 0, normalizePath: true, attributes: ['size', 'type'] });

    // Directory at depth 0 (no children traversed) should have undefined size
    expect(tree).to.exist;
    expect(tree.type).to.equal('directory');
    expect(tree.size).to.be.undefined;
  })

  it('should handle depth: 2 with size attribute correctly', () => {
    const tree = dirtree('./test/test_data', {depth: 2, normalizePath: true, followSymlinks: false, attributes: ['size', 'type'] });

    // Root should have undefined size (contains depth-limited directories)
    expect(tree.size).to.be.undefined;

    // some_dir should be present
    const someDir = tree.children.find(child => child.name === 'some_dir');
    expect(someDir).to.exist;
    expect(someDir.type).to.equal('directory');

    // some_dir should have children (depth 2 allows it)
    expect(someDir.children).to.be.an('array');

    // another_dir inside some_dir should be at depth limit
    const anotherDir = someDir.children.find(child => child.name === 'another_dir');
    expect(anotherDir).to.exist;
    expect(anotherDir.type).to.equal('directory');

    // another_dir is at depth limit (depth 2), so no children property
    expect(anotherDir.children).to.be.undefined;
    expect(anotherDir.size).to.be.undefined;

    // Therefore some_dir also has undefined size (child has undefined)
    expect(someDir.size).to.be.undefined;
  })

  it('should maintain backward compatibility: size without depth works as before', () => {
    const tree = dirtree('./test/test_data', {normalizePath: true, followSymlinks: false, attributes: ['size', 'type'] });

    // Without depth limit, all sizes should be numbers
    expect(tree.size).to.be.a('number');
    expect(tree.size).to.be.greaterThan(0);

    // Check that directories have numeric sizes
    const someDir = tree.children.find(child => child.name === 'some_dir' && child.type === 'directory');
    expect(someDir).to.exist;
    expect(someDir.size).to.be.a('number');
    expect(someDir.size).to.be.greaterThan(0);

    // Check that files have numeric sizes
    const fileNode = tree.children.find(child => child.type === 'file');
    expect(fileNode).to.exist;
    expect(fileNode.size).to.be.a('number');
    expect(fileNode.size).to.be.greaterThan(0);

    // Verify nested directory also has numeric size
    expect(someDir.children).to.be.an('array');
    const anotherDir = someDir.children.find(child => child.name === 'another_dir');
    expect(anotherDir).to.exist;
    expect(anotherDir.size).to.be.a('number');
    expect(anotherDir.size).to.be.greaterThan(0);
  })

});
