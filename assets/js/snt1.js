console.log("CONNECTED")
//  17/9/19 1115

//              MAIN LOGIC VARIABLES
let num;
let minNum = 0;
let maxNum = 0;
let solution;
// let answer;
let baseNum = 1;
let lastProbNumber;

//              LAST NUMBERS & PROBLEM NUMBERS ARRAYS
let lastNumbers = [];
let probNumbers = [];
let reducedProbNumbers = {};
let finalProbNumbers = [];
let statList = [];
let reducedStatList = {};

// var broblemNumbersCount = {}

//              PROGRESS BAR/INDICATOR VARIABLES
let isCorrect;
let isSubmitDisabled = false;
let rightA = 0;
let wrongA = 0;
let totalAttempts = 0;
let accuracy;
let levelButtonIndex;

//              STYLE VARIABLES
// var tablePlay = document.getElementById("tablePlay");
const playerContainer = document.getElementById("player-container");
// THIS IS A FAKE DIV TO MASK DIFFERENT FONTS IN PICTURE TEMPORARILY !!!
const tableImgHeader = document.getElementById("table-img-header");
const sqTableImg = document.getElementById("sq-table-img");
const introText = document.getElementById("intro-text");
const displayFraction = document.getElementById("display-fraction");
const fractionTotal = document.getElementById("fraction-total");
const fractionRight = document.getElementById("fraction-right");
const displayLevel = document.querySelector("#display-level");
const questionSpan = document.querySelector("#question-span");
// THIS IS VALUED AS NULL !!!
const fractionsContainer = document.getElementById("fractions-container");
const question = document.querySelector("#question");
const message = document.querySelector("#message");
const startButton = document.querySelector("#start-button");
const playButton = document.querySelector("#play-button");
const resetButton = document.querySelector("#reset-button");
const dispLevelPlayButton = document.querySelector("#display-level-play-button");
const levelButtons = document.querySelectorAll(".level-buttons");
// PLAY-BUTTON AND ALL LEVEL-BUTTONS (TO BE DISABLED UNTIL RIGHT ANSWER)
const disabledInPlay = document.querySelectorAll(".disabled-in-play");
// OR AS BELOW:
// var levelButtons = Array.from(document.querySelectorAll(".level-buttons"));
const mainDispLevel = document.getElementById("level-message");
const userInput = document.getElementById("number-input");
const buttonsRow = document.getElementById("buttons-row");
// var logo = document.getElementById("logo");
const progBarText = document.getElementById("prog-bar-text");
const progBarTextSpan = document.getElementById("prog-bar-text__span");
const progBar = document.getElementById("prog-bar");
const problemNumbers = document.getElementById("problem-numbers");
const problemNumbersSpan = document.getElementById("problem-numbers__span");
const firstOrderedStatContainer = document.getElementById('first-ordered-stat-container');
const secondOrderedStatContainer = document.getElementById('second-ordered-stat-container');

// =========================================================================================
// =========================================================================================

//               FUNCTIONS

// PLACE CURSOR TO START WHEN PAGE LOADS??? DOES NOT WORK ???
// function setFocusStart() {
//   startButton.focus();
// }

const setFocusStart = () => {
	startButton.focus();
}

const setFocusPlay = () => {
	playButton.focus();
}

// PLACE MOUSE CURSOR TO INPUT FIELD (STACK OVERFLOW)
const setFocusInput = () => {
	userInput.focus();
	// NOT WORKING
	userInput.select();
}

const styleLevelButtons = function () {
	for (let i = 0; i < levelButtons.length; i++) {
		// STEP 1- REMOVE CLASS FROM ALL
		levelButtons[i].classList.remove("selected");
	}
	// STEP 2- ADD CLASS TO this ONLY !!! (OUTSIDE OF LOOP)
	// this.classList.add("selected");
	setFocusPlay();
	// console.log(this);
}

// CALCULATE MAXNUM BY MULTIPLYING INDEX BY 10
const getMaxNum = (index) => index * 10;

// SET MINNUM BY SUBSTRACTING 9 FROM MAXNUM
const getMinNum = (max) => max - 9;

// HIDE/SHOW ELEMENTS
const hideElement = (el) => {
	el.classList.add("hidden");
}

