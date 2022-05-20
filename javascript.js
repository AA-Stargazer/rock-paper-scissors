let keepImg = false;
let roundCount = 0; // well actually also can do something like, the winner from every three around gains 1 score and so on... idk, the one who has 2 different wins....

let playerScore = 0;
let computerScore = 0;
let playerScoreElement = document.querySelector(".player-scoreboard h3");
let computerScoreElement = document.querySelector(".computer-scoreboard h3");

let rock_image = document.querySelector("img.rock");
let paper_image = document.querySelector("img.paper");
let scissor_image = document.querySelector("img.scissor");

let rock_button = document.querySelector(".layer-2 button:nth-child(1)");
let paper_button = document.querySelector(".layer-2 button:nth-child(2)");
let scissor_button = document.querySelector(".layer-2 button:nth-child(3)");

let player_ul = document.querySelector(".player-scoreboard ul");
let computer_ul = document.querySelector(".computer-scoreboard ul");

let playAgain_resetButton = document.querySelector(".layer-1.middle button");

// ----------------------------- HOVER ---------------------
rock_button.addEventListener("mouseenter", function() { onhover("rock"); });
rock_button.addEventListener("mouseout", function() { offhover("rock"); });

paper_button.addEventListener("mouseenter", function() { onhover("paper"); });
paper_button.addEventListener("mouseout", function() { offhover("paper"); });

scissor_button.addEventListener("mouseenter", function() { onhover("scissor"); });
scissor_button.addEventListener("mouseout", function() { offhover("scissor"); });

function onhover(choice) {
	if (!keepImg) {
	let element = document.querySelector(`.layer-1.left img.${choice}`);	
	element.setAttribute("style", "opacity: 1");
	}
}

function offhover(choice) {
	if (!keepImg) {
	let element = document.querySelector(`.layer-1.left img.${choice}`);
	element.setAttribute("style", "opacity: 0");
	}
}

// ---------------------------------------------------------


rock_button.addEventListener("click", () => {
	startGame('rock');	
});
paper_button.addEventListener("click", () => {
	startGame('paper');
});
scissor_button.addEventListener("click", () => {
	startGame('scissor');
});

let choices = ['rock', 'paper', 'scissor'];
function startGame(clicked_button) {
	if (!keepImg){

		roundCount += 1;

		computers_choice = choices[Math.floor(Math.random() * 3)];

		keepImg = true;
		showHideImages(clicked_button, computers_choice, 'show');

		winner = winnerAlgorithm(clicked_button, computers_choice);
		console.log(winner);

		scoreboard_update(clicked_button, computers_choice, winner);
		if (playerScore - computerScore > 1) endTheGame('player')
		else if (computerScore - playerScore> 1) endTheGame('computer')
		{

		setTimeout(
			() => {
			keepImg = false;
			showHideImages(clicked_button, computers_choice, 'hide');
			}
			, 500
		);

		}
	}
}

function winnerAlgorithm(player, computer) {
	if (
		(player == "rock" && computer == "paper")
		||
		(player == "paper" && computer == "rock")
	)
	{
		if (player == "rock") return 'computer'
		else return 'player';
	}
	else if (
		(player == "rock" && computer == "scissor")
		||
		(player == "scissor" && computer == "rock")
	)
	{
		if (player == "rock") return "player"
		else return "computer";
	}
	else if (
		(player == "scissor" && computer == "paper")
		||
		(player == "paper" && computer == "scissor")
	)
	{
		if (player == "scissor") return "player"
		else return "computer";
	}
	return "tie";
}

function showHideImages(players_image, computers_image, show_or_hide) {
	if (show_or_hide == 'show') {
		let playerImg = document.querySelector(`.layer-1.left img.${players_image}`);
		playerImg.style.opacity = 1;
		
		let computerImg = document.querySelector(`.layer-1.right img.${computers_image}`);
		computerImg.style.opacity = 1;
	}
	else if (show_or_hide == 'hide') {
		let playerImg = document.querySelector(`.layer-1.left img.${players_image}`);
		playerImg.style.opacity = 0;
		
		let computerImg = document.querySelector(`.layer-1.right img.${computers_image}`);
		computerImg.style.opacity = 0;
	}
}

