'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

let randomizeMovements = function() {

  let transactionCount = Math.trunc(Math.random() * (20 - 5) + 1) + 5;

  //rand 1-10 then multiply by 100-500
  let movements = new Array(transactionCount).fill(0).map(mov => (Math.trunc(Math.random() * 10) + 1) * (Math.trunc(Math.random() * (500 - 100) + 1) + 100) * ((Math.trunc(Math.random() * 2) + 1) % 2 === 0 ? 1 : -1));

  //rand days in last month
  let movementDates = new Array(transactionCount).fill('').map(date => new Date(new Date("2023-05-01").getTime() + Math.random() * (new Date().getTime() - new Date("2023-05-01").getTime()))).sort((a,b) => a - b);

  return {mov: movements, days: movementDates}
}

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-06-10T17:01:17.194Z',
    '2023-06-14T11:36:17.929Z',
    '2023-06-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

let data =  randomizeMovements();
const account3 = {
  owner: 'Krzysztof Mastalerz',

  movements: data.mov,
  pin: 3333,

  movementsDates: data.days,
  currency: 'PLN',
  locale: 'pl-PL',
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// State Variables
let timeout;
let currentAccount;
let totalBalance;
let sorted = false;

const calcDaysPassed = (date, control) => Math.floor(Math.abs(control - date) / (1000 * 60 * 60 * 24));
// Functions
const getDiplayDate = function(date, local) {

  let passedDays = calcDaysPassed(date, new Date());

  switch(passedDays)
  {
    case 0: 
      return 'Today'
    case 1: 
      return 'Yesterday'
    case 2: 
    case 3: 
    case 4: 
    case 5: 
    case 6: 
    case 7: 
      return `${passedDays} days ago`
  }
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat(local, options).format(date);
}

const getLocalDate = function(locale) {
  //const locale = navigator.language;

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return new Intl.DateTimeFormat(locale, options).format(new Date());
}

const getFormattedAmount = function(amount, acc) {
  const options = {
    style: 'currency',
    currency: acc.currency
  }

  return Intl.NumberFormat(acc.locale, options).format(amount)
} 

const setLogoffTimeout = function() {
  const tick = function() {
    const min = Math.trunc(time / 60).toString().padStart(2, 0);
    const sec = (time % 60).toString().padStart(2, 0);
    //display time
    labelTimer.textContent = `${min}:${sec}`
    //extract seconds
  
    if(time === 0){
      logout();
    }

    time--;
  }

  let time = 5 * 60;
  tick();
  timeout = setInterval(tick, 1000);
}

const displayMovements = function(account, sort = false) {
  containerMovements.innerHTML = ''; //clear container (children)
  
  //concencate movs with dates
  const movsWithDates = account.movements.slice().map((mov, i)=> {
    return {
      movement: mov, 
      date: account.movementsDates.at(i)
    }
  });

  const movs = sort ? movsWithDates.slice().sort((a,b) => a.movement - b.movement) : movsWithDates;

  //i add each on top, that why it appears from larger to lower.
  movs.forEach(function(mov,i) {
    const type = mov.movement > 0 ? 'deposit' : 'withdrawal';
    const displayDate = getDiplayDate(new Date(mov.date), account.locale);
    const displayAmount = getFormattedAmount(mov.movement, currentAccount);
    const html = `        
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${displayAmount}</div>
  </div>
  `;
  //debugger;
  containerMovements.insertAdjacentHTML('afterbegin', html); //position, and the DOM element, we can choose if its parent/children beforend would make it other way around. 


})}

const createUsernames = (accounts) => accounts.forEach((account) => {
  //create new property
  account.username = account.owner.toLowerCase().split(' ').map(name => name.at(0)).join('')
});

const displayBalance = function(account) {
  let balance = +account.movements.reduce((acc, cur) => acc + cur).toFixed(2);
  account.balance = balance;
  labelBalance.textContent = `${getFormattedAmount(balance, account)}`; 
}

const displaySummary = function(account) {

  let sumIn = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  let sumOut = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + Math.abs(mov), 0);
  let interest = +account.movements.filter(mov => mov > 0).map(mov => mov * account.interestRate / 100)
  .filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0);


  labelSumIn.textContent = getFormattedAmount(sumIn, account);
  
  labelSumOut.textContent = getFormattedAmount(sumOut, account);
  
  labelSumInterest.textContent = getFormattedAmount(interest, account);
  //bank pays interests only if interest from amount > 1
  //optimize chaining, we should compress to as little as we need, to keep map performance, try nto to use reverse, slice its best to avoid mutable functions. 
}