const showElement = (el) => {
	el.classList.remove("hidden");
}

const elementStyleBlock = (el) => {
	el.style = "display: block";
}

const elementDisplayNone = (el) => {
	el.style = "display: none";
}

const makeTextContent = (el, text) => {
	el.textContent = text;
}

const makePlaceholderText = (el, text) => {
	el.placeholder = text;
}

const addClassListToElement = (el, classlist) => {
	el.classList.add(classlist);
}

const removeClassListFromElement = (el, classlist) => {
	el.classList.remove(classlist);
}

const setElementColor = (el, color) => {
	el.style.color = color;
}

// UNSHIFT NUM TO BEGINNING OF ARRAY
const addToStartOfArr = (el, arr) => {
	arr.unshift(el);
	return arr;
}

// REMOVE DUPLICATE ITEMS IN ARRAY AND RETURN NUMBER/COUNT OBJECTS
const reduceArr = (arr) => {
	return arr.reduce(function (acc, curr) {
		if (typeof acc[curr] == 'undefined') {
			acc[curr] = 1;
		} else {
			acc[curr] += 1;
		}
		return acc;
	}, {})
}

const removeChildElements = (el) => {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

// const fillEmptyDiv = (el, text) => {
//   if (!el.firstChild) {
//     console.log('empty div !!!');
//     el.textContent = text;
//   }
// }

// const clearDiv = (el) => {
//   if (el.textContent) {
//     el.textContent = "";
//   }
// }

// APPLY SYLES, UPDATE MESSAGES WHEN LEVEL SELECTION IN MADE
const styleLevelSelection = () => {
	// LGE SIZE ONLY
	makeTextContent(displayLevel, (`${levelButtonIndex} [${minNum} - ${maxNum}]`));
	// XSMALL SIZE ONLY 
	makeTextContent(dispLevelPlayButton, (`${levelButtonIndex} [${minNum} - ${maxNum}]`));
	hideElement(userInput);
	hideElement(question);
	hideElement(message);
	elementStyleBlock(instruction);
	makeTextContent(instruction, "Click Play!");
}

// WHEN LEVEL SELECTION BUTTON IS CLICKED
const handleLevelSelection = function () {
	styleLevelButtons();
	// STEP 2- ADD CLASS TO this ONLY !!! (OUTSIDE OF LOOP)
	addClassListToElement(this, "selected");
	setFocusPlay();
	// 1. RETREIVE INDEX FROM BUTTON'S TEXT (1-10)
	levelButtonIndex = Number(this.innerHTML);
	// 2. DEFINE MIN AND MAX NUMBER BASED ON SELECTED LEVEL (LEVEL 5 - MIN:41, MAX:50)
	maxNum = getMaxNum(levelButtonIndex);
	minNum = getMinNum(maxNum);
	styleLevelSelection();
}

// 3. GENERATE RANDOM NUMBER BETWEEN minNUM AND maxNUM BASED ON SELECTED LEVEL (11-20 ... 91-100 )
const randomNumBetween = (max, min) => {
	// ON LEVEL 1, DO NOT GENERATE NUMBER 1, RANGE IS 2-10
	if (max === 10) {
		min += 1;
	}
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

// DON'T GENERATE SAME NUMBER IF IT HAD COME UP IN THE LAST AT LEAST 5 TURNS 
const calcNumAndSolution = () => {
	num = randomNumBetween(maxNum, minNum);
	// !!! THIS CONSOLE.LOGS TWICE EVERY TIME NUM === 1 0R LAST 5 AND DOES NOT WORK FOR 1 FOR THE VERY FIRST TIME!!!
	for (let i = 0; i < lastNumbers.length; i++) {
		if (num === lastNumbers[i]) {
			console.log("num === Last 5 numbers");
			calcNumAndSolution();
		}
	}
	randomSqStyle();
	solution = calcSquare(num);
}

const calcSquare = (num) => Math.pow(num, 2);

const randomSqStyle = () => {
	makeTextContent(questionSpan, num);
	showElement(question);
	hideElement(instruction);
}

//  CALCULATE ACCURACY PERCENTAGE, ROUNDED TO 2 DECIMAL PLACES (66.67 = 66.6666666)
const calcAccuracy = () => {
	totalAttempts = rightA + wrongA;
	accuracy = ((rightA / totalAttempts) * 100).toFixed(2);
	accuracyStyle();
}

// STYLE RIGHT ANSWER
const rightAnswerStyle = () => {
	makePlaceholderText(userInput, solution);
	makeTextContent(message, "correct! click play!");
	setElementColor(message, " #0E7C4A");
	removeClassListFromElement(message, "blink");
}

// STYLE WRONG ANSWER
const wrongAnswerStyle = () => {
	$("#number-input").val("");
	makePlaceholderText(userInput, "Try again!");
	makeTextContent(message, "You're wrong, punk!");
	setElementColor(message, "#dd1534");
	addClassListToElement(message, "blink");
	showElement(problemNumbers);
	removeClassListFromElement(fractionTotal, "green");
	addClassListToElement(fractionTotal, "red");
}

// STYLE ACCURACY INDICATORS AND PROGBAR
const accuracyStyle = () => {
	progBarTextSpan.textContent = accuracy + "%";
	if (accuracy <= 10) {
		progBarTextSpan.textContent = "";
	}
	// SHOW ACCURACY PERCENTAGE
	showElement(progBarText);
	// SET BAR WIDTH / SHOW BAR
	progBar.style.width = accuracy + '%';
	showElement(progBar);
	// SET ACCURACY FRACTIONS
	makeTextContent(fractionTotal, rightA);
	makeTextContent(fractionRight, totalAttempts);
	// SHOW ACCURACY FRACTIONS PARAGRAPH
	showElement(displayFraction);
	// HIDE intro2
	hideElement(introText);
}

setFocusStart();

// =========================================================================================
// =========================================================================================

//              LISTENERS

$(document).ready(function () {
	console.log("document.ready");
	//  !!! TEMPORARY FIX FOR APPEARING SECOND DIV VHEN PAGE LOADS !!!
	$('#second-ordered-stat-container').hide();

	$("#player__toggle").click(function () {
		$("#player-container").fadeOut(500);
		$("#sq-table-img").delay(500).fadeIn(500);
		$("#table-img-header").delay(500).fadeIn(500);
		$("#player__toggle").addClass("hidden");
		$("#table__toggle").removeClass("hidden");

		// $("#first-ordered-stat-container").delay(1000).fadeIn(500);
		// $("#second-ordered-stat-container").delay(1500).fadeIn(500);

		// -------------------------- DIV 1 --------------------------
		// SORT REDUCEDSTATLIST BY NUMBER OF WRONG ATTEMPTS (BY KEY: SWAP a and b)
		// SORTABLE IS NESTED [], [[3,2],[17,1]...ETC]
		let sortable = [];
		for (let key in reducedStatList) {
			sortable.push([key, reducedStatList[key]]);
		}

		// ASCENDING ORDER BY VALUE OF value (NUMBER OF WRONG ATTEMPTS)
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});

		if (sortable.length < 1) {
			removeChildElements(firstOrderedStatContainer);
			removeChildElements(secondOrderedStatContainer);
			console.log("empty div");
			const emptyDivMessage = document.createElement("p");
			emptyDivMessage.textContent = "no stats available";

			// !!! ONLY WORKS FOR ONE DIV !!! 

			// const statDivs = document.querySelectorAll(".ordered-stat");
			// for (let el of statDivs) {
			//   el.appendChild(emptyDivMessage);
			//   console.log("appended child");
			// }   

			// firstOrderedStatContainer.appendChild(emptyDivMessage);
			secondOrderedStatContainer.appendChild(emptyDivMessage);
		} else {
			console.log("stats to display");
		}

		// !!! THIS CONSOLE.LOG PREVENTS EMPTY STAT DIVS FROM SHOWING UP !!!
		// KEY IS STRING AND VALUTE IS NUMBER !!!
		// console.log("sortable: " + sortable);
		// console.log("sortable1: " + sortable[0][0],sortable[0][1], typeof sortable[0]);

		// CLEAR CONTENT OF FIRST ordered-stat-container
		removeChildElements(firstOrderedStatContainer);
		// removeChildElements(secondOrderedStatContainer);

		for (let i = 0; i < sortable.length; i++) {
			// !!!!! ONLY DISPLAY FIRST 10 SPANS IN STATS DIV, THIS FILLS UP DIV'S LENGTH !!!!!
			if (i === 10) { break; }

			removeChildElements(secondOrderedStatContainer);
			const statCounterSpan = document.createElement("span");

			// statCounterSpan.textContent = `Number: ${sortable[i][0]}  /  count: ${sortable[i][1]}`;

			statCounterSpan.textContent = `${sortable[i][0]}(${sortable[i][1]})`;
			firstOrderedStatContainer.appendChild(statCounterSpan);

			const secondStatAccuracySpan = document.createElement("span");
			secondStatAccuracySpan.textContent = `Accuracy: ${rightA} / ${totalAttempts}`;
			secondOrderedStatContainer.appendChild(secondStatAccuracySpan);

			const secondStatProbNumsSpan = document.createElement("span");
			secondStatProbNumsSpan.textContent = `Problem Numbers: ${Object.keys(reducedProbNumbers)}`;
			secondOrderedStatContainer.appendChild(secondStatProbNumsSpan);
		}


		if (sortable.length > 0) {
			$("#first-ordered-stat-container").delay(1000).fadeIn(500);
			$("#second-ordered-stat-container").delay(1500).fadeIn(500);
		} else {
			$("#second-ordered-stat-container").delay(1000).fadeIn(500);
		}
		// $("#first-ordered-stat-container").delay(1000).fadeIn(500);
		// $("#second-ordered-stat-container").delay(1500).fadeIn(500);
	});

	// ADD EVENTLISTENER TO LEVELBUTTONS
	const addEvtListenerToElements = (arr, func) => {
		for (let i = 0; i < arr.length; i++) {
			arr[i].addEventListener("click", func)
		}
	}

	addEvtListenerToElements(levelButtons, handleLevelSelection);

	const clearStatsText = (...args) => {
		for (let arg of args) {
			arg.innerHTML = "";
		}
	}

	// PLAYER/TABLE TOGGLE
	$("#table__toggle").click(function () {
		$("#sq-table-img").delay(1000).fadeOut(500);
		$("#table-img-header").delay(1000).fadeOut(500);
		$("#player-container").delay(1500).fadeIn(500);
		$("#table__toggle").addClass("hidden");
		$("#player__toggle").removeClass("hidden");
		setFocusInput();
		$("#first-ordered-stat-container").delay(500).fadeOut(500);
		$("#second-ordered-stat-container").fadeOut(500);
		// OLD DIV NOT IN USE
		// $("#ordered-stat").fadeOut(300);

		// STEP 2 = CLEAR CONTENT OF DIV
		setTimeout(function () {
			clearStatsText(orderedStatContainer, orderedStat);
			// clearBox();
		}, 650);
	});
});

