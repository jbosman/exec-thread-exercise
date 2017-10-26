const fs = require('fs');

function readFile( location, numOfLines, done){

	fs.readFile( './' + location, (err, data) => {

		if(err){
			done(`Failed to read ${location}`);
		} 
		// Using zero as sentinal value here as it doesn't make sense to read zero lines from a file
		// Read whole file if sentinal used
		if( numOfLines === 0 ) done(data.toString());
		else{
			let dataLines = data.toString().split('\n');
			let [ begin, end ] = numOfLines > 0 ?
				// iterate from start of file to numOfLines 
				[ 0, numOfLines ] :
				// iterate from numOflines from end of file to end of file 
				[ dataLines.length + numOfLines - 1, dataLines.length -1 ] // The last line will always be a \n 
			let output = '';
			for(let i = begin; i < end; i++ ){
				output += dataLines[i] + '\n';
			}
			
			done(output);
		}
	})
}

module.exports = {
	readFile
}