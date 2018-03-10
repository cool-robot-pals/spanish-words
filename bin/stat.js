require('dotenv').config();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', function (err) {
	console.log('Error ' + err);
});

client.get('last', redis.print);
