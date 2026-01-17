#!/usr/bin/env node

const fs = require('fs');
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const directoryTree = require('../lib/directory-tree');

const optionList = [
    {
        name: 'path',
        alias: 'p',
        required: true,
        defaultOption: true,
        typeLabel: '{underline string}',
        description: '🗂 The input folder to process. Required.'
    },
    {
        name: 'exclude',
        alias: 'e',
        type: String,
        description: '🐒 Exclude some folders from processing by regexp string. Ex -e "test_data/some_dir$|js|.DS_Store"'
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        description: '📝 Put result into file provided by this options. Overwrites if exists.'
    },
    {
        name: 'depth',
        alias: 'd',
        type: Number,
        description: '☞ Reads dirs in deep as specified. When used with size attribute, depth-limited directories will have size: undefined.'
    },
    {
        name: 'attributes',
        type: String,
        description: 'ℹ️ Grab file attributes. Example: --attributes size,type,extension. When used with depth, directories may have size: undefined.'
    },
    {
        name: 'pretty',
        type: Boolean,
        description: '💎 Json pretty print'
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: '⁉️ Print this usage guide.'
    }
]

const usageNotes = [
    {
        header: '⛄️️ Folder-tree command line script',
        content: 'Used for generates json representation of folder internals'
    },
    {
        header: '🔥 Options 🔥',
        optionList: optionList
    }
]

const usage = commandLineUsage(usageNotes)
let options = null;
try {
    options = commandLineArgs(optionList)
} catch(e) {
    console.log(usage);
    return;
}

if (Object.keys(options).length === 0 || options.help || !options.path) {
    console.log(usage)
    return;
}

if (!fs.existsSync(options.path)) {
    console.log('-----------------------------------------------------------------------------------------------------')
    console.log(`doesn't exist; please check your args`);
    console.log('-----------------------------------------------------------------------------------------------------')
    console.log(usage)
    return;
}

try {
    const result = directoryTree(options.path, {
        depth: options.depth,
        exclude: options.exclude ? [new RegExp(options.exclude)] : undefined,
        attributes: options.attributes ? options.attributes.split(',') : undefined
    })

    const resultString = JSON.stringify(result, null, options.pretty ? '  ' : '');
    if (options.output) {
        fs.writeFileSync(options.output, resultString);
    } else {
        console.log(resultString);
    }
} catch(e) {
    console.log(e);
    console.log(usage);
}
