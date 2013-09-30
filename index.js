(function () {

    // Set up core global variables
    var daPoem = document.getElementById("daPoem");
    

    // Poem object lines and dates
    function Poem(text){
	this.date = Date.now();
	this.text = text;
    }

    // SetUp and initalize local storage
    var poemArray;
    if( localStorage.poem ){
	poemArray = JSON.parse( localStorage.poem );
    } else {
	poemArray = [new Poem("")]
	localStorage.poem = JSON.stringify(poemArray);
    }

    // initialize the textArea
    function pushPoem(){
	console.dir(arguments[1]);
	poemArray.push( new Poem( daPoem.value ) );
    }
    daPoem.value = poemArray[poemArray.length-1];
    daPoem.addEventListener("input", pushPoem);

    // setup the playback function
    
    

    window.poemArray = poemArray
})()