// window.onload=function(){
//   document.getElementById('play-button').onclick = function() {
//       document.getElementById('number-input').focus();
//   };
// }

// ADD LISTENER TO START BUTTON
$("#start-button").on("click", function () {
	// console.log("start clicked");
	// ANIMATE PLAYER SIZE IN LARGE SIZE
	if ($(window).width() > 600) {
		$("#player-container").animate({
			height: "350px",
			// opacity: 0.5,
		}, 1000);
	}

	// LEVELBUTTONS FADEIN ONE BY ONE - TRY WITH LOOP MAYBE??
	$("#lev1").delay(100).fadeIn(1000);
	$("#lev2").delay(200).fadeIn(1000);
	$("#lev3").delay(300).fadeIn(1000);
	$("#lev4").delay(400).fadeIn(1000);
	$("#lev5").delay(500).fadeIn(1000);
	$("#lev6").delay(600).fadeIn(1000);
	$("#lev7").delay(700).fadeIn(1000);
	$("#lev8").delay(800).fadeIn(1000);
	$("#lev9").delay(900).fadeIn(1000);
	$("#lev10").delay(1000).fadeIn(1000);

	$("#instruction").delay(100).fadeIn(2000);
	$("#buttons-row").delay(100).fadeIn(1000);
	buttonsRow.classList.remove("hidden");
	showElement(buttonsRow);
	instruction.textContent = "Set level of difficulty";
	startButton.disabled = true;
	addClassListToElement(startButton, "disabled");
})

