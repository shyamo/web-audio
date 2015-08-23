(function() {
    // alert('on');

    var context;

    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }

    var buttons = document.querySelectorAll('.button');
    
    console.log(buttons)
    
    var notes = [];
    var frequencyArray = [440, 493, 261, 293, 329, 349, 392];
    
    for(i = 0; i < buttons.length; i++) {
        buttons[i].onclick = createDing;
    }

    function createDing(evt) {
        evt.preventDefault();
        var frequency = this.getAttribute('data-note');
        console.log('playing');
        
		// [frequency, type, fadeMid, fadeEnd]
		var baseArray = [frequencyArray[frequency], 'triangle', 0, 0.5, 1];
		var depthArray = [frequencyArray[frequency], 'square', 0.2, 1.2, 1.5];
		
		function playArray(array) {
			console.log(array)
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
		
		playArray(baseArray);
		playArray(depthArray);
		
    };

	function createNote(evt) {
        evt.preventDefault();
        var number = this.getAttribute('data-note');
        console.log('playing');
        
        var oscillator = null;
        
        oscillator = context.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = frequency[number]; // value in hertz
        oscillator.connect(context.destination);
        oscillator.start(0);
        oscillator.stop(context.currentTime + 0.25);
        

    };
    
    
})();