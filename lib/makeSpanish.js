const pluralize = require('pluralize');

const makeSpanish = (words) => {

	const seed = (words.join('').split('').reverse().map(_=>_.codePointAt(0)).join('')%100)/100
	const thirdSeed = (words.join('').toUpperCase().split('').reverse().map(_=>_.codePointAt(0)).join('')%100)/100
	const otherSeed = (words.join('').split('').map(_=>_.codePointAt(0)).join('')%100)/100

	/*wow problematic*/
	const genderIsFemale = seed > .55;
	const genderCharacter = genderIsFemale?'a':'o';
	const genderPrep = genderIsFemale?'la':'el';

	/*preposition*/
	const hasPreposition = otherSeed > .6;

	const makeSpanishWord = word => {

		const original = word;

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

		/*rae.es told me to do this*/
		word = word.replace(/ck/g, 'qu');
		word = word.replace(/wh/g, 'gu');
		word = word.replace(/(?!^)y([aeiou])/g, 'i$1');
		word = word.replace(/^y([aeiou])/g, 'j$1');

		/*alt+n + n*/
		word = word.replace(/(ny|ni)/g,`ñ`);
		return word;

	};

	words = [...words].reverse().map(makeSpanishWord);

	/*prepos it*/
	if(hasPreposition) {
		words.unshift(genderPrep);
	}

	return words;
}

module.exports = makeSpanish;
