(function () {

    // Set up core global variables
    var daPoem = document.getElementById("daPoem");
    var daButton = document.getElementById("playback");

    // Poem object lines and dates
    function Poem(text){
	this.time = Date.now();
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
	poemArray.push( new Poem( daPoem.value ) );
    }
    daPoem.value = poemArray[poemArray.length-1].text;
    daPoem.addEventListener("input", pushPoem);

    // setup the playback function
    function Playback(){
	poemArray.push( new Poem( daPoem.value ));
	daPoem.removeEventListener("input", pushPoem);
	daPoem.disabled = true;
	daButton.disabled = true;
	
	var playBackStartTime = poemArray[0].time
	var playBackEndTime = poemArray[ poemArray.length-1 ].time - playBackStartTime;
	
	var lastTime = playBackStartTime
	var lastDiff = 0
	poemArray.forEach( function setPlaybackTimeouts(poemEvent) {

	    var timeDiff = poemEvent.time - lastTime;
	    if( timeDiff > 1000) {
		timeDiff = 1000; // long delays should be shortened to 1 second
	    }
	    console.log( "Diff: ", timeDiff, "Time: ", lastDiff );
	    setTimeout(function (){
		daPoem.value = poemEvent.text;
	    }, lastDiff+timeDiff);
	    lastDiff = lastDiff+timeDiff;
	    lastTime = poemEvent.time;
	});

	setTimeout( function () {
	    daPoem.addEventListener("input", pushPoem);
	    daPoem.disabled = false;
	    daButton.disabled = false;
	}, lastDiff+100 );
	
    }
    daButton.addEventListener("click", Playback);

    // bind save and delete
    document.getElementById('save').addEventListener("click", function(){
	localStorage.poem = JSON.stringify( poemArray );
    });
    document.getElementById('delete').addEventListener("click", function(){
	delete localStorage.poem;
    });

})()
