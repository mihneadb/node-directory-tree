var expect = require('chai').expect;
var dirtree = require('../lib/directory-tree');


describe('directoryTree', function() {
  it('should return an Object', function() {
    var tree = dirtree.directoryTree('./test/test_data');
    expect(tree).to.be.an('object');
  });
  it('should display file size as a dir', function() {
    var tree = dirtree.directoryTree('./test/test_data');
    console.log(tree);
    expect(tree).to.be.an('object');
  });
});
