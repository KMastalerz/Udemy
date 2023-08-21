'use strict';

///////////////////////////////////////////////// Lesson 1

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); 
console.log(arr.slice(1, 3)); //similar to string, so string; it not mutating but returning value;
console.log(arr.slice(-1));//last element instead of arr[arr.length-1]
console.log(arr.slice(1, -1)); //from second to second last.
console.log(arr.slice()); //same as console.log([...arr]);

//SPLICE - mutates array, extracts from array selected values returning them, and removing from original. 
//console.log(arr.splice(2), arr); //takes part of array and leave not removed data
console.log(arr.splice(-1), arr); //takes part of array and leave not removed data, second parameter, says how many elements, not index from where. 

//REVERSE - reverse mutates original array.
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse(), arr2); 

//Concat - does not mutate combines arrays
const letters = arr.concat(arr2);
console.log(letters);//similar to const letters = [...arr, ...arr2]

//Join - joins all elements into a string, with join string, deafulat is comma. Returns a string and does not mutate
console.log(letters.join('-'), letters);

*/

///////////////////////////////////////////////// Lesson 2

/*
const arr = [23,11,64];
console.log(arr[0], arr.at(0)); //same, but we can write add.at(-1) instead of add.slice(-1) you can chain method with at(). 

//at() also works on strings
console.log('chain'.at(1));
*/

///////////////////////////////////////////////// Lesson 3

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const movement of movements) {
  if(movement > 0) console.log(`You deposited ${movement}`);
  else console.log(`You withdrew ${Math.abs(movement)}`);
}

movements.forEach(function(movement) {
  movement > 0 ? console.log(`You deposited ${movement}`) : console.log(`You withdrew ${Math.abs(movement)}`);
});

console.log('--------------------FOR EACH-------------------');

for(const [i, movement] of movements.entries()) {
  if(movement > 0) console.log(`Movement ${ i + 1}: You deposited ${movement}`);
  else console.log(`Movement ${ i +1 }: You withdrew ${Math.abs(movement)}`);
}

movements.forEach(function(movement, i, arr) { //element, index, array (entire). You cannot break out with break, continue from foreach. 
  movement > 0 ? console.log(`Movement ${ i +1 }: You deposited ${movement}`) : console.log(`Movement ${ i +1 }: You withdrew ${Math.abs(movement)}`);
});
*/

///////////////////////////////////////////////// Lesson 4

//For each works also on maps and sets

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log('--------------------MAP-------------------');
currencies.forEach(function(value, key, map) { //work similar to foreach on array, value = element, key = index and map = array (entire). 
  console.log(`${key}: ${value},`, map);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'PLN']);

console.log('--------------------SETS-------------------');
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, key, map) { //map = set | key = value, as they wanted to make forEach same for both. 
  console.log(`${key}: ${value}`, map);
});
*/


///////////////////////////////////////////////// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


const checkDogs = function(dogsJulia, dogsKate){
  //1.
  let actualDogsJulia = dogsJulia.slice(1, -2);
  console.log(actualDogsJulia);
  //2.
  let allDogs = actualDogsJulia.concat(dogsKate);
  //3. 
  allDogs.forEach(function(age, i) {
    if(age >= 3){
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  })

}

4.//
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

///////////////////////////////////////////////// Lesson 5
//Map/Filter/Reduce

//Map loop over array (similar to for each) it creates new array based on function applied there. Devalues new from old. But, it still does not mutate the value. 
//Filter filters elements from original array similar to .where() from linq. 
//Reduce adding all number in array. Or combine string or does anything else to all of them. 

///////////////////////////////////////////////// Lesson 6 - MAP
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const eurMovements = movements.map(function(mov) { //also has index and array
  return mov * eurToUsd;
});
//same as above
const eurMovementsArr = movements.map(mov => mov * eurToUsd);

const movementsFormatted = movements.map((mov,i) => {
  // if(mov > 0) return `Movement ${i + 1}: You deposited ${mov}`;
  // else return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
});

console.log(movementsFormatted);
*/
///////////////////////////////////////////////// Lesson 7 - FILTER
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function(mov){
  return mov > 0;//the condition need to return true.
});

console.log(deposits);

const depositsArr = movements.filter(mov => mov > 0); //Linq style

console.log(depositsArr);

