var http = require('http');
var fs = require('fs');

// include socket.io, which was installed by npm.  NOT part of core.
var socketio = require('socket.io');

var server = http.createServer((req, res)=>{
	console.log("someone connected via HTTP.");
	if(req.url == '/'){
		fs.readFile('index.html', 'utf-8',(error,data)=>{
			// console.log(error);
			// console.log(data);
			if(error){
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/html'});
				res.end(data);
			}
		});
	}else if(req.url == '/styles.css'){
		fs.readFile('styles.css', 'utf-8',(error,data)=>{
			if(error){
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/css'});
				res.end(data);
			}			
		});
	}else{
		// 404
	}
});

var io = socketio.listen(server);
// Handle socket connections...
io.sockets.on('connect', (socket)=>{
	console.log("someone connected via socket");

	socket.on('nameToServer', (name)=>{
		console.log(name + " just joined.");
		io.sockets.emit('newUser', name);
	});
	socket.on('sendMessage',()=>{
		console.log("someone clicked on button");
	});
	socket.on('messageToServer', (messageObj)=>{
		console.log(messageObj);
		io.sockets.emit('messageToClient', '<i>' + messageObj.name + '</i>' + '-->' + " " + messageObj.newMessage);

	});
});


server.listen(8080);
console.log("someone listening on port 8080");