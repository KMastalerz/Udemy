'use strict';

// var millenial = true; //it creates also window property
// console.log('window.millenial: ' + window.millenial);
//console.log(this);

/*
function calcAge(birthYear) {
  //console.log(this); //it would be window in sloppy mode(not strict mode)
  const age = 2037 - birthYear;

  //   var millenial = true;
  //   console.log('window.millenial: ' + window.millenial); //undefined  as it has to be global.

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    //console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; //it creates also window property
      //console.log('window.millenial: ' + window.millenial); //undefined  as it has to be global.

      const firstName = 'Steven';
      //console.log('window.firstName: ' + window.firstName); //const and let doesnt creatre window variable

      const str = `Oh, and you're a millenial, ${firstName}`;
      //console.log(str);

      function add(a, b) {
        return a + b;
      }
      //Reassigning of output variable
      output = 'New Output';
    }

    //console.log(output);
    //console.log(millenial);
    //console.log(add(2, 3));    functions are block scoped only for strict mode
  }

  printAge();
  return age;
}

const firstName = 'Chris';
calcAge(1990);

// const calcAge = birthYear => {
//   console.log(this); //it would be parent.
//   return 2037 - birthYear;
// };

const chris = {
  firstName: 'Chris',
  year: 1990,
  calcAge: function () {
    console.log(this); //it would be object callign the method.
    console.log(2037 - this.year); //it would be object callign the method.
    // const self = this; //this was workoaround to get this in  child functions
    // const isMillenial = function () { //in regular function this is set to undefined
    //   console.log(this);
    // };
    const isMillenial = () => {
      console.log(this); //arro winherits from parent
    };

    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}`), //this doesnt go to arrow functions.
};

chris.greet();
chris.calcAge();

//Borrowing functions and more about this scopes

chris.calcAge();

const matilda = {
  year: 1985,
};

matilda.calcAge = chris.calcAge; //borrowing function.

matilda.calcAge();

var f = chris.calcAge; //we take a function

//console.log(f);
f();


function addDecl(a, b) {
  console.log(arguments);
  return a + b;
}

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addDecl(2, 5);

addExpr(2, 5);
addExpr(2, 5, 7, 6); //you can show more

var addArrow = (a, b) => {
  //arguments arent available in arrow functions.
  //console.log(arguments);
  return a + b;
};

addArrow(2, 5);
*/

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 26,
  family: ['Alice', 'Bob'],
};

const marriedJessica = Object.assign({}, jessica); //jessica; This is how we copy object, and only create shallow copy (only 1st level) look at array

marriedJessica.lastName = 'Davies';
marriedJessica.family.push('John', 'Mary');
console.log('Before Marriage: ', jessica);
console.log('After Marriage: ', marriedJessica);