const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);
*/
///////////////////////////////////////////////// Lesson 8 - REDUCE
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function(acc, cur, i) { //this one is different (accumulator = value that will be returned (previous value), value = current value, index, array)
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 10); //we could add initial value of accumulator/previous value

const balanceArr = movements.reduce((acc, cur) => acc + cur); //we return new accumulator for next operation

console.log(balance, balanceArr);
*/
///////////////////////////////////////////////// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function(dogAges) {
  //1.
  const humanAges = dogAges.map(dogAge => dogAge <= 2 ? 2 *  dogAge : 16 + (dogAge * 4));
  console.log(humanAges);
  //2.
  const drinkingDogs = humanAges.filter(dogHumanAge => dogHumanAge >= 18);
  console.log(drinkingDogs);
  //3. 
  const avgBumDogAge = Math.round(drinkingDogs.reduce((acc, bumDogAge) => acc + bumDogAge, 0) / drinkingDogs.length);
  const avgBumDogAge2 = Math.round(drinkingDogs.reduce((acc, bumDogAge, i, arr) => acc + bumDogAge / arr.length, 0));
  console.log(avgBumDogAge, avgBumDogAge2);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

///////////////////////////////////////////////// Lesson 8 - Chain = PIPELINE
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const usdBalance = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov)=> acc + mov, 0);//0 might be redundand
console.log(usdBalance);
*/
///////////////////////////////////////////////// Coding Challenge #3
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


let calcAverageHumanAge = dogAges => 
      dogAges.reduce((acc, age, i , arr) => 
        acc + (age <= 2 ? age * 2 : 16 + (age * 4)) / arr.length);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

let calcAverageHumanAge2 = dogAges => 
      dogAges.map(dogAge => dogAge <= 2 ? 2 *  dogAge : 16 + (dogAge * 4))
          .filter(dogHumanAge => dogHumanAge >= 18)
          .reduce((acc, bumDogAge, i, arr) => acc + bumDogAge / arr.length, 0);

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));
*/

///////////////////////////////////////////////// Lesson 9 - Find

//console.log(account1.movements.find((mov => mov<0))); //it will return only first element of the array, returns only element, not array. 
/* 
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const account = accounts.find(acc=> acc.owner === 'Jessica Davis');

console.log(account);

*/

///////////////////////////////////////////////// Lesson 10 - Calc max value
/*
const maximumValue = account1.movements.reduce((acc, mov) => Math.abs(acc) > Math.abs(mov) ? acc : mov, account1.movements.at(0));
console.log(maximumValue);
*/

///////////////////////////////////////////////// Lesson 11 - some and every
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const anyDeposits = movements.some(mov => mov > 0); //instead of include for specific value, we can do conditions more then equality. Similar to Any
console.log(anyDeposits);

const allDeposits = movements.every(mov => mov > 0);//check if all are returning true
console.log(allDeposits);

//we could pass functions as call back 

const anyDep = mov => mov > 0;
console.log(movements.some(anyDep));
console.log(movements.every(anyDep));
console.log(movements.filter(anyDep));
*/
///////////////////////////////////////////////// Lesson 12 - flat and flat map
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //just returns flattened array, goes only one level deep

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat()); //just returns flattened array
console.log(arrDeep.flat(2)); //we godeeper with parameter


//flat map joins map and flat
const accountMovements = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);

//the same as flat map
const accountMovementa = accounts.flatMap(acc=> acc.movements).reduce((acc, mov) => acc + mov, 0); //Flat map goes only one level deep

console.log(accountMovements);
console.log(accountMovementa);
*/

