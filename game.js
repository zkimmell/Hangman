
// Array of Word Options 
var wordsList   = ["jerome", "neena", "darion", "lou", "greg", "jordan", "jasmine", "stephen", "jacob", "adam", "rui", "luis"];
var chosenWord  = ""; // solution will be held here.
var lettersInChosenWord = []; // This will break the solution into individual letters to be stored in array
var numBlanks	= 0; // This will be the number of blanks we show based on the solution
var blanksAndSuccesses = []; // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _') 
var wrongGuesses = []; // Holds all of the wrong guesses

// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses  = 9;



function startGame() {
	// Reset the guesses back to 0
	numGuesses = 9;

	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)]; // solution is chosen randomly from wordList
	lettersInChosenWord = chosenWord.split(""); // the word is broken into individual letters
	numBlanks = lettersInChosenWord.length; // we count the number of letters in the word

	console.log(chosenWord); // print the solution in console (for testing)

	blanksAndSuccesses = []; // reset the guess and success array at each round. 
	wrongGuesses = []; // reset the wrong guesses from the previous round.

	// Fill up the blanksAndSuccesses list with appropriate number of blanks. 
	for (var i=0; i <numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	console.log(blanksAndSuccesses); // print the initial blanks in console.


	// Reprints the guessesLeft to 9
	document.getElementById("guessesLeft").innerHTML = numGuesses;
	
	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

	// Clears the wrong guesses from the previous round
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");



}



function checkLetters(letter) {

	var letterInWord = false; // toggled based on whether or not a user letter is found anywhere in the word

	// Check if a leter exists inside the array at all.
	for (var i=0; i<numBlanks; i++) {
		if(chosenWord[i] == letter) {
			letterInWord = true; // if the letter exists then toggle this boolean to true. 
 		}
	}

	// If the letter exists somewhere in the word, figure out exactly where (which indices)
	if(letterInWord){
	
		// loop through the word 
		for (var i=0; i<numBlanks; i++){

			// Populate the blanksAndSuccesses with every instance of the letter.
			if(chosenWord[i] == letter) {
				blanksAndSuccesses[i] = letter; // set the specific space in blanks and letter equal to the letter when there is a match.
			}
		}
		console.log(blanksAndSuccesses); // logging for testing
	}
	// If the letter doesn't exist at all...
	else {
		wrongGuesses.push(letter); // add the letter to the list of wrong letters
		numGuesses--; // subtract one of the guesses
	}
}


function roundComplete(){

	// log an initial status update in the console telling us how many wins, losses, and guesses are left
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses. Also update the correct guesses.
	document.getElementById("guessesLeft").innerHTML= numGuesses;
	document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); // print the array of guesses and blanks onto the page
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); // print the wrong guesses onto the page.

	// If all the letters match the solution... 
	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++; // add to the win counter 
		alert("You win!"); // give the user an alert

		// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML= winCounter;
		startGame(); // restart the game 
	}

	// If out of guesses
	else if(numGuesses == 0) {
		lossCounter++; 	 // add to the loss counter 
		alert("You lose"); // give the user an alert

		// Update the loss counter in the HTML
		document.getElementById("lossCounter").innerHTML= lossCounter; 
		startGame(); // restart the game
	}

}

// Starts the Game by running the startGame() function
startGame();

// Then initiates the function for capturing key clicks.
document.onkeyup = function(event) {
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // converts all key clicks to lowercase lettesr
	
	checkLetters(letterGuessed); // runs the code to check for correctness 
	roundComplete(); // runs the code after each round is done
}
