const expect = require('chai').expect;

// Command Under Test
const { pwd } = require('../../server/utilities/shell/commands');
// Used as a helper function to move the nodeJS process around
const { cd } = require('../../server/utilities/shell/commands');
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

	beforeEach( () => { donespy = '' });
	afterEach( () => { donespy = '' });

	describe( '----- pwd command -----', () => {

		it('Should return a string.', () => {
			pwd(done);
			expect(typeof donespy).to.equal('string');
		})

		// Note that the NodeJS process is pushed to root by the cd command
		// which is tested prior to pwd
		it('Should represent the current directory.', () => {
			pwd(done);
			expect(donespy).to.equal('root');
		});

		// Make sure this is done last... once we push the nodeJS process into the sandbox root
		// folder we can't move it out
		it('Should update path after directory has been switched.', () => {
			
			let newDir = 'testing123';
			execSync(`mkdir ${newDir}`);
			//execSync('cd testing123');
			cd( done,[newDir]); // Was unable to get execSync to move the nodeJS process
			expect(donespy).to.equal(`Changed directory to root/${newDir}`);
			donespy = null;
			pwd(done);
			expect(donespy).to.equal(`root/${newDir}`); // Make sure the cd worked
			cd( done,['..']); // Was unable to get execSync to move the nodeJS process
			expect(donespy).to.equal(`Changed directory to root`);
			execSync(`rm -r ${newDir}`);
		});
	});
}