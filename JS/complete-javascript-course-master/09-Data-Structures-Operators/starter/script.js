'use strict';
// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //immidiate distructuring, we also can use defaults
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = '20:00',
  }) {
    console.log(
      `'Order received: ${this.mainMenu[mainIndex]} and ${this.starterMenu[starterIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredtient, ...otherIngredients) {
    console.log(`Main Ingredient: ${mainIngredtient}`);
    console.log(`Other Ingredients: ${otherIngredients}`);
  },
};

/* 
///////////////////////////////////////
//      DESTRUCTURING ARRAYS
.
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//Destructuring from structure the array
//doesnt has to have same element cound
const [x, y, z] = arr;
console.log(x, y, z);

//we also can skip elements
let [first, , second] = restaurant.categories;
console.log(first, second);

//we can reorder
// const temp = first;
// first = second;
// second = temp;

//we can reassign without 3rd var
[first, second] = [second, first];
console.log(first, second);

//in same way below
// let order = restaurant.order(2, 0);
// console.log(order);

//can be this, as return is actually array.
let [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;
//console.log(i, j);
//we can get even inner arrays, with mimicing the structure.
const [i, , [j, k]] = nested;
console.log(i, j, k);

//we can set default on destructuring.
const [p, q, r = 1] = [2, 0];
console.log(p, q, r);


///////////////////////////////////////
//      DESTRUCTURING OBJECTS

//we have to name exact properties
//but we can rename them, selectively, we can also assign defaults

const {
  name: restaurantName,
  openingHours: hours,
  categories,
  prices = 10,
} = restaurant;
console.log(restaurantName, hours, categories, prices);

//mutting variables

let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);

console.log(a, b);

//nested object

const {
  fri: { open: o, close },
} = hours;

console.log(o, close);


restaurant.orderDelivery({
  //time: '22:30',
  address: 'Rakoczego 23',
  mainIndex: 2,
  starterIndex: 3,
});

///////////////////////////////////////
//      SPREAD OPERATOR

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//with spread operator
const newArr = [1, 2, ...arr]; //... is spread opertor, we extend array, typing just arr will add array to array into [1,2,[7,8,9]] spread give [1,2,7,8,9]
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci']; //we build new array, nto build new one.
console.log(newMenu);

// copying array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

//this works on iterables: arrays, strings, maps, sets. Not objects.

const str = 'Jonas';
const letters = [...str, '', 'S.'];
console.log(letters);

//use it when element accepts elements spearated by the comma.

const ingredients = [
  prompt("Lets's make pasta! Ingertient 1?"),
  prompt('Ingertient 2?'),
  prompt('Ingertient 3?'),
];

restaurant.orderPasta(...ingredients); //instead of restaurant.orderPasta(ingredients[0], ingredients[1] , ingredients[2])


//sprad also works on objects.
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' }; //its still shallow copy!!!
console.log(newRestaurant);

newRestaurant.name = 'New Name'; // This change won't affect the original 'restaurant' object.
newRestaurant.mainMenu.push('Burger'); // This change WILL affect the original 'restaurant' object, because arrays are copied by reference.

console.log(newRestaurant);
console.log(restaurant);

///////////////////////////////////////
//      REST PATTERN

//Destructuring

//same syntax as spread,it condenses values into array, so opposite to spread

//SPREAD ON THE RIGHT SIDE OF =
const arr = [1, 2, ...[3, 4]];
console.log(arr);

//REST ON THE LEFT SIDE OF =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; //rest has to be final element so we can skip other elements, and only one rest in destructurization allowed.
console.log(pizza, risotto, otherfood);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

//functions

//how do we allow arbitrary amounts like add(2, 3) or add(2, 3, 4, 5) etc.
//this usage are rest arguments.
const add = function (...numbers) {
  let sum = 0;

  for (let nr of numbers) {
    sum += nr;
  }
  console.log(sum);
};

add(2, 3, 4);
add(1, 3, 4, 6);
add(1, 5, 3, 7, 8, 9, 34, 5);

const x = [23, 7, 2];
add(...x);

restaurant.orderPizza('Chicken', 'Mozzarella', 'Cheese', 'Onions', 'Olives');

restaurant.orderPizza('Mushrooms');

///////////////////////////////////////
//      SHORT CIRCUITING && and ||

//Use ANY datatype, return ANY datatype, short-cicuiting or short-cucuit evaluation;
console.log('--------------OR-----------------');
console.log(3 || 'Chris'); //it will return first value thats not undefined, null, 0, '' or NaN, but if there is no truth it will return
console.log('' || 'Chris');
console.log(0 || true);
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0);
console.log(0 || undefined); //this means it will return last value if non before met criteria of truthly.
console.log(undefined || 0 || '' || 'Hello' || null);

//this is non existing object
const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//but both will not work for number 0! due to 0 beeing falsy value.

console.log('--------------AND-----------------');
console.log(0 && 'Chris'); //opposite to || , && return falsy value
console.log(1 && 'Chris');
console.log(1 && null && 'Chris');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
//this could be short cicuit
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

///////////////////////////////////////
//      NULLISH COALESCING OPERATOR ??

//this is non existing object
restaurant.numGuests = 0;
const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

const guests2 = restaurant.numGuests ?? 10; // ?? works with concpet of nullish values insted of falsly, nullish is undefined or null (not 0 or '')
console.log(guests2);

//      LOGICAL ASSIGNMENT OPERATORS ES 2021

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

rest1.numGuests = rest1.numGuests || 10; // OR assignment operator | IT Will not wotk if 0 or ''
rest2.numGuests = rest2.numGuests || 10;
console.log(rest1.numGuests);
console.log(rest2.numGuests);
//could be done more consise like:
rest1.numGuests ||= 10;
console.log(rest1.numGuests);

rest1.numGuests ??= 10; // Nullish assignment operator | Will wotk if 0 or '' (comment out before assignemts, as they are assigning 10)
console.log(rest1.numGuests);

rest1.owner = rest1.owner && '<ANONYMOUS>';
console.log(rest1.owner);
rest1.owner &&= '<ANONYMOUS>';
console.log(rest1.owner);
rest2.owner &&= '<ANONYMOUS>';
console.log(rest2.owner);

*/

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

let [players1, players2] = game.players;
console.log(players1, players2);

let [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

let allPlayers = [...players1, ...players2];
console.log(allPlayers);

let players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

let { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

let printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};

printGoals(...game.scored);

console.log(
  `${team1 < team2 ? game.team1 : game.team2} is more likely to win!`
);
//another solution
//if falsy first then last trufly
//&& short cicuits for first value false, or last. opposite to or
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');



///////////////////////////////////////
//      FOR OF LOOP

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (let item of menu) console.log(item);

for (let [i, el] of menu.entries()) {
  console.log(`${i}: ${el}`);
}

//console.log([...menu.entries()]);


///////////////////////////////////////
//      ENHANCED OBJECT LITERALS

1. we can now add object to object by simply adding it

//EXAMPLE
objectA ={
  somedata,
  otherdata,
}

objectB = {
  name,
  lastname,
  objectA
}

2. we can short methods in objects

objectB = {
  name,
  lastname,
  objectA,

  func(...params) {
    code
  }

  instead of 
  func: function(...params) {
    code
  }
}

3. We can compute property names like below weekdays

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  openingHours: {
    [weekdays[0]]: { //mon
      open: 12,
      close: 22,
    },
    [weekdays[1]]: { //tue
      open: 11,
      close: 23,
    },
    [`day_${4-1}`]: { //any calc will work
      open: 0, // Open 24 hours
      close: 24,
    },
  },

///////////////////////////////////////
//      OPTIONAL CHAINING (?.)

//console.log(restaurant?.openingHours?.mon?.open); //? will specify if value exists, if not undefined is returned. It has to be different than null/undefined

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  //console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

//with optional chaining we can check if method exists!!!

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist!');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist!');

const users = [{ name: 'Chris', email: 'chrismast@wp.pl' }];

console.log(users[0]?.name ?? 'User array empty');



///////////////////////////////////////
//      LOOPING OBJECTS: OBJECT KEYS, VALUES, ENTRIES

for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}

for (const hours of Object.values(restaurant.openingHours)) {
  console.log(hours);
}

// for (const entries of Object.entries(restaurant.openingHours)) {
//   console.log(entries);
// }

//console.log(Object.entries(restaurant.openingHours));

const entries = Object.entries(restaurant.openingHours);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

  */

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [id, player] of game.scored.entries())
  console.log(`Goal ${id + 1}: ${player}`);

const odds = Object.values(game.odds);
let avg = 0;

for (const odd of odds) {
  avg += odd;
}

avg /= odds.length; //*= etc...

console.log(avg);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

for (let [team, odd] of Object.entries(game.odds)) {
  const str = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${str} ${odd}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

const scorers = {};
for (let player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1); //parenthesis is not needed.
}

console.log(scorers);


///////////////////////////////////////
//      SETS

const orderSet = new Set([
  //- are iterables and has to be unique
  'Pasta',
  'Pizza',
  'Pasta',
  'Ristotto',
  'Pizza',
  'Pizza',
  'Pasta',
  'Pasta',
]);

console.log(orderSet);

console.log(new Set('Jonas')); //will split into chars

console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Burger'));

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');

console.log(orderSet);

orderSet.delete('Garlic Bread'); //specify what

console.log(orderSet);

//orderSet.clear(); //delete all sets, there is no way to get value from set

//we cannot retrieve values from set...  There are no indexes.

for (const order of orderSet) console.log(order); //we could retrieve by looping

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; //easy to conver to array
console.log(staffUnique);

const staffTypeCount = new Set(staff).size; //if we want numebr of unique records
console.log(staffTypeCount);

console.log(new Set('krzysztofjanuszmastalerz').size); //unique chars

///////////////////////////////////////
//      MAPS



//Map is data structure key value pars, key can have any time. Different then object, object has to have key and map, where key is basically string, map can have entire object as key.

const rest = new Map();

rest.set('name', 'Classico Italiano');
rest.set(1, 'Firence, Italy');
rest.set(2, 'Lisbon, Portugal');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 22)
  .set(true, 'we are open')
  .set(false, 'we are closed');

console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));

const time = new Date().getHours();

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories')); //check if values exist

rest.delete(2); //remove elemtn from map

console.log(rest);

console.log(rest.size); //get size of map

rest.clear(); //remove all data from maps

rest.set([1, 2], 'Test'); //key is obejct in heap, so we have to use same array, not same valued array
console.log(rest.get([1, 2]));

let arr = [1, 3]; //this will work
rest.set(arr, 'Test');
console.log(rest.get(arr));

rest.set(document.querySelector('h1'), 'Heading'); //but we can map objects

console.log(rest);

//we can also iterate map

const question = new Map([
  ['question', 'What is the best programming language in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

console.log(question); //map is same structire as Object.entries()

//convert object to map, we convert object to iterable
const hourMap = new Map(Object.entries(restaurant.openingHours));

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = prompt('Your answer?');

console.log(question.get(answer == question.get('correct'))); //not strict comparison.

//convert map to array
console.log(...question); //same as .entries()
console.log(...question.keys());
console.log(...question.values());

///////////////////////////////////////
// Coding Challenge #3

Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
let uniqueEvents = [...new Set(gameEvents.values())]; //adding [] is mandatory
console.log(uniqueEvents);
//2
gameEvents.delete(64);
console.log(gameEvents);
//3
const totalTime = [...gameEvents.keys()].pop(); //pop removes last element, but also returns it.
console.log(
  `An event happened, on average, every ${totalTime / gameEvents.size} minutes`
);
//4
for (let [minute, event] of gameEvents) {
  console.log(
    `[${minute < 45 ? 'FIRST' : 'SECOND'} HALF] ${minute}}: ${event}`
  );
}


const airline = 'TAP Air Portugal';
const plane = 'A3203';

console.log(plane[0]); //get position of char, can also be 'STD'[0] will return 0
plane.length; //will return total of chars
plane.indexOf('3'); //will return first appearence of 3, we can also search for entire words
plane.lastIndexOf('3'); //will return last appearence of 3

console.log(airline.slice(4)); //return from which index word will extract
console.log(airline.slice(4, 7)); //we can also specify range of slice (index to index)

console.log(airline.slice(0, airline.indexOf(' '))); //get first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //get last word

console.log(airline.slice(-2)); //it will extract from the end

console.log(airline.slice(1, -1)); //we remove first and last char.

const checkMiddleSeat = function (seat) {
  //B & E ar middle seat
  return seat.slice(-1) === 'B' || seat.slice(-1) === 'E';
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));


let passanger = 'jOnAS';
passanger = passanger.toLowerCase();
passanger = passanger[0].toUpperCase() + passanger.slice(1);
console.log(passanger);

let email = 'hello@jonas.io';
let loginEmail = 'Hello@jonAs.Io \n';

email = email.toLowerCase().trim();
loginEmail = loginEmail.toLowerCase().trim(); //trimStart, trimEnd to select where trim should happen.
console.log(email === loginEmail);

const priceGB = '288,97£';
const priceUS = priceGB.replace(',', '.').replace('£', '$');
console.log(priceUS);

const announcement =
  'All passangers can go to boarding door 23, Boarding door 23!';

console.log(announcement.replace('door', 'gate')); //replaceALl raplaces all occurances
console.log(announcement.replace(/door/g, 'gate')); //we can replace all by formatting to regex, here /g stands as global.

// we also have .includes() .startWith() .endsWith() to check corresponding

const checkBaggage = function (itmes) {
  const baggage = itmes.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on aboard');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// .split allows us to split based on divider string

const [firstName, lastName] = 'Krzysztof Mastalerz'.split(' ');

console.log(['Mr.', firstName, lastName].join(' '));
console.log(['Mr.', firstName, lastName].join('')); //empty will join with ,

const capitalizeName = function (fullName) {
  let newParts = [];
  for (let part of fullName.split(' ')) {
    newParts.push(part[0].toUpperCase() + part.slice(1));
    //it could also be:
    //newParts.push(part[0], part[0].toUpperCase());
  }
  return newParts.join(' ');
};

console.log(capitalizeName('jessica ann smith davis'));

//Padding will add chars until length is reached

const account = '324';

console.log(account.padStart(4, '0'));
console.log(account.padEnd(4, '0'));

const maskCreditCard = function (cc) {
  let length = cc.toString().length;
  let masked = cc.toString().slice(-4).padStart(length, '#'); //instead of toString we could add ''
  console.log(masked);
};

maskCreditCard(9375839482784832);

//repeat string mutliple times
const meassage = 'Bad weather... All Departures Delayed...';
console.log(meassage.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🪁'.repeat(n)}`);
};

