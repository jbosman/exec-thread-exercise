const expect = require('chai').expect;

// Command Under Test
const { cd } = require('../../server/utilities/shell/commands');

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

	__processToRoot(); // Push to root directory

	beforeEach( () => { donespy = '' });
	afterEach( () => { donespy = '' });

	describe( '----- cd command -----', () => {

		it('Should return a string which tells what directory it has changed too.', () => {
			let testDir = 'testing';
			execSync(`mkdir ${testDir}`);
			cd(done, [testDir]);
			expect(typeof donespy).to.equal('string');
			expect(donespy).to.equal(`Changed directory to root/${testDir}`);
			donespy = null;
			cd(done, ['..']); // Move back to original directory
			expect(donespy).to.equal(`Changed directory to root`);
			execSync(`rm -r ${testDir}`);
		})

		it('Should indicate if it fails to move to a directory.', () => {
			let noneExistantDir = 'darkSideOfTheMoon';
			cd( done, [noneExistantDir]);
			expect(donespy).to.equal(`cd: ${noneExistantDir}: no such directory exists.`)
		})

		it('Should contain the user to root directory if they try to move to a higher directory.', () => {
			cd( done, ['..']);
			expect(donespy).to.equal(`Changed directory to root`);
			donespy = null;
			cd( done, ['../..']);
			expect(donespy).to.equal(`Changed directory to root`);
		});
	});
}