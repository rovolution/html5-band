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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.cookieSession({secret: "socialtables"}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route

// App Routing
app.get('/', routes.index);
app.get('/bands', routes.list);
app.get('/bands/:id', routes.band);
app.get('/bands/:id/join', routes.join);

app.get('/create', routes.chooseName);
app.post('/create', routes.create);
app.post('/join', routes.joinBand);

 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

var users = {};

//If the client just connected
io.sockets.on('connection', function(socketObj) {

    socketObj.on('room', function(room) {
        socket.join(room);
    });
  	io.sockets.emit("connected",{message:"is connected",id:socketObj.id});

  	users[socketObj.id] = socketObj.id;
      io.sockets.emit('id',users);

  	socketObj.on('sound', function(message){

          io.sockets.emit('serverSound', message);
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