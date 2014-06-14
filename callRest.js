/***
 demo use node module request
   https://www.npmjs.org/package/request
***/
'use strict';

const 
  request = require('request'),
  readline = require('readline');
  
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // each time the user types a line, send it to everyone!
rl.on('line', function (cmd) {
  // send a request to the server and print out the response
  var
    cmdobj = JSON.parse(cmd),
    options = 
       { method: process.argv[2], 
         uri: 'http://localhost:3000/model/'+cmdobj.id, 
         json:cmdobj};
  
  request(options, function(err,res,body){
      if (err){
          throw Error(err);
      } else {
          console.log(res.statusCode, body);
      }
      
  })
});