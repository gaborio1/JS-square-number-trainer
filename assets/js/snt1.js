
console.log("CONNECTED")

//  17/9/19 1115

//          ISSUES TO FIX / FUNCTIONS TO ADD

// CURSOR FOCUS  !!! TRY blur() TO CLEAR FOCUS !!!
// ??? HAVE TO PRESS PLAY TWICE AFTER CHANGING DIFF LEVEL TO GET FOCUS INTO INPUT SO A NEW NUMBER IS GENERATED THEN 
// CLEAR LASTNUMBERS[] WHEN CHANGING DIFF LEVEL ???
// ADD RANDOM 2-100 DIFF LEVEL BY CLICKING ON LOGO???
// ADD SQUARE NUMBERS TABLE AS GUIDE (TOGGLE) HIGHLIGHT PROBLEM NUMBERS
// FLASH MESSAGE IF WRONG ANSWER GIVEN WITH JS 
// FLASH/HIGHLIGHT TABLESQUARE BUTTON IF WRONG
// STATISTICS FADE IN NOT WORKING FOR FIRST CLICK
// PROGBAR BORDER APPEARS WHEN PAGE POADS
// IF PROBNUM COMES UP AGAIN AND GUESSED RIGHT REMOVE IT FROM PROBNUMS
// FADEIN LEVELBUTTONS WITH FAST DELAY
// FADEIN MESSAGE, INPUT FIELD, PROGBAR ???

// MAKE SEPARATE ARRAY FOR STATISTICS SO IT IS NOT AFFECTED BY CHANGES IN BROBNUMS

// DO CSS
// RENAME VARIABLES/IDS/CLASSES
// ------------------------------------------------------------------------
// +++FIXED+++ SELECT ONLY ONE LEVEL AT ONCE
// +++FIXED+++ ZONAL DIFF LEVELS
// +++FIXED+++ SHOW FRACTIONAL RESULT
//  +++FIXED+++   STOP BUBBLING IN random FUNCTION   (CAUSE: NESTED FUNCTIONS)
//  +++FIXED+++ MAKE solution GLOBAL !!!
//  +++FIXED+++ DISPQUESTION STYLE (SPAN)
// +++FIXED+++ SHOW ACCURACY PERCENTAGE BAR
// +++FIXED+++ FLASH MESSAGE IF WRONG WITH CSS
//  +++FIXED+++ DO NOT GENERATE 1 OR SAME NUMBER TWICE FOR 5 TURNS
// +++OK TO USE+++ ???  AVOID ONCLICK ???
// +++FIXED+++ ADD .startPlay TO START AND PLAY FOR CSS
// +++FIXED+++LIST TOP PROBLEM NUMBERS (NO REPEAT)
// +++FIXED+++FIND A WAY TO DISPLAY HOW MANY TIMES A PROB NUMBER OCCOURS !!! 

// ========================================================================

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
let rightA = 0;
let wrongA = 0;
let totalAttempts = 0;
let accuracy;
//              STYLE VARIABLES
// var tablePlay = document.getElementById("tablePlay");
const playerContainer = document.getElementById("player-container");
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
const levelButtons = document.querySelectorAll(".level-buttons");

let levelButtonIndex;
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

// ========================================================================

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

