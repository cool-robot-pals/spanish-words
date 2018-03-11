require('dotenv').config();
const redis = require('redis');
const shuffle = require('shuffle-array');
const chalk = require('chalk');
const fs = require('fs');
const Twitter = require('twitter');
const makeSpanish = require('./../lib/makeSpanish.js');

const adjectives = fs.readFileSync('./bin/adjectives.txt').toString().split('\n');
const words = fs.readFileSync('./bin/words.txt').toString().split('\n').map(_=>(
	[
		(Math.random()>.25)?shuffle(adjectives)[0]:null,
		_
	].filter(_=>_!==null)
))


const spanishWords = words.map(_ => [makeSpanish(_).join(' '),_.join(' ')]);

spanishWords.forEach((w,i)=>{
	console.log(w);
});
