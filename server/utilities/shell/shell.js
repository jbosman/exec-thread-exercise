const commands = require('./commands');
const util = require('./utilities');
const prompt = 'prompt >';

// Utilize these variables as first order functions
// Makes testing easier and allows for different i/o mechanisms
let inputFn = null;
let outputFn = null;

// Decipher input data and pass it along to be executed
function readData( data ){
	let user_cmd, args, user_cmd_args = data.toString().trim().split(" ");
	// Index 0 will be the cmd and the rest are arguments
	[ user_cmd, ...args ] = user_cmd_args; 
	
	executeCmd( user_cmd, args);
}

function executeCmd(user_cmd, args){
	if( commands[user_cmd] )
		commands[user_cmd]( done, args);
	else
		done( 'unrecognized command: ' + user_cmd, outputFn );
}

// Report results to user and re-prompt
function done( output ){ 
	outputFn(output + '\n' + prompt); 
}

// Execute shell with provided input and output methods
function runShell( inputFunc = null, outputFunc = null ){

	[inputFn, outputFn] = [inputFunc, outputFunc];

	// Make sure input and output functions have been provided
	if( !inputFn ) throw Error('Must provide an input function to runShell.');
	if( !outputFn ) throw Error('Must provide an output function to runShell.');

	// Giver user a prompt to start
	outputFn(prompt);
	// Wait for user input
	inputFn( readData );
}

module.exports = {
	runShell,
	readData,
	executeCmd,
	done,
	prompt
}


