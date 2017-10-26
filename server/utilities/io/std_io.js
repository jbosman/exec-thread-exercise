function stdOutWrite(output){
	process.stdout.write(output);
}

function stdInRead(dataCB){
	process.stdin.on('data', dataCB );
}

module.exports = {
	stdOutWrite,
	stdInRead
}