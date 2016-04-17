'use strict';

const FS = require('fs');
const PATH = require('path');

function directoryTree (path, extensions) {
	const name = PATH.basename(path);
	const item = { path, name };
	let stats;

	try { stats = FS.statSync(path); }
	catch (e) { return null; }

	if (stats.isFile()) {
		const ext = PATH.extname(path).toLowerCase();
		if (extensions && extensions.length && extensions.indexOf(ext) === -1) return null;
		item.size = stats.size;  // File size in bytes
	}
	else {
		item.children = FS.readdirSync(path)
			.map(child => directoryTree(PATH.join(path, child), extensions))
			.filter(e => !!e);
		if (!item.children.length) return null;
		item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
	}
	return item;
}

module.exports = directoryTree;
