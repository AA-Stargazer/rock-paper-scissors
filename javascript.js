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

let resetButton = document.querySelector(".layer-1.middle button");

let wannaPlayAgainButton = document.querySelector(".decision-window button");

// ----------------------------- HOVER/CLICK && HOVER/CLICK FUNC ---------------------

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

wannaPlayAgainButton.addEventListener("click", () => {
	startFromBegining();
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

		if (resetButton.innerHTML == 'play again') resetButton.innerHTML = 'reset';

		divNum = choiceToNum(clicked_button);
		onClick(divNum);

		roundCount += 1;

		// computers_choice = choices[Math.floor(Math.random() * 3)];
		computers_choice = 'rock';

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

resetButton.addEventListener("click", () => {
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

	if (resetButton.innerHTML == 'reset') 
		resetButton.innerHTML = 'play again';
}

// ---------------------------------------------------------
//
// -------------------- END THE GAME  ----------------------

function endTheGame(winner, last_chosen, computers_choice) {
	keepGameOn = false;
	const body = document.querySelector('body');

	/*
	if (winner == 'computer')
		body.setAttribute('style', 'background-color: red')
	else
		body.setAttribute('style', 'background-color: blue');
	*/
	showDecisionWindow(winner);
	// alert(`winner is ${winner}`);

	resetGame(last_chosen, computers_choice);

	setTimeout(
		() => {
			keepGameOn = true;
		}
		,5000
	);


}


/* I was thinking that why it wasn't updating. Note in this url https://www.w3schools.com/jsref/met_element_setattribute.asp, so yes, we should use .style etc....*/
function showDecisionWindow(winner) {
	const decisionDiv = document.querySelector('.decision-window div h2');
	const decisionWindowH = document.querySelector('.decision-window div div h2');

	const decisionWindow = document.querySelector('.decision-window');
	if (winner == 'computer')
	{
		/*decisionWindow.setAttribute('style', 'background-color: #990033;');*/
		decisionWindow.style.backgroundColor = '#990033';
		decisionDiv.innerText = 'You lose, but don\'t give up';
	}
	else if (winner == 'player')
	{
		/*decisionWindow.setAttribute('style', 'background-color: #009999;');*/
		decisionWindow.style.backgroundColor = '#009999';
		decisionDiv.innerText = 'You win, congrats!';
	}
	else
	{
		
	}
	/*decisionWindow.setAttribute('style', "display: initial; z-index: 500;");
	decisionWindow.setAttribute('style', 'opacity: 1;');*/
	decisionWindow.style.display = 'flex';
	decisionWindow.style.zIndex = '500';
	
	
	// without this setTimeout, the transition-duration wasn't showing the effect... 
	setTimeout(
		() => {
			decisionWindow.style.opacity = '1';
			decisionWindowH.style.opacity = '1';
		}
		,10
	);

	const rockBox = document.querySelector(`.layer-1.left div:nth-child(1)`)
	const scissorsBox = document.querySelector(`.layer-1.left div:nth-child(3)`)
	
	const layerImgs = document.querySelector('.layer-1.left img');
	
	// beecuase after a second, offClick executed (in the startGame) and I don't want to create another variable which would make things way more complicated, I'll setTimeout for these
	setTimeout(
		() => {
			rockBox.style.marginBottom = '0';
			scissorsBox.style.marginTop = '0';
			layerImgs.style.display = 'none';
		}
		,1010
	);


}


// whats up
// ---------------------------------------------------------
//
// -------------------- START FROM BEGINING ----------------


// actually could use the keepGameOn, but just using z-index etc both easier for me and a bit easier for other programmers to understand if they ever want to look at the code...
function startFromBegining() {

	const decisionWindow = document.querySelector('.decision-window');
	const decisionWindowH = document.querySelector('.decision-window h2');
	
	const rockBox = document.querySelector(`.layer-1.left div:nth-child(1)`)
	const scissorsBox = document.querySelector(`.layer-1.left div:nth-child(3)`)
	
	const layerImgs = document.querySelector('.layer-1.left img');

	// decisionWindow.style.animationDuration = '1.3';
	// decisionWindowP.style.animationDuration = '1';
	decisionWindow.style.transition = '1.3s';
	decisionWindowH.style.transition = '1s';
	
	decisionWindow.style.opacity = '0';
	decisionWindowH.style.opacity = '0';

	setTimeout(
		() => {
			// decisionWindow.style.animationDuration = '1';
			// decisionWindowP.style.animationDuration = '1.3';
			decisionWindow.style.transition = '1s';
			decisionWindowH.style.transition = '1.3s';
			
			decisionWindow.style.zIndex = '500';
			decisionWindow.style.display = 'none';
			
		}
		,1300
	);

	setTimeout(
		() => {
			rockBox.style.marginBottom = '9.5cm';
			scissorsBox.style.marginTop = '9.5cm';
			layerImgs.style.display = 'initial';
		}
		,1500
	);

}



// TODO create another div (display: none to something else and z-index higher etc.) to prevent to click the button in the decision window before screen loads etc, or create a variable to prevent button to be clickable or prevent button to start the game etc... 
//	NOTE man, divs makes things lot easier in the js side...
