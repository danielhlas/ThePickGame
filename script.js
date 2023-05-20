'use strict';

//Selected elements
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const cubeSelected = document.querySelector('.dice');

const CurrentScore0Selected = document.querySelector('#current--0');
const CurrentScore1Selected = document.querySelector('#current--1');
const Score0Selected = document.querySelector('#score--0');
const Score1Selected = document.querySelector('#score--1');

const buttonNewGame = document.querySelector('.btn--new');
const buttonRollDice = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// Switch player
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${actualPlayer}`).textContent = 0;
  actualPlayer = actualPlayer === 0 ? 1 : 0;

  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
}

function newGame() {
  actualPlayer = 0;
  currentScore = 0;
  CurrentScore0Selected.textContent = 0;
  CurrentScore1Selected.textContent = 0;
  Score0Selected.textContent = 0;
  Score1Selected.textContent = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  cubeSelected.classList.add('hidden');
  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');
  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');
  GameIsOn = 1;
}

//Begin preparation
let actualPlayer, currentScore, totalScore0, totalScore1, GameIsOn;
newGame();

//Rolling function
buttonRollDice.addEventListener('click', function () {
  if (GameIsOn) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    cubeSelected.classList.remove('hidden');
    cubeSelected.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${actualPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (GameIsOn) {
    if (actualPlayer === 0) {
      totalScore0 += currentScore;
      Score0Selected.textContent = totalScore0;

      if (totalScore0 >= 100) {
        //TODO tento kód se opakuje
        player0Section.classList.toggle('player--winner');
        player0Section.classList.toggle('player--active');
        GameIsOn = 0;
        cubeSelected.classList.add('hidden');
      } else {
        switchPlayer();
      }
    } else {
      totalScore1 += currentScore;
      Score1Selected.textContent = totalScore1;

      if (totalScore0 >= 100) {
        player1Section.classList.toggle('player--winner');
        player1Section.classList.toggle('player--active');
        GameIsOn = 0;
        cubeSelected.classList.add('hidden');
      } else {
        switchPlayer();
      }
    }
  }
});

buttonNewGame.addEventListener('click', function () {
  newGame();
});
