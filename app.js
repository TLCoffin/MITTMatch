// Shuffle function from http://stackover-flow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function restartGame() {
  shuffleBoard(cardClassArray);
  let cardBoard = document.querySelectorAll("ul li");
  for (let i = 0; i < cardBoard.length; i++) {
    cardBoard[i].className = "card";
  }

  score.innerText = "0";
  currentScore = 1;
  play = true;
  cardMatchPile = [];
  for (let i = 0; i < cardClassArray.length; i++) {
    cardMatchPile.push(cardClassArray[i]);
  }
  currentCard = cardMatchPile[0];
  correctMatches = 0;
}

// Shuffles all the cards on the board
function shuffleBoard(cardArray) {
  // create an array of shuffled cards for the game board
  let cardBoard = shuffle(cardArray);
  
  // select all icon elements that are on the gameboard
  let cardList = document.querySelectorAll("ul i.fas");
  // For each card set a new randomized class for icon display
  for (let i = 0; i < cardList.length; i++) {
    cardList[i].className = cardBoard[i];
  }

  // Create a second shuffled class array and set the next card HTML element to the card that you are supposed to be matching
  let cardStack = shuffle(cardArray);
  document.querySelector(".scoreboard i").className = cardStack[0];
}

// An array template with the classNames
// This array gets copied and shuffled for unique gameboards each time
let cardClassArray = [
  "fas fa-atom",
  "fas fa-frog",
  "fas fa-feather-alt",
  "fas fa-cogs",
  "fas fa-anchor",
  "fas fa-fan",
  "fas fa-bolt",
  "fas fa-hat-wizard",
  "fas fa-apple-alt",
  "fas fa-bell",
  "fas fa-bomb",
  "fas fa-brain"
];

// This code block starts upon game start to create a copy of the class array to manipulate for the game
let cardMatchPile = [];
shuffleBoard(cardClassArray);
for (let i = 0; i < cardClassArray.length; i++) {
  cardMatchPile.push(cardClassArray[i]);
}
console.log("The card match", cardMatchPile);

// Variable Declaration
let cardHolder = document.getElementById("cards"); // The gameboard ul element
let score = document.getElementById("score"); // The turn counter element
let currentScore = 1; // How many turns the player has taken
let play = true; // If the player is allowed to take another turn or not
let currentCard = cardMatchPile[0]; // The next card the player is meant to match
let correctMatches = 0; // Total correct matches
const MAX_PAIRS = 12; // How many pairs to win the game




// listen for clicks inside of the ul
cardHolder.addEventListener("click", event => {
  // Set the new next card
  currentCard = cardMatchPile[0];

  // Check if the target is a card and play is true then pause the game, show the card, and incriment the score
  if (event.target.className === "card" && play === true) {
    play = false;
    event.target.className += " show";
    score.innerText = currentScore++;
  }

  // Wait 600 miliseconds then flip the card back over and allow a new player turn
  setTimeout(() => {
    if (event.target.className === "card show") {
      event.target.className = "card";
      play = true;
    }
  }, "600");

  // If the class of the child of the target card is equal to the card to match then...
  if (event.target.childNodes[1].className === currentCard && event.target.className === "card show") {
    // Set the class to matched, remove the top card on the pile incriment the correct matches and allow for another player turn
    event.target.className = "card matched";
    cardMatchPile.shift();
    document.querySelector(".scoreboard i").className = cardMatchPile[0];
    correctMatches++;
    play = true;
  }

  // If we have reach the 12 correct pairs alert the player that they have won the game and then restart the game
  if (correctMatches === MAX_PAIRS) {
    // currentScore is lowered by one to stay consistent with what is displayed on screen.
    currentScore--;
    // The final alert is timed out to allow the on screen scoreboard to update before the alert pauses the page.
    setTimeout(() => {
      alert("You won by matching all the cards in "+ currentScore +" tries!");
      restartGame();
    }, "200");
  }
});

// Listening for clicks on the restart button. On click restart the game
document.querySelector("div.restart").addEventListener("click", event => {
  restartGame();
});
