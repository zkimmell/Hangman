//define variables

var wordArray=[];
var wins=0;
var losses=0;
var previousGuesses =[];
var wrongGuessCount;
var currentWord;
var previouslyEntered;
var currentAnswer;


//Form library of possible word choices

var sportsArray = ['basketball', 'football', 'soccer', 'baseball', 'hockey', 'tennis']

//Computer selects word

function getWord(){
	var currentWord = sportsArray[Math.floor(Math.random()* sportsArray.length)];
	var numberofTiles=currentWord.length;
	wrongGuessCount=0;
	previousGuesses=[];
	wordArray=currentWord.split('');
	
}
//User guesses a letter

document.onkeyup = function(){
	var userGuess= String.fromCharCode(event.keycode).toLowerCase();
	previousGuesses.push(userGuess);

//verify letter hasn't been guessed yet

	for (i=0;i<previousGuesses.length;i++){
		if(userGuess===previousGuesses[i]){
			var previouslyEntered=true;
		}
	}
//check if user guess is in game word
	if (!previouslyEntered){
		for (i=0; i<wordArray.length;i++){
			if (userGuess==wordArray[i]){
				found=true;
			}
			if(found){checkAnswer();}
			else {wrongAnswer(userGuess);}
			}
		}

//add correct letters until game word is formed
	function checkAnswer(){
		var currentAnswer=[""];
		for (i=0;i<currentWord.length;i++){
			currentAnswer+=(i).text();
		}
		if(currentAnswer==currentWord){
			victoryMessage();
		}
//add incorrect guesses until 6 has been reached 
		function wrongAnswer(a){
		wrongGuessCount++;
		document.getElementbyId("#guesses").add(""+a);
		if(wrongGuessCount==6){
			defeatMessage();
		}

//display victory message and restart unless all words have been used
	function victoryMessage(){
		document.getElementbyId("#feedback").innerHTML="You have won!";
		wins++;
		if (wordArray.length>0){
			getWord()
		}
		}

//add incorrect guesses until 6 has been reached 
		function wrongAnswer(a){
		wrongGuessCount++;
		document.getElementbyId("#guesses").add(""+a);
		if(wrongGuessCount==6){
			defeatMessage();
		}
//increment loss count and restart game unless all words have been used
	}function defeatMessage(){
		document.getElementbyId("#feedback").innerHTML="You're dead!" <br> "answer= "+ currentWord;
		losses++;
		if(wordArray.length>0){
			getWord()
		}
		
//notify user when all words have been used
		else{finalPage();}

	function finalPage(){
			document.getElementbyId("#gameContent").empty();
			document.getElementbyId("#finalMessage").innerHTML="You have finished all the words in the game!";
		}  