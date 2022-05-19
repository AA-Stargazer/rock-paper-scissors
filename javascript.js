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
	let element = document.querySelector(`.${choice}`);
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

function offhover(choice) {
	let element = document.querySelector(`img.${choice}`);
	/* element.setAttribute("style", "display: none"); */
	element.setAttribute("style", "opacity: 0");
}
// ---------------------------------------------







