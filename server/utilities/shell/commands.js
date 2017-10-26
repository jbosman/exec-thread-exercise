const fs = require('fs');
const util = require('./utilities');
const path = require('path');

// Limit shell to this path by default
const shellSandbox = path.join( __dirname, './sandbox/root');

// Command functions

// File IO commands
function cat(done, args){ util.readFile(args, 0, done); }

function head(done, args){ util.readFile(args, 5, done); }

function tail(done, args){ util.readFile(args, -5, done); }

// Directory commands
function ls(done){
	
	fs.readdir( process.cwd(), (err, files) => {
		if(err) throw err;
		done(files.join('\n'));
	});
}

function pwd(done){ done( removeBasePath(process.cwd()) ); }

function cd(done, args){
	const filePath = generatePath(args[0]);
	try{ 
		process.chdir(filePath); 
	}
	catch(err){
		done(`cd: ${args[0]}: no such directory exists.`);
		return; // Ahh this is why you do testing!
	}

	done( removeBasePath(`Changed directory to ${process.cwd()}`));
}

function mkdir(done, args){
	const filePath = generatePath(args[0]);

	try{ fs.mkdirSync(filePath);}
	catch(err){
		done(`mkdir: unable to create directory: ${args[0]}`);
		return;
	}

	done( removeBasePath(`Created ${args[0]} directory.`));
}

function touch(done, args){
	const filePath = generatePath(args[0]);
	
	try{ fs.openSync( filePath, 'w'); }
	catch(err){
		done(`touch: unable to create ${removeBasePath(filePath)}`);
		return;
	}
	
	done( removeBasePath(`Created ${filePath}.`) );
}

function rm(done, args){
	const filePath = generatePath(args[0]);
	
	try{ fs.unlinkSync(filePath); }
	catch(err){
		done(`rm: unable to delete file: ${args[0]}`);
		return;
	}

	done( removeBasePath(`Deleted ${filePath}.`)) ;
}

// Misc commands

function date(done){ done( new Date().toString()) }

function echo(done, args){ done( args.join(" ")) }

// Helper functions

// Should be used at the start to point the process
// to the sandbox root directory
function setProcessToROOT(){
	try{ process.chdir(shellSandbox); }
	catch(err){ console.err(err); }
}

// Makes sure a given path file is limited to limitPath
// Allows for siloing a user to specific directory
function generatePath( pathToCheck, limitPath = shellSandbox){
	const currentDir = process.cwd();
	const filePath = path.join(currentDir, pathToCheck);

	// Make sure path stops at root with checkPath
	// Limiting user to root directory
	return filePath.length < limitPath.length ? limitPath : filePath;
}

function removeBasePath( pathToCheck, basePath = shellSandbox){
	return pathToCheck.replace(basePath, 'root');
}

module.exports = {
	cat,
	head,
	tail,
	echo, 	
	ls, 	
	pwd,	
	date, 	
	cd,		
	mkdir,  
	touch,  
	rm,
	__processToRoot: setProcessToROOT
}