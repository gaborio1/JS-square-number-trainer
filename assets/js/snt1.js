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
var num;
var minNum = 0;
var maxNum = 0;
var solution;
var answer;
var baseNum = 1;
var lastProbNumber;

//              LAST NUMBERS & PROBLEM NUMBERS ARRAYS
var lastNumbers = [];
var probNumbers = [];

var reducedProbNumbers = {};
var finalProbNumbers = [];

var statList = [];
var reducedStatList = {};

// var broblemNumbersCount = {}

//              PROGRESS BAR/INDICATOR VARIABLES
var isCorrect;
var rightA = 0;
var wrongA = 0;
var totalAttempts = 0;
var accuracy;
//              STYLE VARIABLES
var tablePlay = document.getElementById("tablePlay");
var container = document.getElementById("container");
var mathTable = document.getElementById("sqTableImg");
var intro2 = document.getElementById("intro2");
var dispFraction = document.getElementById("dispFraction");
var fractionTotal = document.getElementById("fracTotal");
var fractionRight = document.getElementById("fracRight");
var dispLevel = document.querySelector("#dispLevel");
var span = document.querySelector("#questionSpan");

// THIS IS VALUED AS NULL !!!
var dispFractionProbs = document.getElementById("DispFractionProbs");

var question = document.querySelector("#question");
var message = document.querySelector("#message");
var startButton = document.querySelector("#start");
var playButton = document.querySelector("#play");
var levelButtons = document.querySelectorAll(".levelButtons");

var levelButtonIndex;
// OR AS BELOW:
// var levelButtons = Array.from(document.querySelectorAll(".levelButtons"));
var mainDispLevel = document.getElementById("dispLevelMain");
var userInput = document.getElementById("numberIn");
var buttonsRow = document.getElementById("buttonsRow");
// var logo = document.getElementById("logo");
var dispAccuracy = document.getElementById("dispAccuracy");
var accuracySpan = document.getElementById("accuracySpan");
var progBar = document.getElementById("myBar");


var dispProbNums = document.getElementById("probNumbersDisp");
var probSpan = document.getElementById("probSpan");

// ========================================================================

//               FUNCTIONS


// PLACE CURSOR TO START WHEN PAGE LOADS??? DOES NOT WORK ???
function setFocusStart() {
  startButton.focus();
}

// PLACE CURSOR AT PLAY
function setFocusPlay() {
  playButton.focus();
}

// PLACE MOUSE CURSOR TO INPUT FIELD (STACK OVERFLOW)
function setFocusInput() {
  userInput.focus();




// NOT WORKING
  userInput.select();





}

// DECLARE FUNCTION setupLevelButtons()
function setupLevelButtons() {
  for (var i = 0; i < levelButtons.length; i++) {
    // STEP 1- REMOVE CLASS FROM ALL
    levelButtons[i].classList.remove("selected");
  }
  // STEP 2- ADD CLASS TO this ONLY !!! (OUTSIDE OF LOOP)
  this.classList.add("selected");
  setFocusPlay();
  // console.log(this);
  // RETRIEVE INDEX FROM TEXT CONTENT
  levelButtonIndex = Number(this.innerHTML);
  // CALCULATE MAXNUM BY MULTIPLYING INDEX BY 10
  maxNum = levelButtonIndex * 10;
  // SET MINNUM BY SUBSTRACTING 9 FROM MAXNUM
  minNum = maxNum - 9;
  levelButtonsStyle();
}

function levelButtonsStyle() {
  
// UPDATE DISPLEVEL TEXTCONTENT
  dispLevel.textContent = (levelButtonIndex + " (" + minNum + "-" + maxNum + ")");
  // HIDE INPUT FIELD
  userInput.classList.add("hidden");
  // HIDE QUESTION
  question.classList.add("hidden");
  // HIDE MESSAGE
  message.classList.add("hidden");



  // SHOW INSTRUCTION - NOT WORKING !!!
  // instruction.classList.remove("hidden");
  // THIS WORKS !!! WHYYYYY ???????????
  instruction.style="display: block";
  // UPDATE INSTRUCTION
  instruction.textContent="Click Play!";
}

// GENERATE RANDOM NUMBER BETWEEN minNUM AND maxNUM 
function randomSq() {
  num = Math.floor(Math.random() * (maxNum - minNum +1)) + minNum;
  console.log("Number: " + num);
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  // !!! THIS CONSOLE.LOGS TWICE EVERY TIME NUM === 1 0R LAST 5 AND DOES NOT WORK FOR 1 FOR THE VERY FIRST TIME!!!
  for (var i = 0; i < lastNumbers.length; i++) {
    if (num === 1 || num === lastNumbers[i]) {
      console.log("num === 1 or Last 5 numbers");
      randomSq();
    }
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  }
  randomSqStyle();
  // CALCULATE ITS SQUARE
  solution = Math.pow(num, 2);
  console.log("Solution: " + solution);
}

