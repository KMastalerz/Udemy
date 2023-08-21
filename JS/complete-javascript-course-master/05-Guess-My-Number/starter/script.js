'use strict';

//. for class and # for id
//dom manipulation (document object moodel) conenction between html and js/ dom is a structure of html -> children/parents etc.

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value; //get value

document.querySelector('.guess').value = 23;

*/

//if there are spaces, there are two classes...
//here we are waiting for click
//remember: function is a value, that why we can pass it;
//value for input, select, textarea

///             1st way

// document.querySelector('.check').addEventListener('click', function () {
//   console.log(document.querySelector('.guess').value);
// });

///             2nd way

// above above is 'state' outside of the dom.
let secretNumber = Math.trunc(Math.random() * 20) + 1; //random number between 1-20
let score = 20;
let highScore = 0;

const check = function () {
  debugger;
  const quess = Number(document.querySelector('.guess').value);
  if (!quess) {
    displayMessage('❗ No number!');
  } else if (quess === secretNumber) {
    if (score > highScore) {
        highScore = score;

        document.querySelector('.highscore').textContent = highScore;
        displayMessage('🏆 You just set a new high score.');
    } else {
        displayMessage('🎉 Congratulations, thats correct!');
    }

    //reveal number :)
    document.querySelector('.number').textContent = quess;

    //change style -- element name doesnt use . or #
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.check').disabled = true;
  } else if (quess > secretNumber) {
        displayMessage('🔼 Too high, try again...');
        score--;
  } else if (quess < secretNumber) {
        displayMessage('🔽 Too low, try again...');
        score--;
  }

  if (score === 0) {
    document.querySelector('.check').disabled = true;
    displayMessage('📛 You lost, want to try again?');
  }

  document.querySelector('.score').textContent = score;
};

const reset = function () {
  score = 20;
  //restart values
  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  
  //restart style
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.check').disabled = false;

  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

displayMessage(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', check);

document.querySelector('.again').addEventListener('click', reset);
