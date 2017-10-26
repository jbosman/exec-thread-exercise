app.factory('clientCmdsFactory', (themeFactory, musicFactory, shellDetails) => {

	function changePrompt(args){
		shellDetails.prompt = args.join(' ');
	}

	// Useful if the client is in a different time zone then the server
	function clientDate(){
		return new Date().toString();
	}

	// Switch back to Doogie Howser theme
	function doogie(){
		themeFactory.updateTheme(themeFactory.DOOGIE_THEME);
		musicFactory.updateAudio();
	}

	// cmd: teach   args: ['me', 'how', 'to', 'dougie']
	function teachDougie(args){
		if(args.join(' ') !== 'me how to dougie') return;
		themeFactory.updateTheme(themeFactory.DOUGIE_THEME);
		musicFactory.updateAudio();
	}

	
	return {
		changePrompt,
		clientDate,
		doogie,
		teach: teachDougie
	}

});
