'use strict';

const expect = require('chai').expect;
const dirtree = require('../lib/directory-tree');


describe('directoryTree', () => {

	it('should return an Object', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree).to.be.an('object');
	});

	it('should list the children in a directory', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree.children.length).to.equal(3);
	});

	it('should display the size of a directory (summing up the children)', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree.size).to.be.above(11000);
	});

});