$(".level-buttons").on("click", function () {
	hideElement(startButton);
	showElement(playButton);
	// $("#level-message").delay(100).fadeIn(1000);
	showElement(mainDispLevel);

	// console.log(levelButtonIndex, minNum, maxNum);
	// makeTextContent(dispLevelPlayButton, (levelButtonIndex + " (" + minNum + "-" + maxNum + ")"));

	// console.log($(window).width());

	// ANIMATE PLAYER SIZE IN LARGE SIZE
	if ($(window).width() > 600) {
		if ($('#player-container').height() > 620) {
			$("#player-container").animate({
				height: "480px",
			}, 1000);
		} else if ($('#player-container').height() > 350 && $('#player-container').height() < 620) {
			$("#player-container").animate({
				height: "480px",
			}, 1000);
		} else {
			$("#player-container").animate({
				height: "450px",
			}, 1000);
		}
	}
})


// ADD LISTENER TO PLAY BUTTON 
// KEYUP INSTEAD OF CLICK : PLAY BUTTON NOW WORKS AT FIRST CLICK BUT RIGHTANSWERMESSAGE ONLY SHOWS WHILE KEY IS PRESSED 
// DELAY STYLE FUNCTIONS ???
$("#play-button").on("click", function () {
	console.log("play clicked ");

	isSubmitDisabled = false;

	// ANIMATE PLAYER SIZE IN LARGE SIZE
	if ($(window).width() > 600) {
		if ($('#player-container').height() < 450) {
			$("#player-container").animate({
				height: "620px",
			}, 1000);
		} else {
			$("#player-container").animate({
				height: "680px",
			}, 1000);
		}
	}

	setFocusInput();
	// CALL randomSq()
	calcNumAndSolution();
	// PLACE MOUSE CURSOR TO INPUT FIELD (STACK OVERFLOW)
	// setFocusInput();
	showElement(question);
	// CLEAR PLACEHOLDER IN TEXTBOX 
	$("#number-input").val("");
	// message.classList.remove("hidden");
	showElement(message);
	// CLEAR MESSAGE FROM PREV GAME
	makePlaceholderText(userInput, "Enter to submit");
	makeTextContent(message, "Now, think!");
	setElementColor(message, "yellow");
	showElement(userInput);
	elementDisplayNone(instruction);
	// ADD LAST NUM TO FRONT OF ARRAY 
	lastNumbers.unshift(num);
	// DO NOT GENERATE SAME NUMBER TWICE FOR 5 TURNS, KEEP ARRAY LENGTH AT 5 (REMOVE 6th (LAST)
	if (lastNumbers.length >= 5) {
		lastNumbers.pop();
	}
	// !!! OR MUCH SIMPLER, SET LENGTH TO REMOVE ELEMENTS FROM END !!! NOT TESTED !!!
	// lastNumbers.length = 5;

	// DISABLE PLAY/LEVEL BUTTONS UNTIL RIGHT ANSWER IS SUBMITTED
	disabledInPlay.forEach((button) => {
		button.disabled = true;
		addClassListToElement(button, "disabled");
	})
})

