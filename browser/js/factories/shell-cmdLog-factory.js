app.factory('cmdLogFactory', () => {

	let cmdLog = [];
	let logPointer = 0;

	function addCmdToLog(cmd){
		cmdLog.push(cmd);
		logPointer = cmdLog.length - 1;
	}

	function scrollLogUpKey(){
		let selectedPtr = logPointer;

		logPointer = ( selectedPtr - 1 ) === -1 ? 0 : selectedPtr - 1;
		return cmdLog[selectedPtr];
	}

	function scrollLogDownKey(){
		let selectedPtr = logPointer;
		logPointer = (selectedPtr + 1) === cmdLog.length ? cmdLog.length - 1 : selectedPtr + 1;
		return cmdLog[selectedPtr];
	}


	return {
		addCmdToLog,
		scrollLogUpKey,
		scrollLogDownKey
	}

});