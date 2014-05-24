/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/routes.js');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route
app.get('/', routes.index);
app.get('/create', routes.create);
app.get('/join', routes.join);
app.get('/band/:id', routes.band);
 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

var users = {};

//If the client just connected
io.sockets.on('connection', function(socketObj) {
    console.log("socketObj--------",socketObj);
  	io.sockets.emit("connected",{message:"is connected",id:socketObj.id});

  	users[socketObj.id] = socketObj.id;
      io.sockets.emit('id',users);

  	socketObj.on('clientMessage', function(message){
          io.sockets.emit('serverMessage', {message:message,id:users[socketObj.id]})
      });
    socketObj.on("disconnect",function(){
  		io.sockets.emit("disconnected",{message:"is disconnected",id:users[socketObj.id]});
  	    delete users[socketObj.id];
  	    io.sockets.emit('id',users);
  	});
       
    socketObj.on('clientName', function(userName){
        users[socketObj.id] = userName;
        io.sockets.emit('id',users);

     });
  
});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});