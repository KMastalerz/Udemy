'use strict';

//default parameters
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassanger = 1,
  price = 199 * numPassanger
) {
  //new way in params
  //old way
  //   numPassanger = numPassanger || 1;
  //   price = price || 199;
  const booking = {
    flightNum, //we dont need flightNum: this.flightNum,
    numPassanger,
    price,
  };

  console.log(booking);

  bookings.push(booking);
};

createBooking('LH123', 2, 280);
createBooking('LH123', undefined, 5); //used undefined to skip parameter


const flight = 'LH234';

const chris = {
  name: 'Chris',
  passport: 234567893,
};

const checkIn = function (flightNum, passanger) {
  flightNum = 'LH999';
  passanger.name = 'Mr. ' + passanger.name;

  if (passanger.passport === 234567893) {
    console.log('Check In');
    //alert('Check In');
  } else {
    console.log('Wrong Passport');
    //alert('Wrong Passport');
  }
};

// checkIn(flight, chris);
// console.log(flight); //this is primitive, a completely new value (copy)
// console.log(chris); //it changed the object, function got a heap address value

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(chris);
checkIn(flight, chris);
console.log(chris);

//passing by value and passing by reference, JS has only pass by value, but we pass value of reference address not reference.

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Modified String: ${fn(str)}`);
  console.log(`Transformed By: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function (name = '') {
  console.log(name + '🖐');
};

//document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey'); //it becomes the child function, that logs console
const greeterArr = greetArr('Hello');
//console.log(greeterHey);
greeterHey('Jonas');
greeterArr('Chris');

greet('Hey')('Laura');

const lufthansa = {
  name: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flighNum, name) {
    console.log(
      `${name} booked a seat on ${this.name} flight ${this.iataCode}${flighNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flighNum}`, name });
  },
};

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

lufthansa.book(239, 'Chris Mastalerz');

lufthansa.book(635, 'Laura Kaptur');

const book = lufthansa.book; //this makes 'this' undefined

//doeas not work
//book(23, 'Sarah Williams'); //we have to tell whats 'this' is in the context

//we can use call to pass whats the this context/
book.call(eurowings, 23, 'Sarah Williamns');

book.call(lufthansa, 239, 'Mary Cooper');

const swiss = {
  name: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 112, 'Michael Scott');

//apply is simmilar to call, but gets array
const flightData = [583, 'George Cooper'];
book.call(swiss, ...flightData); //is same as book.apply(swiss, flightData), call should be use in modern solutions.

//bind method
const bookEW = book.bind(eurowings); //we permanently pass this context, creating separate function, for each object.
bookEW(146, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); //we can set more constant numbers for function.

bookEW23('Alice Cooper');
bookEW23('Alice Stone');

console.log(eurowings);
console.log(lufthansa);
console.log(swiss);

//with even listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //we have to change this context, as this will change to eventListener event as context

//partial applicatio, (pre set params)

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23); // null as we dont need this. This allows as to .
console.log(addVat(200));

const addTaxArr = rate => value => value + value * rate;
// thos are the same!
const addTaxF = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVatArr = addTaxArr(0.23);
console.log(addVatArr(200));

///////////////////////////////////////
// Coding Challenge #1

Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀


const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    //console.log(`${this.question}\n${this.options.join('\n')}`);
    let test = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    console.log(`Answer was: ${test}`);


    // if (test <= 3 && test >= 0) {
    //   this.answers[test]++;
    // } else {
    //   console.log(`Pass correct value between 0 and 3`);
    // }


    //short cicuit when true, if you ant last to be executed
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[test]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log(`"Poll results are ${this.answers.join(', ')}". `);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

(function () {
  console.log('This will never run again');
})(); //()() will call immidiately invoke function expression.

(() => console.log('This will never run again'))();

//currently for protection of data we do block.
{
  const isPrivate = 23;
}

console.log(isPrivate);


///////////////////////////////////////
// Closures

//closure happens automatically
const secureBooking = function () {
  let passengerCount = 0; //closure remmebrs that value, despite its beeing gone. Child function will always have access to variable environment, even if its gone from call stack

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  //when we create new closure, then old one is gone.
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); //it no longer there after execution, but it assigned f, so f has access to g
f();
console.dir(f);

h();
f();
console.dir(f);


//another example of closure
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boardin all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000); //call back function

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //closure has more priority then scope chain
boardPassengers(180, 3);
*/
///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  //its executed right away

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
    //this still has access to header, as listener was set and it remebers the scope.
  });
})();

console.dir(document.querySelector('body'));
*/
