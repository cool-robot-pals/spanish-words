require('dotenv').config();
const redis = require('redis');
const chalk = require('chalk');
const fs = require('fs');
const Twitter = require('twitter');
const makeSpanish = require('./../lib/makeSpanish.js');

const words = fs.readFileSync('./bin/words.txt').toString().split('\n');
const spanishWords = words.map(_ => [makeSpanish(_),_]).filter((word)=> word[0] !== word[1] );

spanishWords.forEach((w,i)=>{
	console.log(w);
});
