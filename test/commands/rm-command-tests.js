const expect = require('chai').expect;

// Command Under Test
const { rm } = require('../../server/utilities/shell/commands');
// Used to insure the process is moved to the root directory
const { __processToRoot } = require('../../server/utilities/shell/commands');
// Independent testing function to validate date
const { execSync } = require('child_process');
// Source page for finding formatting options for mac terminal date command
// Enter 'man date' in terminal
// Also helpful: http://www.mactricksandtips.com/2010/01/working-with-the-date-function-in-terminal.html  

module.exports = function(){

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

	describe( '----- rm command -----', () => {

		it('Should return a string which tells which file was removed.', () => {
			let newFileName = 'enronFiles.js';
			execSync(`touch ${newFileName}`); // Create file to remove
			rm(done, [newFileName])
			expect(typeof donespy).to.equal('string');
			expect(donespy).to.equal(`Deleted root/${newFileName}.`);
		});

		it('Should indicate if a file fails to be created.', () => {
			let newFileName = 'enronFiles.js';
			rm(done, [newFileName])
			expect(typeof donespy).to.equal('string');
			expect(donespy).to.equal(`rm: unable to delete file: ${newFileName}`);
		});
	});
}