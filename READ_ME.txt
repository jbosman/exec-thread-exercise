// Setup
Requirements:
	NodeJS must be installed

// Quick start guide
Step 1. npm install to download required node_modules files.
Step 2. Run command 'node server' in the root directory.
	a. I've provided the public folder so no gulping is required.
Step 3. Open chrome and navigate to localhost: http://localhost:3000/
Step 4. Make sure to click out of the prompt input field and press 'shift + /' (.i.e. question mark).
		This will bring up a menu of the available hot keys in the application.
		One I'll point out right now is you can play and pause the music with 'command + p'
		** Note ** All hot keys are available both in and out of prompt input field execpt for the question mark.
Step 5. See commands below to have a ball!

// If developing
Step 1. npm install to download required node_modules files.
-- The following steps should be executed in their own terminal windows
Step 2. Run command 'gulp' in root directory.
Step 3. Run command 'npm start' to watch files while developing.
	a. Note this will cause strange functionality if try to use the application
	to create files or directories as nodemon will see these changes and restart
	the server.
Step 4. To execute tests, run command npm test.

// Server Side Commands
cat		Prints full file.
head	Prints first 5 lines of file.
tail	Prints last 5 lines of file.
echo	Echos following arguments.
ls		Prints files and directories in current directory. 
pwd		Prints path of current directory.
date 	Prints date, time, and time zone of server location.
cd		Changes path to provides directory.
mkdir	Creates new directory with given name.
touch	Creates new files with given name.
rm		Removes file with given name.

// Client Side Commands
changePrompt			Updates prompt to string containing arguments provided.
clientDate				Prints the date, time, and time zone of client.
doogie					Updates theme to Doogie Howser theme.
teach					** Easter Egg ** If provided the command with arguments: 
						"teach me how to dougie" updates them to Dougie (Cali Swag District)
						Happy Easter!!! :)