const CMD_ECHO_TESTS = require('./commands/echo-command-tests');
const CMD_DATE_TESTS = require('./commands/date-command-tests');
const CMD_LS_TESTS = require('./commands/ls-command-tests');

const CMD_CD_TESTS = require('./commands/cd-command-tests');
const CMD_PWD_TESTS = require('./commands/pwd-command-tests');
const CMD_MKDIR_TESTS = require('./commands/mkdir-command-tests');
const CMD_TOUCH_TESTS = require('./commands/touch-command-tests');
const CMD_RM_TESTS = require('./commands/rm-command-tests');
const CMD_CAT_TESTS = require('./commands/cat-command-tests');
const CMD_HEAD_TESTS = require('./commands/head-command-tests');
const CMD_TAIL_TESTS = require('./commands/tail-command-tests');


describe('Commands Testing', () => {

	CMD_ECHO_TESTS();
	CMD_DATE_TESTS();
	CMD_LS_TESTS();

	// Make sure these tests are last
	// Once the nodeJS process is pushed into the sandbox root folder we can't take it out
	// What a feature!! :)
	CMD_CD_TESTS();
	CMD_PWD_TESTS();
	CMD_MKDIR_TESTS();
	CMD_TOUCH_TESTS();
	CMD_RM_TESTS(); 
	CMD_CAT_TESTS();
	CMD_HEAD_TESTS();
	CMD_TAIL_TESTS();

});