// for my previous problem: https://stackoverflow.com/a/18605588

let keepGameOn = true;

let keepImg = false;
let roundCount = 0;

let playerScore = 0;
let computerScore = 0;
let playerScoreElement = document.querySelector(".player-scoreboard h3");
let computerScoreElement = document.querySelector(".computer-scoreboard h3");

let rock_box = document.querySelector(".layer-1.left div:nth-child(1)");
let paper_box = document.querySelector(".layer-1.left div:nth-child(2)");
let scissor_box = document.querySelector(".layer-1.left div:nth-child(3)");

// deleted buttons and converted to the ancha tags, directly into the divs' inself
let rock_button = document.querySelector(".layer-1.left div:nth-child(1)");
let paper_button = document.querySelector(".layer-1.left div:nth-child(2)");
let scissor_button = document.querySelector(".layer-1.left div:nth-child(3)");

let player_ul = document.querySelector(".player-scoreboard ul");
let computer_ul = document.querySelector(".computer-scoreboard ul");

let playAgain_resetButton = document.querySelector(".layer-1.middle button");

// ----------------------------- HOVER/CLICK && CLICK FUNC ---------------------

// hover
rock_box.addEventListener("mouseenter", () => onHover(1));
rock_box.addEventListener("mouseout", () => offHover(1));

paper_box.addEventListener("mouseenter", () => onHover(2));
paper_box.addEventListener("mouseout", () => offHover(2));

scissor_box.addEventListener("mouseenter", () => onHover(3));
scissor_box.addEventListener("mouseout", () => offHover(3));
//

// click
rock_button.addEventListener("click", () => {
	startGame('rock');	
});

paper_button.addEventListener("click", () => {
	startGame('paper');
});

scissor_button.addEventListener("click", () => {
	startGame('scissor');
});
//

function onClick(div_num) {
	console.log(div_num);
	if (!keepImg) {
		console.log(div_num);
		let arr = choseNums(div_num);
		for (let i = 0; i < arr.length; i++) {
			document.querySelector(`.layer-1.left div:nth-child(${arr[i]})`).setAttribute("style", "opacity: 0;");
		}

		if (div_num == 1) {
			document.querySelector('#rock-box').setAttribute('style', 'margin-bottom: 0');
		}
		else if (div_num == 3) {
			document.querySelector('#scissor-box').setAttribute('style', 'margin-top: 0');
		}
	}
}

function offClick(div_num) {
	if (!keepImg) {
		let arr = choseNums(div_num);
		for (let i = 0; i < arr.length; i++) {
			document.querySelector(`.layer-1.left div:nth-child(${arr[i]})`).setAttribute("style", "opacity: 1");
		}

		if (div_num == 1) {
			document.querySelector('#rock-box').setAttribute('style', 'margin-bottom: 9.5cm;');
		}
		else if (div_num == 3) {
			document.querySelector('#scissor-box').setAttribute('style', 'margin-top: 9.5cm;');
		}
	}
}

function choseNums(divNumToShown) {
	/* console.log(typeof divNumToShown);
	console.log(divNumToShown); */
	if (divNumToShown == '1') return [2, 3]
	else if (divNumToShown == '2') return [1,3]
	else if (divNumToShown == '3') return [1,2];
}

// cs50 week3, yeah, going with numbers is now looks a good idea in the first place
function choiceToNum(_choice) {
	if (_choice == 'rock') return '1'
	else if (_choice == 'paper') return '2'
	else if(_choice == 'scissor') return '3';
}

function onHover(div_num) {
	if (!keepImg) {
		document.querySelector(`.layer-1.left div:nth-child(${div_num}) img`).setAttribute("style", "opacity: 0");

		document.querySelector(`.layer-1.left div:nth-child(${div_num})`).setAttribute("style", "width: 4.2cm;height: 4.2cm");

		document.querySelector(`.layer-1.left div:nth-child(${div_num}) p`).setAttribute("style", "opacity: 1");
	}
}

function offHover(div_num) {
	if (!keepImg) {
		document.querySelector(`.layer-1.left div:nth-child(${div_num}) img`).setAttribute("style", "opacity: 1");

		document.querySelector(`.layer-1.left div:nth-child(${div_num})`).setAttribute("style", "width: 4cm;height: 4cm");

		document.querySelector(`.layer-1.left div:nth-child(${div_num}) p`).setAttribute("style", "opacity: 0");
	}
}


// ------------------------------------------------------------------
//
// -------------------------------- GAME PLAY -----------------------


let choices = ['rock', 'paper', 'scissor'];
// well actualy start the round
function startGame(clicked_button) {
	if (!keepImg){

		if (playAgain_resetButton.innerHTML == 'play again') playAgain_resetButton.innerHTML = 'reset';

		divNum = choiceToNum(clicked_button);
		onClick(divNum);

		roundCount += 1;

		computers_choice = choices[Math.floor(Math.random() * 3)];

		keepImg = true;
		// showHideImages(computers_choice, 'show');

		winner = winnerAlgorithm(clicked_button, computers_choice);
		console.log(winner);
		
		showComputerChosenImg(computers_choice);

		scoreboard_update(clicked_button, computers_choice, winner);
		if (playerScore - computerScore > 1) endTheGame('player', clicked_button, computers_choice)
		else if (computerScore - playerScore > 1) endTheGame('computer', clicked_button, computers_choice)
		else {
			setTimeout(
				() => {
					keepImg = false;
					offClick(divNum);
					offHover(divNum);
					hideComputerChosenImg(computers_choice);
				}
				, 1000
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


function showComputerChosenImg(_choice) {
	let tmp_img = document.querySelector(`.layer-1.right .${_choice}`);
	console.log(`.layer-1.right .${_choice}`);
	tmp_img.setAttribute("style", "opacity: 1");
}

function hideComputerChosenImg(_choice) {
	let tmp_img = document.querySelector(`.layer-1.right .${_choice}`);
	console.log(`.layer-1.right .${_choice}`);
	tmp_img.setAttribute("style", "opacity: 0");
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
function resetGame(last_chosen, computers_choice) {

	//---------- reset score board
	let playerScoreLi = document.querySelector(".player-scoreboard ul li:nth-child(1)");
	let computerScoreLi = document.querySelector(".computer-scoreboard ul li:nth-child(1)");
	let p_count = player_ul.childElementCount;
	
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
	//--------------
	
	//----------reset the choices...
	setTimeout( () => {
		keepImg = false;
		offHover(choiceToNum(last_chosen));
		offClick(choiceToNum(last_chosen));
		hideComputerChosenImg(computers_choice);

	}
	, 1000
	);

	if (playAgain_resetButton.innerHTML == 'reset') playAgain_resetButton.innerHTML = 'play again';
}

// ---------------------------------------------------------
//
// -------------------- END THE GAME  ----------------------

function endTheGame(winner, last_chosen, computers_choice) {

	alert(`winner is ${winner}`);
	resetGame(last_chosen, computers_choice);

}








