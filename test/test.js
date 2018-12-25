'use strict';

const expect = require('chai').expect;
const dirtree = require('../lib/directory-tree');
const testTree = require('./fixture.js');
const excludeTree =  require('./fixtureExclude.js')
const excludeTree2 =  require('./fixtureMultipleExclude.js')


describe('directoryTree', () => {

	it('should return an Object', () => {
		const tree = dirtree('./test/test_data', {extensions:/\.txt$/});
		expect(tree).to.be.an('object');
	});

	it('should list the children in a directory', () => {
		const tree = dirtree('./test/test_data', {extensions:/\.txt$/});

		// 4 including the empty `some_dir_2`.
		expect(tree.children.length).to.equal(4);
	});

	it('should execute a callback function for each file with no specified extensions', () => {
		let number_of_files =  7;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', null, function(item, PATH) {
			callback_executed_times++;
		});

		expect(callback_executed_times).to.equal(number_of_files);
	});

	it('should execute a callback function for each directory', () => {
		let number_of_directories = 4;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', null, null, function(item, PATH) {
			callback_executed_times++;
		});

		expect(callback_executed_times).to.equal(number_of_directories);
	});

	it('should execute a callback function for each file with specified extensions', () => {
		let number_of_files =  6;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', {extensions:/\.txt$/}, function(item, PATH) {
			callback_executed_times++;
		});
		expect(callback_executed_times).to.equal(number_of_files);
	});

	it('should display the size of a directory (summing up the children)', () => {
		const tree = dirtree('./test/test_data', {extensions:/\.txt$/});
		expect(tree.size).to.be.above(11000);
	});

	it('should not crash with directories where the user does not have necessary permissions', () => {
		const tree = dirtree('/root/', {extensions:/\.txt$/});
		expect(tree).to.equal(null);
	});

	it('should return the correct exact result', () => {
		const tree = dirtree('./test/test_data', {normalizePath: true});
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
		const tree = dirtree('./test/test_data',{exclude: /another_dir/, normalizePath: true});
		expect(tree).to.deep.equal(excludeTree);
	});

	it('should exclude multiple folders', () => {
		const tree = dirtree('./test/test_data', {exclude: [/another_dir/, /some_dir_2/], normalizePath: true});
		expect(tree).to.deep.equal(excludeTree2);

	});

	it('should include attributes', () => {
		const tree = dirtree('./test/test_data',{ attributes: ['mtime', 'ctime']});
		tree.children.forEach((child) => {
			if(child.type == 'file'){
				expect(child).to.have.property('mtime')
				expect(child).to.have.property('ctime')
			}
		})
	});

});
