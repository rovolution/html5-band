
$(document).ready(function() {
<<<<<<< Updated upstream

// Map keyboard presses to instrument and note metadata
var keyPressToNoteElemId = {
	"piano": {
		"a": "c",
		"s": "c-sharp",
		"d": "d",
		"f": "d-sharp",
		"g": "e",
		"h": "f",
		"j": "f-sharp",
		"k": "g",
		"l": "g-sharp",
		"z": "a",
		"x": "a-sharp",
		"c": "b"
	},
	"guitar": {
		"a": "string-e",
		"s": "string-b",
		"d": "string-g",
		"f": "string-d",
		"g": "string-a",
		"h": "string-e",
		"j": "c",
		"k": "d",
		"l": "dm",
		";": "e"
	},
	"drums": {
		"f": "bass",
		"g": "snare",
		"h": "hi-hat",
		"j": "cymbal"
	}
};


=======
	var roomId = window.location.pathname.slice(7).toString();
	console.log("roomId",roomId);
>>>>>>> Stashed changes
	// connect the socket.io server
	var socket = io.connect('http://localhost')
	//define socket events

	socket.on("connect",function(){
		socket.emit("room",roomId)
		$('#my-instrument').on('click', function(e){
			socket.emit('sound',"hey you");
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
