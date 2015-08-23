var itsChristmas = {

	context: undefined,
	buttons: undefined,
	frequencyArray: [440, 493, 261, 293, 329, 349, 392],
	counter: 0,
	step: 0,
	
	init: function() {

		try {
			// Fix up for prefixing
			window.AudioContext = window.AudioContext||window.webkitAudioContext;
			itsChristmas.context = new AudioContext();
		}
		catch(e) {
			alert('Web Audio API is not supported in this browser');
		}

		itsChristmas.buttons = document.querySelectorAll('.button');
		console.log(itsChristmas.buttons)

		for(i = 0; i < itsChristmas.buttons.length; i++) {
			itsChristmas.buttons[i].onclick = itsChristmas.createDing;
			itsChristmas.checkPosition();
		}
	
	},

	sequence: {
		1: [4, 4, 4],
		2: [4, 4, 4]
	},
	
	checkPosition: function() {

	},
	
	createDing: function(evt) {
		evt.preventDefault();
		var frequency = this.getAttribute('data-note');
		console.log('playing');

		// [frequency, type, startTime, fadeMidTime, fadeEndTime]
		var baseArray = [itsChristmas.frequencyArray[frequency], 'triangle', 0, 0.5, 1];
		var depthArray = [itsChristmas.frequencyArray[frequency], 'square', 0.2, 1.2, 1.5];

		itsChristmas.createSound(baseArray);
		itsChristmas.createSound(depthArray);

	},

	createSound: function(array) {
		var context = itsChristmas.context;
		console.log(array);
		oscillator = context.createOscillator();
		gainNode = context.createGain();
		gainNode.gain.value = 1;
		console.log(gainNode);
		oscillator.type = array[1];
		oscillator.frequency.value = array[0]; // value in hertz
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		gainNode.gain.exponentialRampToValueAtTime(1, context.currentTime + array[2]);
		gainNode.gain.exponentialRampToValueAtTime(0.1, context.currentTime + array[3]);
		gainNode.gain.linearRampToValueAtTime(0, context.currentTime + array[4]);
		oscillator.start(context.currentTime);
	}
}

window.onload = itsChristmas.init();
