const pluralize = require('pluralize');

const makeSpanish = word => {

	const original = word;

	/*rng*/
	const seed = (word.split('').reverse().map(_=>_.codePointAt(0)).join('')%100)/100
	const otherSeed = (word.split('').map(_=>_.codePointAt(0)).join('')%100)/100

	/*wow problematic*/
	const genderIsFemale = seed > .5;
	const genderCharacter = genderIsFemale?'a':'o';
	const genderAdjective = genderIsFemale?'la':'el';

	/*ajectives*/
	const hasAdj = otherSeed > .6;

	/*wrapped => wrappado*/
	word = word.replace(/ed$/g,`ad${genderCharacter}`);

	/*wrapping => wrappeando*/
	word = word.replace(/ing/g,`eand${genderCharacter}`);

	/*ph*/
	word = word.replace(/ph/g,`f`);

	/*normalize*/
	word = word.replace(/[e,o,a]$/g,`${genderCharacter}`);

	/*easiest*/
	if(pluralize.isPlural(original)) {
		word = `${word.slice(0,-1)}${genderCharacter}${word.slice(-1)}`
	}
	else {
		word = `${word}${genderCharacter}`;
	}

	/*remove all doubles*/
	word = word.replace(/([a-z])\1/g, '$1');

	/*ajective it*/
	if(hasAdj) {
		word = `${genderAdjective} ${word}`;
	}

	return word;

};

module.exports = makeSpanish;
