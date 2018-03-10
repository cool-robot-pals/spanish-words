require('dotenv').config();
const redis = require('redis');
const chalk = require('chalk');
const fs = require('fs');
const Twitter = require('twitter');
const makeBritish = require('./../lib/makeBritish.js');

const words = fs.readFileSync('./bin/words.txt').toString().split('\n');
const britishWords = words.map(makeBritish);

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

client.get('last', function(err, reply) {
	if(err) {
		console.error(err);
		client.set('last', 0, redis.print);
	}
	console.log(`starting at ${reply}/${words.length}`);
	let posted = false;
	for(let i = reply; i < words.length; i++) {
		if(britishWords[i]!==words[i]) {
			const tweet = [`🇺🇸  ${words[i]}`,`🇬🇧  ${britishWords[i]}`].join('\n');
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
			break;
		}
	}
	if(!posted) {
		console.error(chalk.red('✘ Ran out of words'));
		client.set('last', 0, redis.print);
	}
});