planesInLine(5);
planesInLine(2);
planesInLine(12);

///////////////////////////////////////
// Coding Challenge #4

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let convertToCamelCase = function () {
  let text = document.querySelector('textarea').value;
  let iterator = 1;
  for (let line of text.split('\n')) {
    let words = [];
    for (let word of line.split('_')) {
      word = word.trim();
      //console.log(`Word before: ${word}`);
      let upperCaseWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
      //let upperCaseWord = word
      //  .toLowerCase()
      //  .replace(word[0], word[0].toUpperCase());
      //console.log(`Word after: ${upperCaseWord}`);
      words.push(upperCaseWord);
    }
    let camelText = words.join('');
    console.log(
      camelText
        .replace(camelText[0], camelText[0].toLowerCase())
        .padEnd(24, ' ') + `${'✅'.repeat(iterator)}`
    );
    iterator++;
  }
};

document.querySelector('button').addEventListener('click', convertToCamelCase);

// convertToCamelCase(`underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure`);


// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const logFlights = function (text) {
  for (let info of text.split('+')) {
    //1. Get all types
    let [type, from, to, time] = info.split(';');

    //2. format first value to drop initial _
    type = type.slice(1).replace('_', ' ');
    //3. format from and to value to get initial 3 chars in uppercase
    from = from.slice(0, 3).toUpperCase();
    to = to.slice(0, 3).toUpperCase();
    //4. in time replace : with k
    time = time.replace(':', 'h');

    console.log(
      `${
        type.includes('Delayed') ? '🔴' : ''
      } ${type} from ${from} to ${to} (${time})`.padStart(45)
    );
  }
};

logFlights(flights);
*/
