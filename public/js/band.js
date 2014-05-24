$(document).ready(function() {

	// connect the socket.io server
	var socket = io.connect('http://localhost')
	//define socket events

	socket.on("connect",function(){
		$('#my-instrument').on('click', function(e){
			console.log("clicked");
			socket.emit('sound',{message:"hey you"});
		});
		

	});

	// attach events
	socket.on("serverSound",function(data){
		console.log("sound---------",data);
		});
	socket.on("connected",function(data){
	console.log("----connected",data);
	});
	socket.on("disconnected",function(data){
	console.log("disconnected",data)
	});
	socket.on("id",function(data){
	console.log("id",data);
	});
});