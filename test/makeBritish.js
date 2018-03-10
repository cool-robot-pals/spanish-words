const chai = require('chai');
const makeBritish = require('./../lib/makeBritish.js');

describe('Basic', function() {

	it('should make words spanish',()=>{

		chai.expect(makeBritish('twinks')).to.equal('twinkos');

	});

});