// ---------------------------------------------------------
//
// -------------------- SCOREBOARD -------------------------

// when I searched for "insert" in https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute (you know, maybe something element.insert blabla), there were 3 result "insertAdjacentElement(), insertAdjacentHTML(), insertAdjacentText(). Bingo....

// warning from the MDN: Security considerations
// When inserting HTML into a page by using insertAdjacentHTML(), be careful not to use user input that hasn't been escaped. 


// player_ul.insertAdjacentHTML('beforeend', '<li>it workssssssss</li>');

// NOTE can also do something like, instead of directly directyl deleting the first <li> element when the <li> count reached some number, show the new element as extra and then remove the first viewable <li> with some transition etc... but without removing, for this one's transition, we might need opacity, therefore we will also add "position:absolute". The thing about this is <li> elements just keep gettin aggregated... still it wouldn't take few mb I believe (or create some max round number...)

// another thing can be useful https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount (well I could also do it with substracting roundCount and max-element-count(I think 10 would look good), but this is good... (counts closest element, I guess... like <li> in <ul>
// but if we'll use childElementCount, we might not be able to use the transition time etc... wait... firstly make it's opacity 0 then delete the item, YES...


function scoreboard_update(player_choice, computer_choice, add_score_to_) {

	if (add_score_to_ == 'player') {
		playerScore += 1;
	}
	else if (add_score_to_ == 'computer') {
		computerScore += 1;
	}
	
	playerScoreElement.innerHTML = playerScore;
	computerScoreElement.innerHTML = computerScore;

	if (player_ul.childElementCount > 10) {
		// when function recalled, this will automatically redeclared to the new value...
		let playerScoreFirstElement = document.querySelector(".player-scoreboard ul li:nth-child(1)");
		player_ul.removeChild(playerScoreFirstElement);

		let computerScoreFirstElement = document.querySelector(".computer-scoreboard ul li:nth-child(1)");
		computer_ul.removeChild(computerScoreFirstElement);


	}
	/*else {*/
		player_ul.insertAdjacentHTML(
			'beforeend' 
			,`<li><span>${roundCount}.</span> <span>${player_choice}</span></li>`
		)
		computer_ul.insertAdjacentHTML(
			'beforeend' 
			,`<li><span>${computer_choice}.</span> <span>${roundCount}</span></li>`
		)

	/*}*/
}

// ---------------------------------------------------------
//
// -------------------- RESET THE GAME ---------------------

playAgain_resetButton.addEventListener("click", () => {
	resetGame();
});

// resets the game
function resetGame() {
	let playerScoreLi = document.querySelector(".player-scoreboard ul li:nth-child(1)");
	let computerScoreLi = document.querySelector(".computer-scoreboard ul li:nth-child(1)");
	let p_count = player_ul.childElementCount;
/*	let c_count = computerScoreLi.childElementCount(); one of it is enough */
	
	while (p_count > 0) {
		if (playerScoreLi !== null) {
			player_ul.removeChild(playerScoreLi);
			playerScoreLi = document.querySelector(".player-scoreboard ul li:nth-child(1)");
	
			computer_ul.removeChild(computerScoreLi);
			computerScoreLi = document.querySelector(".computer-scoreboard ul li:nth-child(1)");
			p_count = player_ul.childElementCount;
		}
		else {
			p_count = 0;
		}
	}

	playerScore = 0;
	computerScore = 0;
	roundCount = 0;
	playerScoreElement.innerHTML = 'Score';
	computerScoreElement.innerHTML = 'Score';

}

// ---------------------------------------------------------
//
// -------------------- END THE GAME  ----------------------


function endTheGame(winner) {

	console.log(`winner is ${winner}`);
	resetGame();	

}