function randomSqStyle() {
  span.textContent = num;
  question.classList.remove("hidden");
  instruction.classList.add("hidden");
}

//  CALCULATE ACCURACY PERCENTAGE
function accuracyFunc() {
  totalAttempts = rightA + wrongA;
  // ROUND TO 2 DECIMAL PLACES (66.67 = 66.6666666)
  accuracy = ((rightA / totalAttempts) * 100).toFixed(2);
  // console.log("Accuracy:" + accuracy);
  accuracyStyle();
}

function rightAnswerStyle() {
  userInput.placeholder = solution;
  message.textContent = "That's right, madafaka!";
  message.style.color= " #0E7C4A";
  message.classList.remove("blink");
}

function wrongAnswerStyle() {
  $("#numberIn").val("");
  userInput.placeholder="Try again!";
  message.textContent="You're wrong, punk!";
  message.style.color= "#dd1534";
  message.classList.add("blink");
  dispProbNums.classList.remove("hidden");
  fractionTotal.classList.remove("green");
  fractionTotal.classList.add("red");

}

function accuracyStyle() {
  // ADD VALUE TO ACC SPAN
  accuracySpan.textContent = accuracy + "%";
  if (accuracy <= 10) {
    accuracySpan.textContent = "";
  }
  // SHOW ACCURACY PERCENTAGE
  dispAccuracy.classList.remove("hidden");
  // SET BAR WIDTH / SHOW BAR
  progBar.style.width = accuracy + '%'; 
  progBar.classList.remove("hidden");
  // SET ACCURACY FRACTIONS
  fractionTotal.textContent = rightA;
  fractionRight.textContent = totalAttempts;
  // SHOW ACCURACY FRACTIONS PARAGRAPH
  dispFraction.classList.remove("hidden");
  // HIDE intro2
  intro2.classList.add("hidden");
}

// ========================================================================

setFocusStart();

// ========================================================================

//              LISTENERS

