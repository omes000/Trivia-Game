var trivia = [
	{
		question: "What are the initials for the words on Jules' wallet in 'Pulp Fiction'?",
		possAns: ["M.F.B.", "B.M.F.", "I.A.T.B.", "C.S."],
		corrAns: "B.M.F.",
		image: "assets/images/bmf.jpg"
	},
	{
		question: "Who is not a member of the Fellowship of the Ring in 'The Lord of the Rings'?",
		possAns: ["Frodo", "Gimli", "Aragorn", "Elrond", "Boromir"],
		corrAns: "Elrond",
		image: "assets/images/elrond.jpg"
	},
	{
		question: "From 'Knights of the Old Republic', in the twist ending, who is the player revealed as?",
		possAns: ["Darth Revan", "Darth Malek", "Darth Sidious", "Darth Vader"],
		corrAns: "Darth Revan",
		image: "assets/images/revan.jpg"
	},
	{
		question: "In the TV show 'A Game of Thrones', who knows nothing?",
		possAns: ["Ned Stark", "Jon Snow", "Daenerys Targaryen", "Cersei Lannister"],
		corrAns: "Jon Snow",
		image: "assets/images/jon.png"
	},
	{
		question: "What makes Anakin Skywalker so special in 'Star Wars'?",
		possAns: ["The Force", "The Skywalker name", "Midichlorians", "Nothing", "Pod Racing"],
		corrAns: "Midichlorians",
		image: "assets/images/midi.jpg"
	},
	{
		question: "Who does the player play as in 'The Legend of Zelda' series?",
		possAns: ["Zelda", "Link", "Goron", "Hyrule"],
		corrAns: "Link",
		image: "assets/images/link.png"
	},
	{
		question: "Who forged the One Ring in 'The Lord of the Rings'?",
		possAns: ["Elrond", "Celebrimbor", "Sauron", "Gollum"],
		corrAns: "Sauron",
		image: "assets/images/sauron.jpg"
	}
];


var intervalID; //stores the interval for the time remaining
var timeOut; //stores the time out for each round of questions

var timeLeft = 29; //stores the time left for user to respond; starts at 29 to account for interval starting
var quesCounter = 0; //used as an index to loop through the trivia questions and get corresponding answers

var wins = 0; //counts the number of correct guesses
var loss = 0; //counts the number of incorrect guesses
var ranOut = 0; //counts the number of times time ran out

//empties the question and answers div
function emptyQA(){
	$("#question").empty();
	$("#answers").empty();
	$("#image").empty();
}

//displays the time left and decrements the time left
function count(){
	$("#timer").text("Time Remaining: " + timeLeft + " seconds");
	timeLeft--;
}

//displays the initial time left and then starts the count for time left
function timer(){
	$("#timer").text("Time Remaining: " + 30 + " seconds");
	intervalId = setInterval(count, 1000);
}

//increments to the next trivia question and corresponding answers and resets the time left
function nextQuestion(){
	quesCounter ++;
	timeLeft = 29;
	game();
}

//once time runs out, hides the question and answers and displays the correct answer
//clears the interval for decrementing time and the timeout
//includes redundancy check to ensure no time is left
function stop(){
	if(timeLeft < 1){
		ranOut++;
		emptyQA();
		$("#answers").text("The correct answer was: " + trivia[quesCounter].corrAns);
		$("#question").text("You ran out of time");
		clearInterval(intervalId);
		clearTimeout(timeOut);
		setTimeout(nextQuestion, 3000);
	};
}

//starts displaying the questions and possible answers, or if questions have run out, displays the player's scores
function game(){
	emptyQA();

	//ensures that we don't go beyond the number of trivia questions
	if (quesCounter < trivia.length){ 
		$("#question").text(trivia[quesCounter].question); 
		timer();

		//this loop populates the possible answers for the corresponding question. Allows the number of possible answers to vary
		for (var i=0; i< trivia[quesCounter].possAns.length; i++){
			var ansButt = $("<div>").addClass('col-lg-12 text-center').html("<div class = 'possAns btn btn-primary btn-lg box' id ='" +trivia[quesCounter].possAns[i]+"'>" + trivia[quesCounter].possAns[i] + "</div>");
			$("#answers").append(ansButt);
		}

		//run stop function if the player hasn't chosen an answer in 30 seconds
		timeOut = setTimeout(stop, 30000);
	}

	//when the questions have all been asked, will display the player's score
	else{
		clearInterval(intervalId);
		clearTimeout(timeOut);
		$("#answers").empty();
		var corrAns =$("<div>").addClass('bg').text("Correct Answers: " + wins);
		var incorrAns =$("<div>").addClass('bg').text("Incorrect Answers: " + loss);
		var noAns =$("<div>").addClass('bg').text("Unanswered: " + ranOut);
		$("#answers").append(corrAns, incorrAns, noAns);
		setTimeout(showStart, 5000);
	}
}

//to reduce redundancy
function showStart(){
	$("#start").show();
}

//checks if the player chose the correct answer, if not, it tells the player the correct answer and stops the time decrement.
function checkAns(str){
	if(str == trivia[quesCounter].corrAns){
		emptyQA();
		$("#answers").html("<h1>Correct!</h1>");
		$("#image").html("<img class = 'img-responsive center-block' src ='"+trivia[quesCounter].image +"'>");
		wins++;
		clearInterval(intervalId);
		clearTimeout(timeOut);
		setTimeout(nextQuestion, 3000);
	}
	else{
		emptyQA();
		$("#answers").text("The correct answer was: " + trivia[quesCounter].corrAns);
		$("#question").html("<h1>Wrong!</h1>");
		loss++;
		clearInterval(intervalId);
		clearTimeout(timeOut);
		setTimeout(nextQuestion, 3000);
	}
}

//provides the start conditions for the game; used at both the very beginning of play or if after the user has finished, the player
//wants to play again.
function startGame(){
	$("#startbtn").on("click", function(){
		$("#start").hide();
		timeLeft = 29;
		quesCounter = 0;
		wins = 0;
		loss = 0;
		ranOut = 0;
		game();
	});
}

//when one of the answers are clicked, it calls the checkAns function
function clickAns(){
	$("#answers").on("click",".possAns", function(){
		checkAns($(this).attr("id"));
	});
}

$(document).ready(function(){
	startGame();
	clickAns();
});


