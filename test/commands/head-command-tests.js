const expect = require('chai').expect;

// Command Under Test
const { head } = require('../../server/utilities/shell/commands');
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

	beforeEach( () => { 
		__processToRoot(); // Push to root
		donespy = '' });
	afterEach( () => { 
		donespy = '' });

	describe( '----- head command -----', () => {

		it('Should return a string with firts five lines of the file.', (mochaDone) => {
			let newFile = 'boringFile.js';
			
			function done(output){
				donespy = output;
				expect(typeof donespy).to.equal('string');
				expect(donespy).to.equal(`${dummyString}`);
				execSync(`rm ${newFile}`)
				mochaDone();
			}
			
			let dummyString = '';
			
			execSync(`touch ${newFile}`);
			
			for(let i = 1; i <= 10; i++){
				let newLine = `Line number ${i}`;
				if( i <= 5)
					dummyString += newLine + '\n';
				execSync(`echo ${newLine} >> ${newFile}`)
			}
			
			head(done, newFile)
			
		});

		it('Should indicate if a file fails to be read.', (mochaDone) => {
			let nonExistingFile = 'boringFile.js';

			function done(output){
				donespy = output;
				expect(donespy).to.equal(`Failed to read ${nonExistingFile}`);
				mochaDone();
			}

			head(done, nonExistingFile)
		});
	});
}