$("#reset-button").on("click", function () {
	console.log("reset clicked");
	rightA = 0;
	wrongA = 0;
	totalAttempts = 0;
	accuracy = 0;

	progBar.style.width = accuracy + '%';
	progBarTextSpan.textContent = "";
	// calcAccuracy();
})


// GET USER INPUT
// THIS USED TO BE KEYPRESS() BUT NOW IT WORKS BETTER
$("input[type='number']").keyup(function (event) {
	// ON HITTING ENTER
	if (event.which === 13 && !isSubmitDisabled) {
		console.log("you hit enter");

		// ANIMATE PLAYER SIZE IN LARGE SIZE
		if ($(window).width() > 600) {
			$("#player-container").animate({
				height: "680px",
			}, 1000);
		}

		// SAVE ANSWER
		let answer = Number($(this).val());
		// IF WRONG ANSWER
		if (answer !== solution) {
			// ??? CLEAR INPUT FIELD AGAIN ???
			isCorrect = false;
			wrongAnswerStyle();

			// 1. ADD NUM TO BEGINNING OF PROBNUMBERS
			probNumbers = addToStartOfArr(num, probNumbers);
			console.log("PROBNUMBERS: " + probNumbers);

			// NNNNNNNNNNNNNNNNNNNNNNNNNNNN
			// LIMIT LENGTH AT 12 ?
			// if (probNumbers.length > 12) {
			//   probNumbers.pop();
			// }
			// NNNNNNNNNNNNNNNNNNNNNNNNNNNN

			// 2. REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
			reducedProbNumbers = reduceArr(probNumbers);

			// GET PROPERTY NAMES - The Object.keys() method returns an array of a given object's own property names.
			for (let [key, value] of Object.entries(reducedProbNumbers)) {
				// console.log(`${key}: ${value}`);
				finalProbNumbers.unshift(`${key}: ${value}`);
				console.log("final probnumbers: " + finalProbNumbers);
			}

			// NOT IN USE !!!
			// WORKING BUT SEE COMMENT BELOW! (ONLY WORKS IN CONSOLE)
			for (let key in reducedProbNumbers) {
				if (reducedProbNumbers.hasOwnProperty(key)) {
					// MAKE THIS CONSOLE.LOG TEXT CONTENT OF PROBSPAN2 !!! 
					console.log(key + " -> " + reducedProbNumbers[key]);
				}
			}

			// AAAAAAAAAAAAAAAAAARGH!!!!!! THIS NOW WORKS WITH PROBNUMS BUT NO COUNT YET !!!
			problemNumbersSpan.textContent = Object.keys(reducedProbNumbers);
			// console.log("REDUCED PROBNUMS: " + Object.keys(reducedProbNumbers));
			//  + Object.values(reducedProbNumbers);
			// THIS WORKS IN CONSOLEBUT NOT AS TEXTCONTENT (DISPLAYS ONLY FIRST PROBNUM) !!!
			let keysArr = Object.keys(reducedProbNumbers);
			let valuesArr = Object.values(reducedProbNumbers);
			for (let i = 0; i < keysArr.length; i++) {
				for (let i = 0; i < valuesArr.length; i++) {
					// console.log(keysArr[i] + " -> " + valuesArr[i]);
					// problemNumbersSpan.textContent=keysArr[i] + " -> " + valuesArr[i];
				}
			}
			// ADD NUM IN FRONT OF STATLIST - WORKING
			statList.unshift(num);
			// console.log("STATLIST: " + statList);
			// REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
			reducedStatList = reduceArr(statList);
		}

		// IF RIGHT ANSWER 
		else {
			isSubmitDisabled = true;
			rightAnswerStyle();
			setFocusPlay();
			isCorrect = true;
			console.log("PROBNUMBERS: " + probNumbers);
			// IF ANSWER WAS WRONG PREVIOUSLY (EVEN MULTIPLE TIMES OR IN A ROW) DELETE FROM PROBNUMS 
			// NOT WORKING IF NUM==PROBNUMS[0]
			// IF i IS SET TO 0 THEN IT WONT LIST NUMBERS, ONLY THE CURRENT WRONG ANSWER IS DISPLAYED UNTIL RIGHT ANSWER
			// MAKE i A VARIABLE (0 OR 1) DEPENDING ON WHETHER NUM IS ALREADY LISTED ???
			for (let i = 1; i < probNumbers.length; i++) {
				// &&
				if (probNumbers[i] === num) {
					probNumbers.splice(i, 1);
					i--;
				}
			}
			console.log("SPLICE: " + probNumbers);
			// REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTSs, THEN DISPLAY KEYS AS PROBLEM NUMBERS 
			reducedProbNumbers = reduceArr(probNumbers);
			makeTextContent(problemNumbersSpan, Object.keys(reducedProbNumbers));

			// ENABLE PLAY/LEVEL BUTTONS UNTIL RIGHT ANSWER IS SUBMITTED
			disabledInPlay.forEach((button) => {
				button.disabled = false;
				removeClassListFromElement(button, "disabled");
			})
		}
		if (isCorrect) {
			rightA++;
		} else {
			wrongA++;
		}
		calcAccuracy();
	}
})
