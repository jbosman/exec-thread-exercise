const expect = require('chai').expect;

// Command Under Test
const { echo } = require('../../server/utilities/shell/commands');

module.exports = function(){

	// describe('Commands Testing', () => {

		// Helpers to spy on commands
		let donespy = '';
		function done(output){
			donespy = output;
		}

		beforeEach( () => { donespy = '' });
		afterEach( () => { donespy = '' });

		describe( '----- echo command -----', () => {

			describe('Should return a string for primative types.', () => {
				
				it('Number', () => {
					let input = 23;
					echo( done, [ input ]);
					expect(typeof input).to.equal('number');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal(input.toString());
				});

				it('Boolean', () => {
					let input = true;
					echo( done, [ input ]);
					expect(typeof input).to.equal('boolean');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal(input.toString());
				});

				it('String', () => {
					let input = 'Ahh ahh ahh, you didn\'t say the magic word';
					echo( done, [ input ]);
					expect(typeof input).to.equal('string');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal(input);
				});

				it('Object', () => {
					let input = { prop: 'value' };
					echo( done, [ input ]);
					expect(typeof input).to.equal('object');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal(input.toString());
				});

				it('null', () => {
					let input = null;
					echo( done, [ input ]);
					expect(Object.prototype.toString.call(input)).to.equal('[object Null]');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal('');
				});

				it('undefined', () => {
					let input = undefined;
					echo( done, [ input ]);
					expect(typeof input).to.equal('undefined');
					expect(typeof donespy).to.equal('string');
					expect(donespy).to.equal('');
				});

			});

			describe('Should return a string spaced with elements of the supplied array.', () => {

				it('If supplied and empty array it should return an empty string.', () => {
					echo(done, [])
					expect(donespy).to.equal('');
				});

				it('The returned string should contain the same number of elements as the supplied array.', () => {
					let input = ['one', 'two', 'three'];
					echo(done, input);
					let outputArr = donespy.split(" ");
					expect(outputArr.length).to.equal(input.length);
					expect(outputArr[0]).to.equal( input[0] );
					expect(outputArr[1]).to.equal( input[1] );
					expect(outputArr[2]).to.equal( input[2] );
				});

				it('The returned string should be in the same order as the elements as the supplied array.', () => {
					let input = ['first', 'second', 'third'];
					echo(done, input);
					let outputArr = donespy.split(" ");
					expect(outputArr.length).to.equal(input.length);
					expect(outputArr[0]).to.equal( input[0] );
					expect(outputArr[1]).to.equal( input[1] );
					expect(outputArr[2]).to.equal( input[2] );
				})
			})
			
		});

	// });
}