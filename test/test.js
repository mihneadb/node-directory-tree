var expect = require('chai').expect;
var dirtree = require('../lib/directory-tree');


describe('directoryTree', function() {
  it('should return an Object', function() {
    var tree = dirtree('./test/test_data', ['.DS_Store', '.gitkeep']);
    expect(tree).to.be.an('object');
  });

  it('should list the children in a directory', function() {
    var tree = dirtree('./test/test_data', ['.DS_Store', '.gitkeep']);
    expect(tree.children.length).to.equal(3);
  });

  it('should display the size of a directory (summing up the children)', function() {
    var tree = dirtree('./test/test_data', ['.DS_Store', '.gitkeep']);
    expect(tree.size).to.equal(11304);
  });
});
