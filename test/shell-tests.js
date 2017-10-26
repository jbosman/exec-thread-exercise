const expect = require('chai').expect;

// File under test
const nsssh = require('../server/utilities/shell/shell.js');

// Will come back to testing this if there is time
// No need to rest right now as this is secondary
// describe('Shell Tests', () => {

// 	let result;
// 	beforeEach( () => { 
// 		result = null; 
// 	})
// 	afterEach( 	() => { result = null; })
		
// 	describe('-- Test Shell Done Function --', () => {

// 		let output = 'Exec Thread is Awesome!';
// 		function outputFn(output){ result = output; }

// 		it('The Done function should output 2 lines.', () => {
// 			nsssh.done(output);
// 			let resultLines = result.split('\n');
// 			expect( resultLines.length ).to.equal(2);
// 		});

// 		it('The first line should match the string passed into the function.', () => {
// 			nsssh.done(output, outputFn);
// 			let resultLines = result.split('\n');
// 			expect( resultLines[0] ).to.equal(output);
// 		})

// 		it('The second line should match the prompt for the nsssh.', () => {
// 			nsssh.done(output, outputFn);
// 			let resultLines = result.split('\n');
// 			expect( resultLines[1] ).to.equal(nsssh.prompt);
// 		})
// 	})

	

// })