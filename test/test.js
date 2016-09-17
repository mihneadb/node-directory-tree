'use strict';

const expect = require('chai').expect;
const dirtree = require('../lib/directory-tree');
const testTree = require('./fixture.js');


describe('directoryTree', () => {

	it('should return an Object', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree).to.be.an('object');
	});

	it('should list the children in a directory', () => {
		const tree = dirtree('./test/test_data', ['.txt']);

		// 4 including the empty `some_dir_2`.
		expect(tree.children.length).to.equal(4);
	});

	it('should display the size of a directory (summing up the children)', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree.size).to.be.above(11000);
	});

	it('should not crash with directories where the user does not have necessary permissions', () => {
		const tree = dirtree('/root/', ['.txt']);
		expect(tree).to.equal(null);
	});

	it('should return the correct exact result', () => {
		const tree = dirtree('./test/test_data');
		expect(tree).to.deep.equal(testTree);
	});
});
