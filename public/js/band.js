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
	var socket = io.connect('http://localhost')
	//define socket events
	var myInstrument = document.getElementById("my-instrument").dataset.instrument;
	var keyCodeToSound = keyPressToSoundElemId[myInstrument];

	socket.on("connect",function() {
		socket.emit("room",roomId);

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
//            var data = {
//                user_id: document.getElementById("user").dataset.id
//            };
            //socket.broadcast.emit("disconnect");
            // redirect the user to index
            $.get('/',
                function() {
                    window.location = "/"
                });
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
        // Append to the content div of the band.


//        $('#content.section:first').append(
//            '<div class="bandmate-container"><div id="soundwave-' + data.id + '" class="soundwave"></div>' +
//                '<div class="bandmate-instrument"><div class="instrument"><img class="bandmate-instrument-pic" src="/images/' + data.instrumentImg +'" />' +
//                    '</div>' +
//                    '<div class="bandmate-name">'+data.userName +'</div>' +
//                    '</div></div>'
//        );


	});
	socket.on("disconnected",function(data){
	    console.log("disconnected",data);

        // need to remove the user from the screen
	});
	socket.on("id",function(data){
	    console.log("id",data);
	});


});