///////////////////////////////////////////////// Lesson 13 - Sorting
/*
const owners = ['Chris', 'Laura', 'Michal', 'Dominik', 'Adam'];

//console.log(owners.sort()); //sort() mutates original array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//console.log(movements.sort()); //sort formats to strings, thats why its not good. To do so, we have to use callback values. 

//if we have a= 450 and b =-400 to switch places as b is lower we have to return value greater then 1, if we do not want to swap them, return number smaller then 0; 
//ASC
console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => {
  if(a < b) return -1;
  if(a > b)  return 1;
}));
//DESC
console.log(movements.sort((a, b) => b - a));
console.log(movements.sort((a, b) => {
  if(a > b) return -1;
  if(a < b)  return 1;
}));

console.log(movements); //remember, sort mutates the value!!
*/
///////////////////////////////////////////////// Lesson 14 - Creating and filling array
/*
console.log([1,2,3,4,5,6,7]);
console.log(new Array(1,2,3,4,5,6,7));
console.log(new Array(7)); //if one argument, then new arg with emplty value
console.log(new Array(7).fill(1)); //we can fill it with 1 it 
console.log(new Array(7).fill(1, 3)); //we can specify where the fill shiould start
console.log(new Array(7).fill(1, 3 , 5)); //we can specify where the fill shiould start, and at which place(not index) it should stop


const arr=[1,2,3,4,5,6,7]
console.log(arr);
arr.fill(23,4,6);
console.log(arr);

//array.from
const y = Array.from({length: 7}, () => 1);
console.log(y);
const y2 = Array.from({length: 7}, (_, i) => i + 1); //callback like a map method/ we can pass underscore, to note we are not using this variable, but something needs to be there
console.log(y2);

const diceRolls = Array.from({length: 100}, (_, i) => `Roll #${i+1} : ${Math.trunc(Math.random() * 6) + 1}`)
console.log(diceRolls);
*/

/*
labelBalance.addEventListener('click', function() {
  //const movementUI = Array.from(document.querySelectorAll('.movements__value')).map(el => Number(el.textContent.replace('€', '').replace(' ', '')));

  //or this 
  
  const movementUI = Array.from(document.querySelectorAll('.movements__value'),
                                el => Number(el.textContent.replace('€', '').replace(' ', ''))); //we could also use it on from callback value
  console.log(movementUI);
})
*/
/////////////////////////////////////// Practices
/*
//how much was in all accounts in bank
const bankDepositsSum = accounts.map(acc=>acc.movements).flat().filter(mov=> mov > 0).reduce((acc, mov) => acc + mov , 0);
//const bankDepositsSum = accounts.map(acc=>acc.movements).flat().reduce((acc, mov) => mov > 0 ? acc + mov : acc + 0, 0);
console.log(bankDepositsSum);

const numDeposits1000 = accounts.flatMap(acc=>acc.movements).filter(mov=> mov >= 1000).length;
//const numDeposits1000 = accounts.flatMap(acc=>acc.movements).filter(mov=> mov >= 1000).reduce((acc) => acc + 1, 0);
//const numDeposits1000 = accounts.flatMap(acc=>acc.movements).reduce((acc, mov) => mov >= 1000 ? ++acc : acc, 0); //++ will not work, as it return previous value. there is solution of prefix ++ that would be ++acc not acc++
console.log(numDeposits1000);

// const sums = accounts.flatMap(acc=>acc.movements).reduce((sums, cur) => {
//   cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
//   return sums; //needed due to function in {}
// }, {deposits: 0, withdrawals: 0});
// console.log(sums);

const {deposits, withdrawals} = accounts.flatMap(acc=>acc.movements).reduce((sums, cur) => {
  //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
  return sums; //needed due to function in {}
}, {deposits: 0, withdrawals: 0});

console.log(deposits, withdrawals);

// this is a nice title : This Is a Nice Title

const convertTitleCase = function(title){
  const capitalize = str => str.at(0).toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
  //let niceTitle = title.toLowerCase().split(' ').reduce((acc, text)=> acc += exceptions.some(e => e === text.toLowerCase()) ? `${text} ` : `${text.at(0).toUpperCase() + text.slice(1)} `, '').trim();
  let niceTitle = title.toLowerCase().split(' ').map(text=> exceptions.some(e => e === text.toLowerCase()) ? text : capitalize(text)).join(' ');
  return capitalize(niceTitle);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/////////////////////////////////////// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀

const recommendedFood = weight => Math.trunc(weight ** 0.75 * 28);
const isExact = dog => dog.curFood === dog.recFood;
const inRange = dog => dog.curFood <= dog.recFood * 1.1 && dog.curFood >= dog.recFood * 0.9;
const isAbove = dog => dog.curFood >= dog.recFood * 1.1
const isBelow = dog => dog.curFood <= dog.recFood * 0.9;

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

//1.
dogs.forEach(dog => dog.recFood = recommendedFood(dog.weight));
console.log(dogs);
//2.
let sarahDog = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(`Sarah's dog is eating ${isAbove ? 'too much' : isBelow ? 'too little' : 'correctly'}`);
//3. 
let ownersEatTooMuch = dogs.filter(dog => isAbove).flatMap(dog=>dog.owners);
let ownersEatTooLittle = dogs.filter(dog => isBelow).map(dog=>dog.owners).flat();
console.log(ownersEatTooMuch, ownersEatTooLittle);
//4. 
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
//5.
console.log(dogs.some(isExact));
//6.
console.log(dogs.some(inRange));
//7.
let okDogs = dogs.filter(inRange);
console.log(okDogs);
//8.
let sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogs);
console.log(sortedDogs);
*/

