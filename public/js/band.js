// connect the socket.io server
var socket = io.connect('http://localhost')
//define socket events

socket.on("connect",function(){
	console.log("-----------");

});

// attach events
socket.on("sound",function(data){

});
socket.on("connected",function(data){
console.log("----data",data);
});
socket.on("disconnected",function(data){

});
socket.on("id",function(data){

});
