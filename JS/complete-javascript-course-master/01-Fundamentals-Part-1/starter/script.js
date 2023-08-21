const country = "Poland";
const continent = "Europe";
let population = 38_000_000;

console.log(country);
console.log(continent);
console.log(population);

const isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof language);

language = "Polish";

// ** <- power 2 ** 3 = 2 * 2 * 2
// += <- also works on JS
// *= <- also works :) etc (++, --, /=)
console.log("Split population: " + population / 2);

// comparison operators

population++;

console.log("Population: " + population);

const finlandPopulation = 6_000_000;

console.log(country + " population is " + (finlandPopulation > population ? "smaller then" : finlandPopulation < population ? "bigger then" : "equal to") + " population of Finland");

const averageCountryPopulation = 33_000_000;

population--;

//console.log(country + " population is " + (averageCountryPopulation > population ? "smaller then" : averageCountryPopulation < population ? "bigger then" : "equal to") + " population of average country");
console.log(`${country} population is ${averageCountryPopulation > population ? "smaller then" : averageCountryPopulation < population ? `${(population - averageCountryPopulation) / 1_000_000} milion bigger then` : "equal to"} the population of average country`);

//console.log(country + " is in " + continent + ", and its " + (population / 1_000_000) + " million people speak " + language);
console.log(country + " is in " + continent + ", and its " + (population / 1_000_000) + " million people speak " + language);

console.log(`Emoji: 😃`) //windows + .


// console.log('9' - '5'); // 4
// console.log('19' - '13' + '17'); // '617'
// console.log('19' - '13' + 17); // 23
// console.log('123' < 57); // false
// console.log(5 + 6 + '4' + 9 - 4 - 2); // '1143'

// Falsy values 0, '', undefined, null, NaN <-- converted to bool will return false;

// Number("Jones") will return NaN therefore Boolean(Number("Jones")) will return false;

// console.log(Boolean(Number("Jones")));
// console.log(Boolean(Number('0')));
// console.log(Boolean(Number('23')));
// console.log(Boolean(Number(false))); //false = 0 :)
// console.log(Boolean(Number(true))); //as true = 1 :)
// console.log(Number(true));

//let age = Number(prompt("Whats your age?")); // prompt always returns string

// let numNeighbours = prompt('How many neighbour countries does your country have ?');

// if (numNeighbours === 1) {
//     console.log('Only 1 border!');
// } else if (numNeighbours > 1) {
//     console.log('More than 1 border');
// } else {
//     console.log('No borders');
// }

// switch uses === strict comparison; 