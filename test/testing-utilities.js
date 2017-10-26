function captureStream(stream){
  let oldWrite = stream.write;
  let buf = '';
  
  stream.write = function(chunk, encoding, callback){
    // chunk is a String or Buffer
    buf += chunk.toString(); 
    // Need this to output testing results
    oldWrite.apply(stream, arguments); 
  }

  return {
    unhook: function unhook(){
     stream.write = oldWrite;
    },
    captured: function(){
      return buf;
    }
  };
}

module.exports = {
  captureStream
}