///////////////////////////////////////////////// BANKIST APP

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

let currentAccount;
let totalBalance;
let sorted = false;
const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = ''; //clear container (children)

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  //i add each on top, that why it appears from larger to lower.
  movs.forEach(function(mov,i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `        
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} €</div>
  </div>
  `;
  //debugger;
  containerMovements.insertAdjacentHTML('afterbegin', html); //position, and the DOM element, we can choose if its parent/children beforend would make it other way around. 
})}

//const createUsername = (fullname) => fullname.toLowerCase().split(' ').map(name => name.at(0)).join('');

const createUsernames = (accounts) => accounts.forEach((account) => {
  //create new property
  account.username = account.owner.toLowerCase().split(' ').map(name => name.at(0)).join('')
});

const displayBalance = function(account) {
  let balance = Number(account.movements.reduce((acc, cur) => acc + cur));
  account.balance = balance;
  labelBalance.textContent = `${balance} €`; 
}

const displaySummary = function(account) {
  labelSumIn.textContent = `${account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)} €`;
  labelSumOut.textContent = `${account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + Math.abs(mov), 0)} €`;
  labelSumInterest.textContent = `${account.movements.filter(mov => mov > 0).map(mov => mov * account.interestRate / 100)
  .filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0)} €`
  //bank pays interests only if interest from amount > 1
  //optimize chaining, we should compress to as little as we need, to keep map performance, try nto to use reverse, slice its best to avoid mutable functions. 
}

const refreshCurrentAccount = function() {
    //Displaye movements
    displayMovements(currentAccount.movements);
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
  btn.preventDefault();

  let login = inputLoginUsername.value;
  let pin = inputLoginPin.value;

  currentAccount = accounts.find(acc => acc.username === login && acc.pin === Number(pin));//it points to the same object as the object from accounts. 

  if(currentAccount) {
     //Clear pin and login
    inputLoginUsername.value = inputLoginPin.value = '';
    //Loose focus
    inputLoginPin.blur();
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}`
    //Display data
    containerApp.style.opacity = 100;
    //refresh values;
    refreshCurrentAccount();
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
}

const transfer = function(btn) {
  btn.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const account = accounts.find(acc => acc.username === inputTransferTo.value);

  //clear fields
  inputTransferTo.value = inputTransferAmount.value = ''
  inputTransferAmount.blur();

  if(account && account.username !== currentAccount.username &&  amount > 0 && amount < currentAccount.balance){
    account.movements.push(amount);
    currentAccount.movements.push(-amount);
    //refresh UI
    refreshCurrentAccount();
  } else if (amount < 0 || amount > currentAccount.balance){
    console.log('Incorrect amount');
  } else {
    console.log('Incorrect user');
  }
}

const deleteAccount = function(btn) {
  btn.preventDefault();

  let login = inputCloseUsername.value;
  let pin = Number(inputClosePin.value);


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
  let loan = Number(inputLoanAmount.value);

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if(loan && loan > 0 && currentAccount.movements.some(mov =>
    mov >= loan / 10)) {
      currentAccount.movements.push(loan);
      refreshCurrentAccount();
    } else if (loan || loan <= 0) {
      console.log('Incorrect loan amount');
    } else {
      console.log('You are not eligible for this loan');
    }

}

const sortMovements = function(btn) {
  btn.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
}

createUsernames(accounts); //create user names

btnLogin.addEventListener('click', login);
btnTransfer.addEventListener('click', transfer);
btnClose.addEventListener('click', deleteAccount);
btnLoan.addEventListener('click', getLoan)
btnSort.addEventListener('click', sortMovements)



