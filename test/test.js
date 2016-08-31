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

	it('should execute a callback function for each file with no specified extensions', () => {
		let number_of_files =  7;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', null, function(item, PATH) {
			callback_executed_times++;
		});

		expect(callback_executed_times).to.equal(number_of_files);
	});

	it('should execute a callback function for each file with a specified extension', () => {
		let number_of_files =  6;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', ['.txt'], function(item, PATH) {
			callback_executed_times++;
		});

		expect(callback_executed_times).to.equal(number_of_files);
	});

	it('should display the size of a directory (summing up the children)', () => {
		const tree = dirtree('./test/test_data', ['.txt']);
		expect(tree.size).to.be.above(11000);
	});

	it('should not crash with directories where the user does not have necessary permissions', () => {
		const tree = dirtree('/root/', ['.txt']);
		expect(tree).to.equal(null);
	});
});
