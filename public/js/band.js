$(document).ready(function() {

	// Map keyboard presses to instrument and sound metadata
	var keyPressToSoundElemId = {
		"piano": {
			"65": "c",
			"83": "c-sharp",
			"68": "d",
			"70": "d-sharp",
			"71": "e",
			"72": "f",
			"74": "f-sharp",
			"75": "g",
			"76": "g-sharp",
			"90": "a",
			"88": "a-sharp",
			"67": "b"
		},
		"guitar": {
			"65": "string-e",
			"83": "string-b",
			"68": "string-g",
			"70": "string-d",
			"71": "string-a",
			"72": "string-e",
			"74": "c",
			"75": "d",
			"76": "dm",
			"186": "e"
		},
		"drums": {
			"70": "bass",
			"71": "snare",
			"72": "hi-hat",
			"74": "cymbal"
		}
	};



	var roomId = window.location.pathname.slice(7).toString();
	console.log("roomId",roomId);
	// connect the socket.io server
	var socket = io.connect('http://localhost');
	//define socket events
	var myInstrument = document.getElementById("my-instrument").dataset.instrument;
	var keyCodeToSound = keyPressToSoundElemId[myInstrument];

	socket.on("connect",function() {
		socket.emit("room",roomId);
        //reloadUsers();
		document.addEventListener("keydown", function(e) {

			var data = {
				user_id: document.getElementById("user").dataset.id,
				instrument: myInstrument,
				sound: keyCodeToSound[e.keyCode]
			};
			socket.emit('sound', data);
		});

        // added an event to the click btn to leave the band.
        $('#leave-band-btn').click(function() {
            $.post(window.location.pathname+'/leaveBand');
            $.get('/', function(){
                window.location = '/';
            })
        });
	});


	// attach events
	socket.on("serverSound",function(data){
		// Get sound reference
		var audioDOMId = data.instrument + "-" + data.sound;
		
		var sound = document.getElementById(audioDOMId);
		sound.addEventListener("loadedmetadata", function() {
			sound.currentTime = 0.48;
		});

		var soundWaveId = "#soundwave-" + data.user_id;
		$(soundWaveId).show();
		$(soundWaveId).addClass('active');
		sound.play();
		setTimeout(function() { 
			$(soundWaveId).removeClass('active');
		}, 500);
	});
	socket.on("connected",function(data){
    console.log("----connected",data );
        reloadUsers();
	});
	socket.on("disconnected",function(data){
	    console.log("disconnected",data);
        reloadUsers();
	});
	socket.on("id",function(data){
	    console.log("id",data);
	});


});

function reloadUsers(){
    var user = document.getElementById("user").dataset.id;
    $.get(window.location.pathname+'/members', { user_id: user },
        function(data){
            $('#memberlist').html(data);
        });
}