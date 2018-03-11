require('dotenv').config();
const redis = require('redis');
const chalk = require('chalk');
const shuffle = require('shuffle-array');
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

const client = redis.createClient(process.env.REDIS_URL);

const chirpy = new Twitter({
	consumer_key: process.env.TWITTER_CK,
	consumer_secret: process.env.TWITTER_CS,
	access_token_key: process.env.TWITTER_TK,
	access_token_secret: process.env.TWITTER_TS
});

client.on('error', function (err) {
	console.log('Error ' + err);
});

client.get('last', function(err, i) {
	if(err) {
		console.error(err);
		client.set('last', 0, redis.print);
	}
	console.log(`starting at ${i}/${words.length}`);
	let posted = false;
	if(words[i]) {
		const tweet = [`🇬🇧  ${words[i].join(' ')}`,`🇪🇸  ${makeSpanish(words[i]).join(' ')}`].join('\n');
		posted = true;
		client.set('last', parseInt(i)+1);
		chirpy.post('statuses/update', {status: tweet}, (error) => {
			if(error) {
				console.error(chalk.red('✘ Post failed'));
				console.error(error);
				throw error;
			}
			else {
				console.info(chalk.green(`✔ Posted: ${tweet}`));
			}
		});
	} else {
		console.error(chalk.red('✘ Ran out of words'));
		client.set('last', 0, redis.print);
	}
	client.quit();
});
