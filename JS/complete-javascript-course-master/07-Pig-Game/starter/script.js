'use strict';

//select player element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//select score element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //we can select by ID also, which is presumably faster for more nodes.
//select current score element
const currScore0El = document.querySelector('#current--0');
const currScore1El = document.getElementById('current--1');
//dice element
const diceEl = document.querySelector('.dice');
//buttons
const resetBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores;
let activePlayer;
let currentScore;
let playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner'); //it will nto remove if it snot set
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active'); //it will not again if its already there
  player1El.classList.remove('player--active');

  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //add or remove it depends on existing
  player1El.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (!playing) return;
  //1. generate random number between 1 and 6
  let rolled = Math.trunc(Math.random() * 6) + 1;
  console.log(`Rolled ${rolled}`);

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${rolled}.png`;

  //3. Validate throw.
  if (rolled !== 1) {
    //4. Set current score
    currentScore += rolled;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //5. switch player
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  if (!playing) return;
  //1. Add active player score
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check if won
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    //finish game it true
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //3. Switch player
    switchPlayer();
  }
});

resetBtn.addEventListener('click', init);

init();