$(document).ready(function(){
  $("#toggle1").click(function(){
    $("#container").fadeOut(300);
    $("#sqTableImg").delay(300).fadeIn(300);
    $("#toggle1").addClass("hidden");
    $("#toggle2").removeClass("hidden");
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    // SORT REDUCEDSTATLIST BY NUMBER OF WRONG ATTEMPTS (BY KEY: SWAP a and b)
    var sortable = [];
    for (var key in reducedStatList) {
      sortable.push([key, reducedStatList[key]]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log("sortable: " + sortable);
    for (var i=0; i<sortable.length; i++) {
      var para = document.createElement("SPAN");
      para.textContent = "Number " + sortable[i] + " Time(s)";
      document.getElementById("orderedStatTest").appendChild(para);
    }
    $("#orderedStatTest").delay(1000).fadeIn(300);
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    // STEP 1 = DISPLAY REDUCEDPROBNUMS{} CONTENT AS TEXT
    $.each(reducedStatList,function(key,value){
        $('#my-div').append("<span>"+"number: "+key+" / " +"count: "+value+"</span>")
      });
      // FADE IN NOT WORKING FOR THE FIRST TIME. AFTER ITS OK !!!
    $("#my-div").delay(650).fadeIn(300);
  });

  $("#toggle2").click(function(){
    $("#sqTableImg").delay(650).fadeOut(300);
    $("#container").delay(1000).fadeIn(300);
    $("#toggle2").addClass("hidden");
    $("#toggle1").removeClass("hidden");
    setFocusInput();
    $("#my-div").delay(300).fadeOut(300);
    $("#orderedStatTest").fadeOut(300);
    // STEP 2 = CLEAR CONTENT OF DIV
    function clearBox(){
      document.getElementById('my-div').innerHTML = "";
      document.getElementById('orderedStatTest').innerHTML = "";
    }
    setTimeout(function() {
      clearBox();
    }, 650);
  });
});

// THIS USED TO BE IN SETUPLEVBUTTONS FUNCTION (NESTED LOOP)
for (var i = 0; i < levelButtons.length; i++) {
  levelButtons[i].addEventListener("click", setupLevelButtons) 
}


// window.onload=function(){
//   document.getElementById('play').onclick = function() {
//       document.getElementById('numberIn').focus();
//   };
// }



// ADD LISTENER TO START BUTTON
$("#start").on("click", function() {
  // console.log("start clicked");
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  // WORKING ONLY FIRST TIME COS LEVELBUTTONS WILL CHANGE HEIGHT
  // $('#container').animate({height:'340'});
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
  buttonsRow.classList.remove("hidden");
  instruction.textContent = "Set level of difficulty";
  // THIS IS WHERE LEVELBUTTONS LISTENER USED TO BE
})

$(".levelButtons").on("click", function() {
  startButton.classList.add("hidden");
  playButton.classList.remove("hidden");
  // $("#dispLevelMain").delay(100).fadeIn(1000);
  mainDispLevel.classList.remove("hidden");
})


// ADD LISTENER TO PLAY BUTTON 
  // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
// KEYUP INSTEAD OF CLICK : PLAY BUTTON NOW WORKS AT FIRST CLICK BUT RIGHTANSWERMESSAGE ONLY SHOWS WHILE KEY IS PRESSED 
// DELAY STYLE FUNCTIONS ???
$("#play").on("keyup", function() {
  // console.log("play clicked ");
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


  // !!! NOT WORKING !!!
  // instruction.classList.add("hidden");
  // THIS WORKS BUT SOMETIMES ONLY SECONT TIME AROUND- WHYYYY ???
  // instruction.style="display: none";

  setFocusInput();

  // ELSE IF NOTWORKING
  // if (container.height = 400) {
  //   $('#container').animate({height:'550'});
  // } else {
  //   $('#container').css("height","630px");
  // }

 // CALL randomSq()
  randomSq();
  // PLACE MOUSE CURSOR TO INPUT FIELD (STACK OVERFLOW)
  // setFocusInput();
  
  // SHOW QUESTION
  question.classList.remove("hidden");
  // CLEAR PLACEHOLDER IN TEXTBOX 
  $("#numberIn").val("");
  message.classList.remove("hidden");
  // CLEAR MESSAGE FROM PREV GAME
  userInput.placeholder="Your guess";
  message.textContent="Now, think!";
  message.style.color= "yellow";
  userInput.classList.remove("hidden");
  // instruction.classList.add("hidden");
  instruction.style="display: none";
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

// GET USER INPUT
// THIS USED TO BE KEYPRESS() BUT NOW IT WORKS BETTER
$("input[type='number']").keyup(function(event){
  // ON HITTING ENTER
  if(event.which === 13) {
    // console.log("you hit enter");
    // dispFractionProbs.classList.remove("hidden");
    // dispFractionProbs.style="display: inline";
    // WORKING
    // $('#container').animate({height:'630'});
    // IF 630 , KEEP 630 (NOT TESTED)
    // $('#container').css("height","630px");

    // SAVE USER INPUT IN VAR ANSWER
    answer = Number($(this).val());
    // console.log("your guess: " + answer);
    if (answer !== solution) {
      // ??? CLEAR INPUT FIELD AGAIN ???
      isCorrect = false;
      wrongAnswerStyle();
      // ADD NUM TO FRONT OF PROBNUMBERS
      probNumbers.unshift(num);
      console.log("PROBNUMBERS: " + probNumbers);

      // REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
      reducedProbNumbers = probNumbers.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{})
      // GET PROPERTY NAMES - The Object.keys() method returns an array of a given object's own property names.
      for (let [key, value] of Object.entries(reducedProbNumbers)) {
        // console.log(`${key}: ${value}`);
        finalProbNumbers.unshift(`${key}: ${value}`);
        // console.log(finalProbNumbers);
      }
      // WORKING BUT SEE COMMENT BELOW! (ONLY WORKS IN CONSOLE)
      for (var key in reducedProbNumbers) {
        if (reducedProbNumbers.hasOwnProperty(key)) {
          // MAKE THIS CONSOLE.LOG TEXT CONTENT OF PROBSPAN2 !!! 
          // console.log(key + " -> " + reducedProbNumbers[key]);
        }
      }
      // AAAAAAAAAAAAAAAAAARGH!!!!!! THIS NOW WORKS WITH PROBNUMS BUT NO COUNT YET !!!
      probSpan.textContent= Object.keys(reducedProbNumbers);
      console.log("REDUCED PROBNUMS: " + Object.keys(reducedProbNumbers));
      //  + Object.values(reducedProbNumbers);
      // THIS WORKS IN CONSOLEBUT NOT AS TEXTCONTENT (DISPLAYS ONLY FIRST PROBNUM) !!!
      var keysArr = Object.keys(reducedProbNumbers);
      var valuesArr = Object.values(reducedProbNumbers);
      for (var i = 0; i < keysArr.length; i++) {
        for (var i = 0; i < valuesArr.length; i++) {
          console.log(keysArr[i] + " -> " + valuesArr[i]);
          // probSpan.textContent=keysArr[i] + " -> " + valuesArr[i];
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
    } else {
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
      for( var i = 1; i < probNumbers.length; i++){ 
        // &&
        if (probNumbers[i] === num) {
          probNumbers.splice(i, 1); 
          i--;
        }
      }
      console.log("SPLICE: " + probNumbers);
      // REDUCE ARRAY AND RETURN NUMBER/COUNT OBJECTS
      reducedProbNumbers = probNumbers.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{})
      probSpan.textContent= Object.keys(reducedProbNumbers);
      // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    }
    if (isCorrect) {
      rightA ++;
      // console.log("Right answers: " + rightA);
    } else {
      wrongA ++;
      // console.log("Wrong answers: " + wrongA);
    }
    accuracyFunc();
  }
})







