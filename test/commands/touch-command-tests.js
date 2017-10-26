const expect = require('chai').expect;

// Command Under Test
const { touch } = require('../../server/utilities/shell/commands');
// Used to insure the process is moved to the root directory
const { __processToRoot } = require('../../server/utilities/shell/commands');
// Independent testing function to validate date
const { execSync } = require('child_process');
// Source page for finding formatting options for mac terminal date command
// Enter 'man date' in terminal
// Also helpful: http://www.mactricksandtips.com/2010/01/working-with-the-date-function-in-terminal.html  

module.exports = function(){

	__processToRoot(); // Push to root

	// Helpers to spy on commands
	let donespy = '';
	function done(output){
		donespy = output;
	}

	beforeEach( () => { 
		__processToRoot(); // Push to root
		donespy = '' });
	afterEach( () => { 
		donespy = '' });

	describe( '----- touch command -----', () => {

		it('Should return a string which tells where and what file was created.', () => {
			let newFileName = 'Spock.js';
			touch(done, [newFileName])
			expect(typeof donespy).to.equal('string');
			expect(donespy).to.equal(`Created root/${newFileName}.`);
			//Clean up
			execSync(`rm ${newFileName}`);
		});

		it('Should indicate if a file fails to be created.', () => {
			let newFileName = '\000invalidFileName';
			touch(done, [newFileName])
			expect(donespy).to.equal(`touch: unable to create root/${newFileName}`);
		});
	});
}