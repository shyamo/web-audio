(function() {
    var array = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    var arrayLength = array.length;
    
    var tiles = document.querySelectorAll('.tile');
    var tilesLength = tiles.length;
    
    var thisRemoved;
    var randomNo;
    
    for (i = 0; i < tilesLength; i++) {
        randomNo = Math.floor(arrayLength * Math.random());
        // console.log(randomNo);
        thisRemoved = array.splice(randomNo, 1);
        arrayLength = array.length;
        
        tiles[i].setAttribute('data-val', thisRemoved); 
        tiles[i].onclick = doThis;
    }
    
    
    var tempArray = [];
    
    console.log('hello')
    
    tiles.onclick = doThis;
    
    function doThis() {
        if (tempArray.length === 0) {
            // First tile
            console.log(this);
        } else {
            // Second tile
        }
    };
    
    
})();