const refreshCurrentAccount = function() {
    //Displaye movements
    displayMovements(currentAccount);
    //Displaye balance
    displayBalance(currentAccount);
    //Displaye summary
    displaySummary(currentAccount);
}

const clearView = function() {
  labelSumIn.textContent = '';
  labelSumOut.textContent = '';
  labelSumInterest.textContent = '';
}

const login = function(btn) {
  if(currentAccount) logout();
  btn.preventDefault();

  let login = inputLoginUsername.value;
  let pin = inputLoginPin.value;

  currentAccount = accounts.find(acc => acc.username === login && acc.pin === +pin);//it points to the same object as the object from accounts. 

  if(currentAccount) {
     //Clear pin and login
    inputLoginUsername.value = inputLoginPin.value = '';
    //Loose focus
    inputLoginPin.blur();
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}`
    // Hardcoded date assignment
    labelDate.textContent = getLocalDate(currentAccount.locale);
    //Display data
    containerApp.style.opacity = 100;
    //refresh values;
    refreshCurrentAccount();

    setLogoffTimeout();
  } else {
    console.log('Incorrect Login or Pin');
  }

}

const logout = function(){
  //clear displayed values
  clearView();
  //reset welcome
  labelWelcome.textContent = 'Log in to get started';
  //hide panels
  containerApp.style.opacity = 0;
  //cleat currnet user
  currentAccount = null;
  //stop timeout 
  clearInterval(timeout);
}

const transfer = function(btn) {
  btn.preventDefault();

  const amount = +inputTransferAmount.value;
  const account = accounts.find(acc => acc.username === inputTransferTo.value);

  //clear fields
  inputTransferTo.value = inputTransferAmount.value = ''
  inputTransferAmount.blur();

  if(account && account.username !== currentAccount.username &&  amount > 0 && amount < currentAccount.balance){
    let transferDate = new Date().toISOString();
    account.movements.push(amount);
    account.movementsDates.push(transferDate);
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(transferDate);
    //refresh UI
    refreshCurrentAccount();
  } else if (amount < 0 || amount > currentAccount.balance){
    console.log('Incorrect amount');
  } else {
    console.log('Incorrect user');
  }

  clearInterval(timeout);
  setLogoffTimeout();
}

const deleteAccount = function(btn) {
  btn.preventDefault();

  let login = inputCloseUsername.value;
  let pin = +inputClosePin.value;


  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();

  if(currentAccount.pin === pin && currentAccount.username === login){
    let index = accounts.findIndex(acc => acc.username === currentAccount.username); //we can put more conditions than indexOf()
    accounts.splice(index, 1); //remember, this returns removed value from array
    logout();
  } else {
    console.log('Incorrect login or pin');
  }
}

const getLoan = function(btn){
  btn.preventDefault();
  let loan = Math.floor(inputLoanAmount.value);

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if(loan && loan > 0 && currentAccount.movements.some(mov =>
    mov >= loan / 10)) {
      currentAccount.movements.push(loan);
      currentAccount.movementsDates.push(new Date().toISOString())
      console.log(currentAccount);
      refreshCurrentAccount();

    } else if (loan || loan <= 0) {
      console.log('Incorrect loan amount');
    } else {
      console.log('You are not eligible for this loan');
    }

  clearInterval(timeout);
  setLogoffTimeout();
}

const sortMovements = function(btn) {
  btn.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  clearInterval(timeout);
  setLogoffTimeout();
}




// Startup calls
createUsernames(accounts); //create user names

/// FAKE ALWAYS LOGGED IN
// currentAccount = account3;
// refreshCurrentAccount(currentAccount);
// containerApp.style.opacity = 100;

// Listeners
btnLogin.addEventListener('click', login);
btnTransfer.addEventListener('click', transfer);
btnClose.addEventListener('click', deleteAccount);
btnLoan.addEventListener('click', getLoan)
btnSort.addEventListener('click', sortMovements)





///////////////////////////////////////////////// Lessons
/*
let x = '-------------'
console.log(`${x} + Coersion${x}`);
// Base 10 - 0 to 9. 1/10 = 0.1 | 10/3 = 3.33333...
// Binary base 2 - 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //scientific or financial will return false

///////////////////////////////////////////////// Conversion
console.log(Number('23'));
console.log(+'23'); // + is a type coersion.

///////////////////////////////////////////////// Parsing
// parse will try to get rid of string values, to parse numbers, but it has to start from a number.
// second paramater radix, value that specify base of the value (for binary = 2)
// we dont need Number object to call parsing function, as they are global. But its encouraged to do so. 
let x = '-------------'
console.log(`${x}parseInt${x}`);
console.log(Number.parseInt('30.5px', 10)); 
console.log(Number.parseInt('e23', 10));

console.log(`\n${x}parseFloat${x}`);
console.log(Number.parseFloat('2.5rem', 10)); 
console.log(parseFloat('2.5rem', 10)); 
console.log(Number.parseFloat('e23', 10));

console.log(`\n${x}isNan | isNan (global) | isFinite | isFinite (global)${x}`);
console.log(Number.isNaN(20),     isNaN(20),      Number.isFinite(20),      isFinite(20));
console.log(Number.isNaN('20'),   isNaN('20'),    Number.isFinite('20'),    isFinite('20'));
console.log(Number.isNaN(+'20X'), isNaN(+'20X'),  Number.isFinite(+'20X'),  isFinite(+'20X'));
console.log(Number.isNaN(23 / 0), isNaN(23 / 0),  Number.isFinite(23 / 0),  isFinite(23 / 0));
console.log(Number.isNaN('John'), isNaN('John'),  Number.isFinite('John'),  isFinite('John'));

console.log(`\n${x}isInteger${x}`);
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(20.3));
console.log(Number.isInteger(23 / 0));

///////////////////////////////////////////////// Math & Roundings
let x = '-------------'
console.log(`\n${x}Square${x}`);
console.log(Math.sqrt(25));
console.log(25 ** (1/2));
console.log(8 ** (1/3));

console.log(`\n${x}Max, Min, PI${x}`);
// max does coersion, but not parsing
console.log(Math.max(5,6,7,23,8,9));
console.log(Math.max(5,6,7,'23',8,9));
console.log(Math.max(5,6,7,'23p',8,9));

console.log(Math.min(5,6,7,23,8,9));
console.log(Math.min(5,6,7,'23',8,9));
console.log(Math.min(5,6,7,'23p',8,9));

console.log(Math.PI);

console.log(`Circle of 10px radious: ${
  Math.PI * Number.parseFloat('10px') ** 2
}px`);
///////////////////////////////////////////////// Random

console.log(`\n${x}Random${x}`);
console.log(Math.trunc(Math.random() * 6)) + 1;

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(1,6));
console.log(`Min 50, Max 100: ${randomInt(50,100)}`);

console.log(`\n${x}Rounding Int (trunc, round, ceil, floor)${x}`);
console.log(Math.trunc(23.6), Math.round(23.6), Math.ceil(23.6), Math.floor(23.6));
console.log(Math.trunc(23.3), Math.round(23.3), Math.ceil(23.3), Math.floor(23.6));

console.log(`\n${x}floor vs trunc${x}`);
console.log(Math.trunc(-23.3),  Math.floor(-23.3));
console.log(Math.trunc(-23.6),  Math.floor(-23.6));

console.log(`\n${x}Rounding decimals${x}`);
// toFixed return string
console.log((2.75).toFixed(0));
console.log((2.75).toFixed(1));
console.log((2.75).toFixed(3));
console.log(+(2.75).toFixed(3));


///////////////////////////////////////////////// Reminder (Modulo)

let x = '-------------'
// good to search positive numbers
console.log(`\n${x}Reminder (modulo)${x}`);
console.log(5 % 2); 
console.log(5 / 2); 
console.log(8 % 3); 
console.log(8 / 3); 

const isEven = number => number % 2 === 0;

console.log(`Is ${23} even: ${isEven(23)}`);
console.log(`Is ${22} even: ${isEven(22)}`);
console.log(`Is ${22.5} even: ${isEven(22.5)}`);
console.log(`Is ${-101} even: ${isEven(-101)}`);
console.log(`Is ${0} even: ${isEven(0)}`);

//console.log(document.querySelectorAll('.movements__row'));
//console.log([...document.querySelectorAll('.movements__row')]);

// const colorMovement = function(btn) {
//   btn.preventDefault();
//   [...document.querySelectorAll('.movements__row')].forEach(function(element, index) {
//     if(index % 2 === 0) element.style.backgroundColor ='orangered';
//     //if(index % 3 === 0) element.style.backgroundColor ='blue';
//   });
// }

//labelBalance.addEventListener('click', colorMovement)

///////////////////////////////////////////////// Number separator
//287,460,000,000
//_ can be only BETWEEN the numbers, and in a literal number, Number('200_000') <- this will NOT work. 
const diameter = 287_460_000_000;

const priceCents = 349_99;
console.log(priceCents);

const PI  = 3.1215

///////////////////////////////////////////////// BIG INT (ES2020)
// integers are storing in 64 bits, of that 53 are stored digits, rest are for decimal and sign
console.log(2 ** 53 - 1); //max int
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); //max int - Not accurate, and not safe. Will calculate probably wrongly
console.log(2 ** 53 + 10);//max int - Not accurate, and not safe. Will calculate probably wrongly
console.log(2 ** 53 + 9);//max int - Not accurate, and not safe. Will calculate probably wrongly
console.log(232983109238901283901238091238091238091238091238092138); //int above max
console.log(232983109238901283901238091238091238091238091238092138n); //bigint

//big int has n at the end. 
console.log(BigInt(2329831092389012839));
console.log(1000000000000000000000n * 10000000n );
const huge = 2137372212183923978137121312313212321n;
const num = 23;
//console.log(huge * num);//will not work
console.log(huge * BigInt(num));

console.log(20n > 15);
console.log(20n < 15);
console.log(20n === 20);
console.log(20n == 20);
console.log(typeof 20n, typeof 20);

//Math operators DO NOT work on bigint
//console.log(Math.sqrt(12319830921830921830921380913n));

console.log(10n /3n);
console.log(10 /3);
////////////////////////////////////////////////// DATES AND TIMES

// Create 
// creating date, we can try parse numerous dates formats, but its unsafe and can be unreliable
// if string is created by JS then its quite safe
// console.log(new Date());
// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('2020/08/02 18:05:41'));
// console.log(new Date('August 02, 2020. 18:05:41'));
// console.log(new Date('August 02, 2020'));
// console.log(new Date('2020 August 02. 18:05:41')); 
// console.log(new Date('2020 August 02: 18:05:41')); //issued
// console.log(new Date(2020, 07, 02, 18, 05, 41)); //motnh is zero based
// console.log(new Date(2020, 6, 33, 18, 5, 41)); //will move days by months
// console.log(new Date(2020, 7, 2));
//console.log(new Date(0)); //initial date
//console.log(new Date(3 * 24 * 60 * 60 * 1000)) //days to ms
//account1.movementsDates.forEach(date=>console.log(`${date} is equal to ${new Date(date)}`));

// Working 
const future = new Date(2037, 10, 19, 15, 23, 12, 230);

console.log(future);//full date
console.log(future.getFullYear());//get year | DONT use getYear()
console.log(future.getMonth());//get year
console.log(future.getDate());//get day in month
console.log(future.getDay());//get day of week
console.log(future.getHours()); //get hours in date
console.log(future.getMinutes());//get minutes in date
console.log(future.getSeconds());//get seconds in date
console.log(future.getMilliseconds());//get miliseconds in date
console.log(future.toISOString());//should also use it
console.log(future.getTime());//get ms from 01/01/1970 00:00:00

future.setFullYear(2022);
console.log(future);


// Operations

const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));
console.log(future.getTime());
console.log(+future);


const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14, 10, 8))

console.log(days1);

////////////////////////////////////////////////// LOCALIZATION


let options = { //check MDN docs for Intl
  //style: "currency",
  //currency: 'NOK'
}

let num = 32482934.23;

console.log(new Intl.NumberFormat('en-US', options).format(num));
console.log(new Intl.NumberFormat('pl-PL', options).format(num));
console.log(new Intl.NumberFormat('de-DE', options).format(num));

////////////////////////////////////////////////// TIMEOUTS


//setTimeout((ing1, ing2)=>console.log(`Here is your pizza with ${ing1} & ${ing2} 🍕`), 4000, 'chicken', 'truffle'); //its async, all values passet after 4000 would be parameters. 
//or
let ingredients = ['chicken', 'olives'];
const pizzaTimer = setTimeout((ing1, ing2)=>console.log(`Here is your pizza with ${ing1} & ${ing2} 🍕`), 4000, ...ingredients); 


console.log('Waiting...');

//we can cancel timeout 😊

if(ingredients.includes('truffle')) {
  clearTimeout(pizzaTimer)
  console.log(`Oh no, you hate truffles.`);
}

//set interval
// 
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/