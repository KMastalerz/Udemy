'use strict';

/*
function logger() {
    console.log('My name is Krzysiek');
}

logger();
logger();

function fruitProcessr(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with  ${apples} apples and ${oranges} oranges.`
    return juice;
}
*/

/*
console.log(fruitProcessr(5, 0));

//function declaration, can be invoked in any part of kode
function calcAge1(birthYear) {
    return 2023 - birthYear;
}

console.log(calcAge1(1992));

//function expression, has to be invoked after delcaration
const calcAge2 = function (birthYear) {
    return 2023 - birthYear;
}

console.log(calcAge2(1992));



//arrow function (doesnt has this reference)
const calcAge3 = birthYear => 2023 - birthYear;

console.log(calcAge3(1992));

const yearsUntilRetirement = (birthYear, retirementYear, name) => {
    const age = 2023 - birthYear;
    const retirement = retirementYear - age;
    return `${name} will retire in ${retirement} years`;
}

console.log(yearsUntilRetirement(1990, 68, 'Krzysztof'))


function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessr(apples, oranges) {
    let applePieces = cutFruitPieces(apples);
    let orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with  ${applePieces} apple pieces and ${orangePieces} orange pieces.`
    return juice;
}

console.log(fruitProcessr(2, 3));



const friends = ['Michael', 'Steven', 'Peter']; //conts only primitives are immutable as const, so we can modify content, but we cannot replace entire array as new. 

console.log(friends);

const years = new Array(1991, 1990, 1989);

console.log(years);

console.log(friends[0]); //arrays are 0 based
console.log(friends[2]); //arrays are 0 based

console.log(friends.length); //number of elements should return 3

friends[2] = 'Jay';

console.log(friends);


function calcAge(birthYear) {
    return 2023 - birthYear;
}

const year = [1990, 1989, 1985, 1963, 2018];


console.log(calcAge(year[0]));

const friends = ['Michael', 'Steven', 'Peter'];

const newLength = friends.push('Jay'); //add to end, return length

console.log(friends);
console.log(newLength);

friends.unshift('John'); //add to beggining, return length

console.log(friends);

friends.pop(); //removes last element, returns removed element

console.log(friends);

friends.shift(); //removes first element, returns removed element

console.log(friends);

console.log(friends.indexOf('Steven')); //could be replaced by includes (strict, has to be same type) if we check existence in boolean value

friends.push(23);
console.log(friends.includes('23'));
console.log(friends.includes(23));
console.log(friends.indexOf('23'));
console.log(friends.indexOf(23));




console.log(chris);

console.log(chris.job);
console.log(chris['job']);//we could use by string (case sensitive)

chris.location = 'Poland';
chris['facebook'] = 'krzysiekmastalerz';
console.log(chris);

console.log(`${chris.firstName} has ${chris.friends.length} friends, and his best friend is called ${chris.friends[0]}`)

const chris = {
    firstName: "Krzysztof",
    lastName: "Mastalerz",
    birthYear: 1990,
    job: "Software Engineer",
    friends: ['Michal', 'Kasia', 'Mateusz'],
    hasDriversLicense: true,

    // calcAge: function (birthYear) { 
    //     return new Date().getFullYear() - birthYear;
    // }

    calcAge: function () { //here we need expression so we cannot use 'function' keyword
        this.age = new Date().getFullYear() - this.birthYear; //we could use chris.birthYear but if object name changes, then it will stop work.
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-old, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
    }
}

//console.log(chris.calcAge(1990));

console.log(chris.calcAge());
console.log(chris.age);
console.log(chris['calcAge']()); //we can also access functions by it's name
console.log(chris.getSummary()); //we can also access functions by it's name

for (let i = 1; i <= 10; i++) {
    console.log(`Lifting weights repetition ${i} 👍`);
}

const chris = [
    'Krzysztof',
    'Mastalerz',
    new Date().getFullYear() - 1990,
    ['Michal', 'Kasia', 'Mateusz'],
    true,
    'Software Engineer',
]

const types = [];
for (let i = 0; i < chris.length; i++) {
    //
    //types[i] = typeof chris[i];
    if (typeof chris[i] !== 'string') continue;  //break will stop
    console.log(chris[i], typeof chris[i]);

    types.push(typeof chris[i]);
}

console.log(types);

*/
let diceResult = 0;
let repetition = 0;
while (diceResult !== 6) {
    diceResult = Math.trunc(Math.random() * 6) + 1;
    repetition++;
    console.log(`Roll #${repetition} = ${diceResult}`);
}

console.log(`It took ${repetition} repetitions, to roll 6.`);