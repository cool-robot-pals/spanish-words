const commandLineArgs = require('command-line-args')
const makeBritish = require('./../lib/makeBritish.js');
const optionDefinitions = [
	{ name: 'word', alias: 'w', type: String, defaultOption: true }
];
const options = commandLineArgs(optionDefinitions);

console.log(makeBritish(options.word));
