app.factory('shellFactory', ($http, $log, shellDetails, cmdLogFactory, clientCmdsFactory) => {

	const cmdRoute = 'api/shell-cmd/';
	let results = [];
	
	function buildApiReqStr(user_cmd, args){
		// args will be undefined if none are provided
		let argsRequest = args.length ? `/${JSON.stringify(args)}` : ''; 
	
		return `${cmdRoute}${user_cmd}${argsRequest}`;
	}

	function parseCmd(cmd){
		let [ user_cmd, ...args ] = cmd.split(' ');
		return {
			user_cmd,
			args
		}
	}

	function submitCmd(cmd){
		// If user just pressed enter or provided an empty string
		if(!cmd) {
			results.push(shellDetails.prompt);
			return; 
		}
		let cmdObj = parseCmd(cmd);

		cmdLogFactory.addCmdToLog(cmd);
		console.log(clientCmdsFactory)
		// Check if it's a client side commandß
		if(clientCmdsFactory[cmdObj.user_cmd]){
			results.push(shellDetails.prompt + cmd);
			results.push(clientCmdsFactory[cmdObj.user_cmd](cmdObj.args));
		}
		else{
			$http.get(buildApiReqStr(cmdObj.user_cmd, cmdObj.args))
			.then((res) => {
				results.push(shellDetails.prompt + cmd);
				results.push(res.data);
				window.scrollTo(0,document.body.scrollHeight); // Keep prompt at bottom of window
			})
			.catch($log)
		}
	}

	function fetchResults(){
		return results.slice();
	}

	function clearResults(){
		results = [];
	}

	function updatePrompt(newPrompt){
		prompt = newPrompt;
	}

	return {
		submitCmd,
		fetchResults,
		clearResults,
		updatePrompt
	}
});