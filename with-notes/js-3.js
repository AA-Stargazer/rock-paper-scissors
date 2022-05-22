let keepImg = false;
let roundCount = 0;

let playerScore = 0;
let computerScore = 0;
let playerScoreElement = document.querySelector(".player-scoreboard h3");
let computerScoreElement = document.querySelector(".computer-scoreboard h3");

let rock_box = document.querySelector(".layer-1.left div:nth-child(1)");
let paper_box = document.querySelector(".layer-1.left div:nth-child(2)");
let scissor_box = document.querySelector(".layer-1.left div:nth-child(3)");

let rock_button = document.querySelector(".layer-2 button:nth-child(1)");
let paper_button = document.querySelector(".layer-2 button:nth-child(2)");
let scissor_button = document.querySelector(".layer-2 button:nth-child(3)");

let player_ul = document.querySelector(".player-scoreboard ul");
let computer_ul = document.querySelector(".computer-scoreboard ul");

let playAgain_resetButton = document.querySelector(".layer-1.middle button");

// ----------------------------- HOVER ---------------------
// mouseenter, mouseout

rock_box.addEventListener("mouseenter", () => onHover(1));



// ok, I was trying to move that chosen element to the middle smoothly, but freakin display not aaffected by transition time etc... I'll try to replace elements and change opacity...
// looks like, I have to use margin/padding properties...
//
// TODO, this hovers actually click !!!!!!!!!!!!! fix later...
function onHover(div_num) {
	// TRY 1  play with display, not animatable... (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
	/*let arr = choseNums(div_num)
	for (let i = 0; i < arr.length; i++) {
		document.querySelector(`.layer-1.left div:nth-child(${arr[i]})`).setAttribute("style", "opacity: 0");
	}
	setTimeout(() => 
		{for (let i = 0; i < arr.length; i++) {
		document.querySelector(`.layer-1.left div:nth-child(${arr[i]})`).setAttribute("style", "display: none");}
	}

			,1000);*/
	// or Interval, but still same...
	/*setInterval(() => 
		{for (let i = 0; i < arr.length; i++) {
		document.querySelector(`.layer-1.left div:nth-child(${arr[i]})`).setAttribute("style", "display: none");}
	}
			,2000);*/


	// TRY 2 make it grid, and change the rows
	/*document.querySelector('#rock-box').setAttribute("style", "grid-row: 2/3;");
	document.querySelector('#paper-box').setAttribute("style", "grid-row: 1/2;");*/

	// TRY3 guess have to use the padding/margin things...                        WILL TRY WITHOUT THESE COMMENTS IN THE NEW FILE
	document.querySelector('#rock-box').setAttribute('style', 'position: absolute');
}

function offHover() {
	let arr = choseNums(div_num)
	for (let i = 0; i < arr.length; i++) {
		document.querySelector(`.layer-2 button:nth-child(${arr[i]})`).setAttribute("style", "display: block");
	}
}


function choseNums(divNumToShown) {
	if (divNumToShown == 1) return [2,3]
	else if (divNumToShown == 2) return [1,3]
	else if (divNumToShown == 3) return [1,2];
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

	player_ul.insertAdjacentHTML(
		'beforeend' 
		,`<li><span>${roundCount}.</span> <span>${player_choice}</span></li>`
	)
	computer_ul.insertAdjacentHTML(
		'beforeend' 
		,`<li><span>${computer_choice}.</span> <span>${roundCount}</span></li>`
	)

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












