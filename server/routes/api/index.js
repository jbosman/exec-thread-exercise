const express = require('express');
const router = express.Router();
const commands = require('../../utilities/shell/commands');

function done(output){ res.send(output); }

router.get('/shell-cmd/:cmd', (req, res) => {
	function done(output){ res.send(output); }
	
	if( commands[req.params.cmd] )
		commands[req.params.cmd](done);
	else
		done(`${req.params.cmd}: command not found.`);
});

router.get('/shell-cmd/:cmd/:args', (req, res) => {
	function done(output){ res.send(output); }
	let args = JSON.parse(req.params.args);

	if( commands[req.params.cmd] )
		commands[req.params.cmd](done, args);
	else
		done(`${req.params.cmd}: command not found.`);
});

module.exports = router;
