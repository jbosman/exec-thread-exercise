const expect = require('chai').expect;

// Command Under Test
const { ls } = require('../../server/utilities/shell/commands');
// Independent testing function to validate date
const { execSync } = require('child_process');
// Source page for finding formatting options for mac terminal date command
// Enter 'man date' in terminal
// Also helpful: http://www.mactricksandtips.com/2010/01/working-with-the-date-function-in-terminal.html  

module.exports = function(){

	describe( '----- ls command -----', function(){

		it('Should return a string.', function(done){
			
			ls(function(output){
				expect(typeof output).to.equal('string');
				done();
			});
		});

		it('Should match the directories and files for the current node process.', function(done){

			ls(function(output){
				let outputArr = output.split('\n');
				// ls -a contains more hidden files than our nodeJS fs.readDir command
				let indepentSrc = execSync(`ls -a`).toString();
				// This is a little hokey, but it's better than nothing...
				// Atleast we're testing that all the files we get back are valid
				outputArr.forEach((file, i, origArr) => {
					expect(indepentSrc.indexOf(origArr[i])).to.not.equal(-1);
				})
				done();
			});
		});
	});
}