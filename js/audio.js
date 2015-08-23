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
    var frequency = [440, 493, 261, 293, 329, 349, 392];
    
    for(i = 0; i < buttons.length; i++) {
        buttons[i].onclick = createNote;
    }

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