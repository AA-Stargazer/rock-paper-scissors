/*
let a = document.querySelector(".layer-2 button");
a.addEventListener("mouseenter", aaa);
function aaa() {
	document.querySelector(".layer-1.left img").setAttribute("src", './images/pexels-peter-dopper-2363901.jpg');
}
a.addEventListener("mouseout", bbb);
function bbb() {
	document.querySelector(".layer-1.left img").setAttribute("src", '');
} */
// https://stackoverflow.com/questions/50054982/faster-image-changing-in-js


let keepImg = false;


let rock_image = document.querySelector("img.rock");
let paper_image = document.querySelector("img.paper");
let scissor_image = document.querySelector("img.scissor");

let rock_button = document.querySelector(".layer-2 button:nth-child(1)");
let paper_button = document.querySelector(".layer-2 button:nth-child(2)");
let scissor_button = document.querySelector(".layer-2 button:nth-child(3)");

// ----------------------------- hover ---------
// pff, isn't there something like dict in python, so we could loop it... (hmm, yes we have I guess https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs, that's later...)
rock_button.addEventListener("mouseenter", function() { onhover("rock"); });
rock_button.addEventListener("mouseout", function() { offhover("rock"); });

paper_button.addEventListener("mouseenter", function() { onhover("paper"); });
paper_button.addEventListener("mouseout", function() { offhover("paper"); });

scissor_button.addEventListener("mouseenter", function() { onhover("scissor"); });
scissor_button.addEventListener("mouseout", function() { offhover("scissor"); });



function onhover(choice) {
	if (!keepImg) {
	let element = document.querySelector(`.layer-1.left img.${choice}`);
	// display is not attribute
	// https://stackoverflow.com/a/4981472
	// element.setAttribute("display", "block");
	// not this is works
	// element.setAttribute("style", "display:block");
	// but also like in the link (comment)
	/* element.style.display = 'block'; */
	element.style.opacity = 1;

	// no this and normal one's simple reason connected in my mind... anyway...
	}
}

function offhover(choice) {
	if (!keepImg) {
	let element = document.querySelector(`.layer-1.left img.${choice}`);
	/* element.setAttribute("style", "display: none"); */
	element.setAttribute("style", "opacity: 0");
	}
}
// ---------------------------------------------


let startAndResetButton = document.querySelector(".layer-1.middle button");

// startAndResetButton.addEventListener("click", startGame);  

// TODO create a new boolean value, keep_image. chosen choices' images stays for few seconds on the screen. And while this value is also true, add if statement to startGame, so until images be transparent again, clicked button does nothing (as well as use this in onhover, offhover, so also player images not change...) (of if there is something like time.sleep() in python, we might not need extra 'if' statements... you know, not concurrent etc, but if it is, still nice, we can do lot of other things or just create few extra javascript files and seperate the things that gotta run constantly and that requires some sleep...)...
// NOTE ok, https://www.sitepoint.com/delay-sleep-pause-wait/ looks like, firstly I need a bit time until come to these (fully understanding, secondly I'll create keep_image boolean (async is good...)

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
// choses the random choice and expresses the result
function startGame(clicked_button) {
		if (!keepImg){
		computers_choice = choices[Math.floor(Math.random() * 3)];
		keepImg = true;
		showHideImages(clicked_button, computers_choice, 'show');
		console.log(winnerAlgorithm(clicked_button, computers_choice));
		setTimeout(
			() => {
			keepImg = false;
			showHideImages(clicked_button, computers_choice, 'hide');
			}
			, 3000
		);
	}
}

// maybe I could use switch statement here...
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

// resets the game
function resetGame() {
	
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


// TODO make the game min 3 round (until difference is 2), and then reset.... show the result in a box (position: absolute...) (create a element inside to that box)
