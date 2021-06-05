// capture buttons / scores
const restartBtn = document.querySelector('.restart');
const drawBtn = document.querySelector('.draw');
const holdBtn = document.querySelector('.hold');
const p1HandHTML = document.querySelector('.p1Hand');
const cpuHandHTML = document.querySelector('.cpuHand');
const p1HTML = document.querySelector('.p1-score');
const cpuHTML = document.querySelector('.cpu-score');
const winnerHTML = document.getElementById('header');

// setting scores, hands, turns, and gameover
let p1Score = 0;
let cpuScore = 0;
let playerHand = [];
let cpuHand = [];
let p1Turn = true;
let cpuTurn = false;
let gameOver = false;

// card values
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
// card suits
const suits = ['diamond', 'club', 'heart', 'spade'];

// creating card objects and putting into deck
function getDeck() {
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    // assigning each value their suite
    for (let index = 0; index < values.length; index++) {
      const card = { Value: values[index], Suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}

// shuffles deck each time card is drawn
function shuffleDeck() {
  let card = Math.floor(Math.random() * deck.length);
  return card;
}

// deal 2 cards per player
function generateHand() {
  for (let index = 0; index < 2; index++) {
    let card = shuffleDeck();
    playerHand.push(deck[card]);
    deck.splice(card, 1);

    card = shuffleDeck();
    cpuHand.push(deck[card]);
    deck.splice(card, 1);
  }
  handTotals();
  checkBust();
  checkWinner();
}

function drawCard() {
  if (p1Turn === true && p1Score < 22) {
    let card = shuffleDeck();
    playerHand.push(deck[card]);
    deck.splice(card, 1);
  }

  if (cpuTurn === true && cpuScore < 22) {
    let card = shuffleDeck();
    cpuHand.push(deck[card]);
    deck.splice(card, 1);
  }
}

// calculating total score + displaying the hand & score in the HTML
function handTotals() {
  p1HandHTML.innerHTML = `<p></p>`;
  cpuHandHTML.innerHTML = `<p></p>`;

  // resetting scores so we can calculate hand with newly drawn card.
  p1Score = 0;
  cpuScore = 0;

  // going through each card and adding their value to the total score of the player
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i].Value === 'K') {
      let card = 10;
      p1Score += card;
    } else if (playerHand[i].Value === 'Q') {
      let card = 10;
      p1Score += card;
    } else if (playerHand[i].Value === 'J') {
      let card = 10;
      p1Score += card;
    } else if (playerHand[i].Value === 'A') {
      let card = 11;
      p1Score += card;
    } else {
      let card = parseInt(playerHand[i].Value);
      p1Score += card;
    }

    p1HandHTML.innerHTML += `<p> ${playerHand[i].Value}</p>`;
  }

  // going through each card and adding their value to the total score of the computer
  for (let i = 0; i < cpuHand.length; i++) {
    if (cpuHand[i].Value === 'K') {
      let card = 10;
      cpuScore += card;
    } else if (cpuHand[i].Value === 'Q') {
      let card = 10;
      cpuScore += card;
    } else if (cpuHand[i].Value === 'J') {
      let card = 10;
      cpuScore += card;
    } else if (cpuHand[i].Value === 'A') {
      let card = 11;
      cpuScore += card;
    } else {
      let card = parseInt(cpuHand[i].Value);
      cpuScore += card;
    }
    cpuHandHTML.innerHTML += `<p> ${cpuHand[i].Value}</p>`;
  }

  //   displaying our total score in the gui
  p1HTML.innerHTML = `<h4> Total: </h4> ${p1Score}`;
  cpuHTML.innerHTML = `<h4> Total: </h4> ${cpuScore}`;
}

function checkBust() {
  // logic for the ace card (determining if it's value is 1 or 11)
  playerHand.forEach((card) => {
    if (p1Score > 21) {
      if (card.Value === 'A') {
        p1Score -= 10;

        p1HTML.innerHTML = `<h4> Total: </h4> ${p1Score}`;
        checkWinner();
      }
    }
  });

  // logic for the ace card (determining if it's value is 1 or 11)
  cpuHand.forEach((card) => {
    if (cpuScore > 21) {
      if (card.Value === 'A') {
        cpuScore -= 10;
        cpuHTML.innerHTML = `<h4> Total: </h4> ${cpuScore}`;
        checkWinner();
      }
    }
  });

  // determining the winner based on a bust
  if (p1Score > 21 || cpuScore > 21) {
    gameOver = true;

    if (p1Score > 21 && cpuScore <= 21) {
      winner = 'Computer Wins!';
      displayWinner(winner);
    } else if (cpuScore > 21 && p1Score <= 21) {
      winner = 'Player 1 Wins!';
      displayWinner(winner);
    }
  }
}

function checkWinner() {
  // winning by blackjack
  if (p1Score === 21) {
    gameOver = true;
    winner = 'Player 1 Wins! - BlackJack!';
    displayWinner(winner);
  }
  if (cpuScore === 21) {
    gameOver = true;
    winner = 'Computer Wins! - BlackJack!';
    displayWinner(winner);
  }

  // winning by tie
  if (p1Score === cpuScore && cpuTurn === true) {
    gameOver = true;
    winner = 'TIE!';
    displayWinner(winner);
  }

  //  winning by higher score between 17-21
  if (p1Score < 21 && p1Score > cpuScore && cpuTurn === true) {
    gameOver = true;
    winner = 'player 1 Wins!';
    displayWinner(winner);
  } else if (cpuScore < 21 && cpuScore > p1Score && cpuTurn === true) {
    gameOver = true;
    winner = 'Computer Wins!';
    displayWinner(winner);
  }
}

function displayWinner(winner) {
  if (gameOver) {
    winnerHTML.innerHTML = `${winner}`;
  }
}

// draw card event listener
drawBtn.addEventListener('click', () => {
  if (!gameOver) {
    drawCard();
    handTotals();
    checkBust();
    checkWinner();
  }
});

// hold button event listener
holdBtn.addEventListener('click', () => {
  if (!gameOver) {
    cpuTurn = true;
    p1Turn = false;

    while (cpuScore < 17) {
      drawCard();
      handTotals();
      checkBust();
    }
    checkWinner();
  }
});

// restart button event listener
restartBtn.addEventListener('click', () => {
  p1Score = 0;
  cpuScore = 0;
  playerHand = [];
  cpuHand = [];
  p1Turn = true;
  cpuTurn = false;
  gameOver = false;
  winner = 'BLACKJACK!';
  winnerHTML.innerHTML = `${winner}`;
  deck = getDeck();
  generateHand();
});

let deck = getDeck();
generateHand();
checkWinner();

// Things to do still:

// hide total score and computer hand (except card 1) until cpu's turn
