const commandLineArgs = require('command-line-args')
const makeSpanish = require('./../lib/makeSpanish.js');
const optionDefinitions = [
	{ name: 'word', alias: 'w', type: String, defaultOption: true }
];
const options = commandLineArgs(optionDefinitions);

console.log(makeSpanish(options.word));
