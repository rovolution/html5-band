$(document).ready(function() {
    $('#create-button').click(function() {
    	var bandName = $("#band-name-input").val();
    	console.log("bandname", bandName);
    	$.post('/create', 
    		{"bandName": bandName},
    		function(id) {
    			window.location = "/bands/" + id + "/join"
    		});
    });
});


// // connect the socket.io server
// var socket = io.connect('http://localhost')
// //define socket events

// socket.on("connect",function(){
// 	console.log("-----------");

// });

// // attach events
// socket.on("serverMessage",function(data){

// });
// socket.on("connected",function(data){
// console.log("----data",data);
// });
// socket.on("disconnected",function(data){

// });
// socket.on("id",function(data){

// });
