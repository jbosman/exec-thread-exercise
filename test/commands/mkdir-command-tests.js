const expect = require('chai').expect;

// Command Under Test
const { mkdir } = require('../../server/utilities/shell/commands');

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

	beforeEach( () => { donespy = '' });
	afterEach( () => { donespy = '' });

	describe( '----- mkdir command -----', () => {

		it('Should return a string which tells what directory it has created.', () => {
			let newDirName = 'JohnSnow';
			mkdir(done, [newDirName])
			expect(typeof donespy).to.equal('string');
			expect(donespy).to.equal(`Created ${newDirName} directory.`);
			//Clean up
			execSync(`rm -r ${newDirName}`);
		});

		it('Should indicate if it fails to create a new directory.', () => {
			let newDirName = 'JohnSnow';
			mkdir(done, [newDirName])
			expect(donespy).to.equal(`Created ${newDirName} directory.`);
			donespy = null;
			mkdir(done, [newDirName])
			expect(donespy).to.equal(`mkdir: unable to create directory: ${newDirName}`);
			execSync(`rm -r ${newDirName}`);
		});
	});
}