const styleLevelButtons = function() {
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

const addClassListToElement = (el, classlist) => {
  el.classList.add(classlist);
}

const removeClassListFromElement = (el, classlist) => {
  el.classList.remove(classlist);
}

// APPLY SYLES WHEN LEVEL SELECTION IN MADE
const styleLevelSelection = () => {
  // UPDATE DISPLEVEL TEXTCONTENT
  makeTextContent(displayLevel, (levelButtonIndex + " (" + minNum + "-" + maxNum + ")"));
  // HIDE ELEMENTS
  hideElement(userInput);
  hideElement(question);
  hideElement(message);
// SHOW INSTRUCTION - NOT WORKING !!!
  // instruction.classList.remove("hidden");
  // THIS WORKS !!! WHYYYYY ???????????
  elementStyleBlock(instruction);
  // UPDATE INSTRUCTION
  makeTextContent(instruction, "Click Play!");
}

// LEVEL SELECTION BUTTONS
const handleLevelButtons = function() {
  styleLevelButtons();
  // STEP 2- ADD CLASS TO this ONLY !!! (OUTSIDE OF LOOP)
  addClassListToElement(this, "selected");
  setFocusPlay();
  // console.log(this);
  // RETRIEVE INDEX FROM TEXT CONTENT
  levelButtonIndex = Number(this.innerHTML);
  maxNum = getMaxNum(levelButtonIndex);
  minNum = getMinNum(maxNum);
  styleLevelSelection();
}

// GENERATE RANDOM NUMBER BETWEEN minNUM AND maxNUM BASED ON SELECTED LEVEL (11-20 ... 91-100 )
const randomNum = (maxNum, minNum) => {
  return (Math.floor(Math.random() * (maxNum - minNum +1)) + minNum);
}

const calcNumAndSolution = () => {
  // num = Math.floor(Math.random() * (maxNum - minNum +1)) + minNum;
  num = randomNum(maxNum, minNum);
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  // !!! THIS CONSOLE.LOGS TWICE EVERY TIME NUM === 1 0R LAST 5 AND DOES NOT WORK FOR 1 FOR THE VERY FIRST TIME!!!
  for (let i = 0; i < lastNumbers.length; i++) {
    if (num === 1 || num === lastNumbers[i]) {
      console.log("num === 1 or Last 5 numbers");
      calcNumAndSolution();
    }
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  }
  randomSqStyle();
  // CALCULATE ITS SQUARE
  solution = calcSquare(num);
}

const calcSquare = (num) => Math.pow(num, 2);

const randomSqStyle = () => {
  questionSpan.textContent = num;
  showElement(question);
  hideElement(instruction);
}

//  CALCULATE ACCURACY PERCENTAGE
const calcAccuracy = () => {
  totalAttempts = rightA + wrongA;
  // ROUND TO 2 DECIMAL PLACES (66.67 = 66.6666666)
  accuracy = ((rightA / totalAttempts) * 100).toFixed(2);
  // console.log("Accuracy:" + accuracy);
  accuracyStyle();
}

// STYLE RIGHT ANSWER
const rightAnswerStyle = () => {
  userInput.placeholder = solution;
  makeTextContent(message, "That's right, madafaka!");
  message.style.color= " #0E7C4A";
  removeClassListFromElement(message, "blink");
}

// STYLE WRONG ANSWER
const wrongAnswerStyle = () => {
  $("#number-input").val("");
  userInput.placeholder="Try again!";
  makeTextContent(message, "You're wrong, punk!");
  message.style.color= "#dd1534";
  addClassListToElement(message, "blink");
  showElement(problemNumbers);
  removeClassListFromElement(fractionTotal, "green");
  addClassListToElement(fractionTotal, "red");
}

// STYLE ACCURACY INDICATORS AND PROGBAR
const accuracyStyle = () => {
  // ADD VALUE TO ACC SPAN
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

// ========================================================================

setFocusStart();

// ========================================================================

//              LISTENERS

$(document).ready(function(){
  $("#player__toggle").click(function(){
    $("#player-container").fadeOut(300);
    $("#sq-table-img").delay(300).fadeIn(300);
    $("#player__toggle").addClass("hidden");
    $("#table__toggle").removeClass("hidden");



    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN 
    // DIV 1
    // SORT REDUCEDSTATLIST BY NUMBER OF WRONG ATTEMPTS (BY KEY: SWAP a and b)
    let sortable = [];
    for (let key in reducedStatList) {
      sortable.push([key, reducedStatList[key]]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });

    // KEY IS STRING AND VALUTE IS NUMBER !!!
    console.log("sortable: " + sortable);
    console.log("sortable1: " + sortable[0][0],sortable[0][1], typeof sortable[0]);
    
    for (let i = 0; i < sortable.length; i++) {
      const counter = document.createElement("span");
      counter.textContent = `Number: ${sortable[i][0]}  /  count: ${sortable[i][1]}`;
      document.getElementById("ordered-stat").appendChild(counter);
    }
    $("#ordered-stat").delay(1000).fadeIn(300);
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN 



    // DIV 2
    // STEP 1 = DISPLAY REDUCEDPROBNUMS{} CONTENT AS TEXT
    $.each(reducedStatList,function(key,value){
        $('#ordered-stat-container').append("<span>"+"number: "+key+" / " +"count: "+value+"</span>")
      });
      // FADE IN NOT WORKING FOR THE FIRST TIME. AFTER ITS OK !!!
    $("#ordered-stat-container").delay(650).fadeIn(300);
  });







  $("#table__toggle").click(function(){
    $("#sq-table-img").delay(650).fadeOut(300);
    $("#player-container").delay(1000).fadeIn(300);
    $("#table__toggle").addClass("hidden");
    $("#player__toggle").removeClass("hidden");
    setFocusInput();
    $("#ordered-stat-container").delay(300).fadeOut(300);
    $("#ordered-stat").fadeOut(300);
    // STEP 2 = CLEAR CONTENT OF DIV
    function clearBox(){
      document.getElementById('ordered-stat-container').innerHTML = "";
      document.getElementById('ordered-stat').innerHTML = "";
    }
    setTimeout(function() {
      clearBox();
    }, 650);
  });
});

// THIS USED TO BE IN SETUPLEVBUTTONS FUNCTION (NESTED LOOP)
for (let i = 0; i < levelButtons.length; i++) {
  levelButtons[i].addEventListener("click", handleLevelButtons) 
}

// window.onload=function(){
//   document.getElementById('play-button').onclick = function() {
//       document.getElementById('number-input').focus();
//   };
// }

// ADD LISTENER TO START BUTTON
$("#start-button").on("click", function() {
  // console.log("start clicked");
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  // WORKING ONLY FIRST TIME COS LEVELBUTTONS WILL CHANGE HEIGHT
  // $('#player-container').animate({height:'340'});
  // TRY WRAPPING ALL OF THIS IN .ready() !!!
  // THIS IS NOW WORKING, NEXT TRY TO FADEIN ONE BY ONE
  // $(".levelButtons").delay(100).fadeIn(1000);
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


  // INSTRUCTION FADE IN - NOT WORKING (because classlist.remove was active)
  $("#instruction").delay(100).fadeIn(2000);
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  // buttonsRow.classList.remove("hidden");
  showElement(buttonsRow);
  instruction.textContent = "Set level of difficulty";
  // THIS IS WHERE LEVELBUTTONS LISTENER USED TO BE
})

$(".level-buttons").on("click", function() {
  hideElement(startButton);
  showElement(playButton);
  // $("#level-message").delay(100).fadeIn(1000);
  showElement(mainDispLevel);
})


// ADD LISTENER TO PLAY BUTTON 
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
// KEYUP INSTEAD OF CLICK : PLAY BUTTON NOW WORKS AT FIRST CLICK BUT RIGHTANSWERMESSAGE ONLY SHOWS WHILE KEY IS PRESSED 
// DELAY STYLE FUNCTIONS ???
$("#play-button").on("keyup", function() {
  // console.log("play clicked ");
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

// !!! NOT WORKING !!!
  // instruction.classList.add("hidden");
  // THIS WORKS BUT SOMETIMES ONLY SECONT TIME AROUND- WHYYYY ???
  // instruction.style="display: none";

  setFocusInput();

  // ELSE IF NOTWORKING
  // if (playerContainer.height = 400) {
  //   $('#player-container').animate({height:'550'});
  // } else {
  //   $('#player-container').css("height","630px");
  // }

 // CALL randomSq()
 calcNumAndSolution();
  // PLACE MOUSE CURSOR TO INPUT FIELD (STACK OVERFLOW)
  // setFocusInput();
  
  // SHOW QUESTION
  showElement(question);
  // CLEAR PLACEHOLDER IN TEXTBOX 
  $("#number-input").val("");
  // message.classList.remove("hidden");
  showElement(message);
  // CLEAR MESSAGE FROM PREV GAME
  userInput.placeholder="Your guess";
  makeTextContent(message, "Now, think!");
  message.style.color= "yellow";
  showElement(userInput);
  elementDisplayNone(instruction);
  // THIS WILL CAUSE A SUDDEN CHANGE IN CONTAINER SIZE (NOT NICE)
  // $("#instruction").delay(100).fadeOut(1000);
  // ADD LAST NUM TO FRONT OF ARRAY 
  lastNumbers.unshift(num);
  // console.log(lastNumbers);
  // DO NOT GENERATE SAME NUMBER TWICE FOR 5 TURNS
  //  KEEP ARRAY LENGTH AT 5 (REMOVE 6th (LAST) FROM ARRAY)
  if (lastNumbers.length >= 5) {
    lastNumbers.pop();
  }
  // !!! OR MUCH SIMPLER, SET LENGTH TO REMOVE ELEMENTS FROM END !!! NOT TESTED !!!
  // lastNumbers.length = 5;
})

// ========================================================================

// REMOVE DUPLICATE ITEMS IN PROBNUMS AND RETURN NUMBER/COUNT OBJECTS
const reduceArr = (arr) => {
   return arr.reduce(function (acc, curr) {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  },{})
}

// UNSHIFT NUM TO BEGINNING OF ARRAY
const addToStartOfArr = (el, arr) => {
  arr.unshift(el);
  return arr;
}

// GET USER INPUT
// THIS USED TO BE KEYPRESS() BUT NOW IT WORKS BETTER
$("input[type='number']").keyup(function(event){
  // ON HITTING ENTER
  if(event.which === 13) {
    // console.log("you hit enter");
    // fractionsContainer.classList.remove("hidden");
    // fractionsContainer.style="display: inline";
    // WORKING
    // $('#player-container').animate({height:'630'});
    // IF 630 , KEEP 630 (NOT TESTED)
    // $('#player-container').css("height","630px");

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

      // 2. REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
      reducedProbNumbers = reduceArr(probNumbers);      

      // GET PROPERTY NAMES - The Object.keys() method returns an array of a given object's own property names.
      for (let [key, value] of Object.entries(reducedProbNumbers)) {
        // console.log(`${key}: ${value}`);
        finalProbNumbers.unshift(`${key}: ${value}`);
        // console.log(finalProbNumbers);
      }

      // WORKING BUT SEE COMMENT BELOW! (ONLY WORKS IN CONSOLE)
      for (let key in reducedProbNumbers) {
        if (reducedProbNumbers.hasOwnProperty(key)) {
          // MAKE THIS CONSOLE.LOG TEXT CONTENT OF PROBSPAN2 !!! 
          // console.log(key + " -> " + reducedProbNumbers[key]);
        }
      }

      // AAAAAAAAAAAAAAAAAARGH!!!!!! THIS NOW WORKS WITH PROBNUMS BUT NO COUNT YET !!!
      problemNumbersSpan.textContent= Object.keys(reducedProbNumbers);
      console.log("REDUCED PROBNUMS: " + Object.keys(reducedProbNumbers));
      //  + Object.values(reducedProbNumbers);
      // THIS WORKS IN CONSOLEBUT NOT AS TEXTCONTENT (DISPLAYS ONLY FIRST PROBNUM) !!!
      let keysArr = Object.keys(reducedProbNumbers);
      let valuesArr = Object.values(reducedProbNumbers);
      for (let i = 0; i < keysArr.length; i++) {
        for (let i = 0; i < valuesArr.length; i++) {
          console.log(keysArr[i] + " -> " + valuesArr[i]);
          // problemNumbersSpan.textContent=keysArr[i] + " -> " + valuesArr[i];
        }
      }
      // ADD NUM IN FRONT OF STATLIST - WORKING
      statList.unshift(num);
      console.log("STATLIST: " + statList);
      // REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
      reducedStatList = statList.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{})
    } 

    // IF RIGHT ANSWER 
    else {
      rightAnswerStyle();
      // PLACE CURSOR TO PLAYBUTTON IF CORRECT !!!
      setFocusPlay();
      isCorrect = true;
      // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
      console.log("PROBNUMBERS: " + probNumbers);
      // IF ANSWER WAS WRONG PREVIOUSLY (EVEN MULTIPLE TIMES OR IN A ROW) DELETE FROM PROBNUMS 
      // NOT WORKING IF NUM==PROBNUMS[0]
      // IF i IS SET TO 0 THEN IT WONT LIST NUMBERS, ONLY THE CURRENT WRONG ANSWER IS DISPLAYED UNTIL RIGHT ANSWER
      // MAKE i A VARIABLE (0 OR 1) DEPENDING ON WHETHER NUM IS ALREADY LISTED ???
      for( let i = 1; i < probNumbers.length; i++){ 
        // &&
        if (probNumbers[i] === num) {
          probNumbers.splice(i, 1); 
          i--;
        }
      }
      console.log("SPLICE: " + probNumbers);
      // REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTSs
      reducedProbNumbers = probNumbers.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{})
      problemNumbersSpan.textContent= Object.keys(reducedProbNumbers);
      // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    }
    if (isCorrect) {
      rightA ++;
      // console.log("Right answers: " + rightA);
    } else {
      wrongA ++;
      // console.log("Wrong answers: " + wrongA);
    }
    calcAccuracy();
  }
})
