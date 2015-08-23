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
		}
	
	},

	sequence: {
		1: [4, 4, 4],
		2: [4, 4, 4],
		3: [4, 6, 2, 3, 4]
	},
	
	checkPosition: function(note) {
		var newNote;
		var newNoteElem;
		var oldNote;
		var nextStep;
		if(itsChristmas.step === 0) {
			if(itsChristmas.counter < 4) {
				itsChristmas.counter++;
			} else {
				itsChristmas.nextStep(1);
			}
		} else {
			
			if(note === undefined) {
				// First note
				console.log('first')
				newNote = itsChristmas.sequence[itsChristmas.step][itsChristmas.counter];
				console.log(newNote);

				newNoteElem = document.querySelector('[data-note="' + newNote + '"]');
				newNoteElem.classList.add('highlight');
			} else {
				// Subsequent notes
				// Check the right note was played
				console.log('subsequent');
				oldNote = itsChristmas.sequence[itsChristmas.step][itsChristmas.counter];
				console.log(itsChristmas.counter);
				
				if(parseInt(note, 10) === parseInt(oldNote, 10)) {
					if(itsChristmas.counter + 1 !== itsChristmas.sequence[itsChristmas.step].length) {
						itsChristmas.counter++;
						newNote = itsChristmas.sequence[itsChristmas.step][itsChristmas.counter];
						newNoteElem = document.querySelector('[data-note="' + newNote + '"]');
						newNoteElem.classList.add('highlight');
					} else {
						nextStep = parseInt(itsChristmas.step, 10) + 1;
						console.log(nextStep)
						console.log(typeof(nextStep))
						itsChristmas.nextStep(nextStep)
					}
				} else {
					itsChristmas.wrong();
				}
			}
			
		}
	},
	
	wrong: function() {
		console.log('Wrong!');
	},
	
	nextStep: function(next) {
		var oldStep = document.querySelector('[data-message="' + (next - 1) + '"]');
		var newStep = document.querySelector('[data-message="' + next + '"]');

		itsChristmas.counter = 0;
		itsChristmas.step++;
		
		oldStep.style.display = 'none';
		newStep.style.display = 'block';
		
		console.log('NEXT!');
		itsChristmas.checkPosition();
		
	},
	
	createDing: function(evt) {
		evt.preventDefault();
		var frequency = this.getAttribute('data-note');
		console.log('playing');
		
		var noteElem = document.querySelector('.highlight');
		if(noteElem !== null) {
			noteElem.classList.remove('highlight');
		}
		
		// [frequency, type, startTime, fadeMidTime, fadeEndTime]
		var baseArray = [itsChristmas.frequencyArray[frequency], 'triangle', 0, 0.5, 1];
		var depthArray = [itsChristmas.frequencyArray[frequency], 'square', 0.2, 1.2, 1.5];

		itsChristmas.createSound(baseArray);
		itsChristmas.createSound(depthArray);
		
		itsChristmas.checkPosition(frequency);
	},

	createSound: function(array) {
		var context = itsChristmas.context;
		oscillator = context.createOscillator();
		gainNode = context.createGain();
		gainNode.gain.value = 1;
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
