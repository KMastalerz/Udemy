'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnOpen = document.querySelectorAll('.show-modal'); //queryselectorAll for more then 1 selection.

const open = function () {
  console.log('button clicked');
  //manipulate classes
  modal.classList.remove('hidden'); //for remove we do not use . its only for selector
  overlay.classList.remove('hidden');
};

const close = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnClose.addEventListener('click', close);

for (let btn of btnOpen) {
  //for array use of use in for strings
  btn.addEventListener('click', open);
}

overlay.addEventListener('click', close);

//keybpoard button event (global) listener
document.addEventListener('keydown', function (event) {
  //access object with event information
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    close();
  }
});
