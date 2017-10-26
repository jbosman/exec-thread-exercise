const expect = require('chai').expect;

// Command Under Test
const { date } = require('../../server/utilities/shell/commands');
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

	describe( '----- date command -----', () => {

		it('Should return a string.', () => {
			date(done);
			expect(typeof donespy).to.equal('string');
		})

		describe('The string should represent the current date and time.', () => {
			// Call the date command. Returns a string in the following format:
			// Day-of-Week Month DD YYYY HH:MM:SS Timezone
			it('Should represent the correct day of the week.', () => {
				let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
				date(done);
				const dateCMDday = daysOfWeek[ new Date(donespy).getDay() ];
				const terminalDay = execSync("date '+%a'").toString().trim();
				expect(dateCMDday).to.equal(terminalDay);
			});

			it('Should represent the correct month.', () => {
				let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				date(done);
				const dateCMDMonth = months[new Date(donespy).getMonth()];
				const terminalMonth = execSync("date '+%b'").toString().trim();
				expect(dateCMDMonth).to.equal(terminalMonth);
			});

			it('Should represent the correct day in the month.', () => {
				date(done);
				const dateCMDday = new Date(donespy).getDate();
				const terminalDay = Number(execSync("date '+%d'").toString().trim());
				expect(dateCMDday).to.equal(terminalDay);
			});

			it('Should represent the correct year.', () => {
				date(done);
				const dateCmdYear = new Date(donespy).getFullYear();
				const terminalYear = Number(execSync("date '+%Y'").toString().trim());
				expect(dateCmdYear).to.equal(terminalYear);
			});

			it('Should represent the correct hour.', () => {
				date(done);
				const dateCmdHour = new Date(donespy).getHours();
				const terminalHour = Number(execSync("date '+%H'").toString().trim());
				expect(dateCmdHour).to.equal(terminalHour);
			});

			it('Should represent the correct minute.', () => {
				date(done);
				const dateCmdMinutes = new Date(donespy).getMinutes();
				const terminalMinutes = Number(execSync("date '+%M'").toString().trim());
				expect(dateCmdMinutes).to.equal(terminalMinutes);
			});
			it('Should represent the correct second.', () => {
				date(done);
				const dateCmdSeconds = new Date(donespy).getSeconds();
				const terminalSeconds = Number(execSync("date '+%S'").toString().trim());
				expect(dateCmdSeconds).to.equal(terminalSeconds);
			});
		});
	});
}