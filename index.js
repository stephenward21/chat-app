var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res)=>{
	console.log("someone connected via HTTP.");
});


server.listen(8080);
console.log("someone listening on port 8080");