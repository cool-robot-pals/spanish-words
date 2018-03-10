const chai = require('chai');
const makeSpanish = require('./../lib/makeSpanish.js');

describe('Basic', function() {

	it('should make words spanish',()=>{

		chai.expect(makeSpanish('twinks')).to.equal('twinkos');

	});

});
