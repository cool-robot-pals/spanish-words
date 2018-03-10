require('dotenv').config();
const redis = require('redis');
const chalk = require('chalk');
const fs = require('fs');
const Twitter = require('twitter');
const makeBritish = require('./../lib/makeBritish.js');

const words = fs.readFileSync('./bin/words.txt').toString().split('\n');
const britishWords = words.map(_ => [makeBritish(_),_]).filter((word)=> word[0] !== word[1] );

britishWords.forEach((w,i)=>{
	console.log(w);
});
