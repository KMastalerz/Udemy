'use strict';

//////////////////////////////
// How do we create class in JS
/*
/////
// Costructor functions and the new operator.  (Its actually a pattern)

// You can use only function expression and declaration, no arrow functions in that. 
const Person = function(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName,
    this.birthYear = birthYear

    // Never create a function in constructor function. below is a bad practice
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // }
}

// have to use new operator
let chris = new Person('Chris', 1990);
let tom = new Person('Tom', 1993);

console.log(chris);
console.log(tom);
console.log(chris instanceof Person);

//1. New {} is created
//2. Function is called, this = {}
//3. {} linked to prototype
//4. function automatically return {}

/////
// Prototypes

// thanks to prototype only one copy of method exists, we dont have a lot of fucntions
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

chris.calcAge();
tom.calcAge();
console.log(chris.__proto__);
console.log(chris.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(chris));
console.log(Person.prototype.isPrototypeOf(Person)); //it sprototype of object, not 'class'

Person.prototype.species = 'Homo Sapiens';
console.log(chris, chris.species);
console.log(chris.hasOwnProperty('firstName'));
console.log(chris.hasOwnProperty('species'));//its not in chris property, but in prototype

console.log(chris.__proto__);
// Object.prototype (top of prototype chain)
console.log(chris.__proto__.__proto__);
console.log(chris.__proto__.__proto__.__proto__);
console.dir(Person.prototype.constructor);

const arr = [3,6,7,8,4,3,2,6,3,5,7,8,8];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function(){
    return [... new Set(this)];

    // this would mutate
    // let uniqueSet = [...new Set(this)];
    // this.length = 0;
    // for(let item of uniqueSet){
    //     this.push(item);
    // }
}
console.log(arr);
console.log(arr.unique()); //if js adds new method, then it will break code. 

const h1 = document.querySelector('h1');
console.dir(h1); // Look at: prototype of document element chain
console.dir(x=>x+1); // Look at: prototype of function

*/
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀


const Car = function(make, speed){
    this.make = make, 
    this.speed = speed
};

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} current speed is: ${this.speed} km\\h`);
    return this; //if i want to chain option
}

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} current speed is: ${this.speed} km\\h`);
    return this;
}


const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 120);

bmw.accelerate().brake().brake().accelerate().accelerate();
mercedes.accelerate().brake().brake().brake().accelerate();

*/
/////
// ES6 Classes
/*
//class expression
//const PersonCl = class {}

//class declaration
class Person {
    constructor(fullName, birthYear){
        this.fullName = fullName,
        this.birthYear = birthYear
    }
    //Instance methods
    //methods will be added to prototype
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    //all outside consturctor is in prototype
    get age() {
        return 2037 - this.birthYear;
    }

    //set existing property
    set fullName(name){
        if (name.includes(' ')) {
            this._fullName = name;
        } //else alert (`${name} is not a full name`);
    }
    get fullName() {
        return this._fullName;
    }

    //this are static methods, that are attached to constructor. 
    static hey() {
        console.log(this);
        console.log(`Hey there 👋`);
    };

}

const jessica = new Person('Jessica Davies', 1996);
console.log(jessica);

const walter = new Person('Walter', 1990);
console.log(walter);
//we can still add prototypes etc. 
// Person.prototype.greet = function() {
//     console.log(`Hey ${this.firstName}`);
// }


// 1.classes are not hoisted
// 2.classes can be passed into functions and returned
// 3.classes are executed in strict mode, even if we dont use one. 


// const account = {
//     owner: 'Chris',
//     movements: [200, 530, 120, 300],

//     get latest() {
//         return this.movements.slice(-1).pop();
//     },
    
//     set latest(value) {
//         this.movements.push(value);
//     }
// }

// account.latest = 50;
// console.log(account.latest);

/////
// Static Methods

// console.log(Array.from(document.querySelectorAll('h1'))); 
// from is attached to constructor.  same as Number.pasrseFloat();

// Person.hey = function(){
//     console.log(this);
//     console.log(`Hey there 👋`);
// };

Person.hey();
//jessica.hey();// <-- Cannot

// to reflect the same we need to use keyword static, to create static method. 

/////
// Object Create

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);//this way allows to manually set prototype
steven.Name = 'Steven'
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1993)
console.log(sarah);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀


class Car {
    constructor (make, speed){
        this.make = make,
        this.speed = speed
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} current speed is: ${this.speed} km\\h`);
        return this; //if i want to chai
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} current speed is: ${this.speed} km\\h`);
        return this;
    }

    get speedUS() {
        return Math.round(this.speed / 1.6);
    }

    set speedUS(speed){
        this.speed = Math.round(speed * 1.6)
    }
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 120);
const ford = new Car('Ford', 120);

console.log(`Ford starting speed: ${ford.speedUS} mi\\h`);

bmw.accelerate().brake().brake().accelerate().accelerate();
mercedes.accelerate().brake().brake().brake().accelerate();
ford.accelerate().brake().accelerate().accelerate();

ford.speedUS = 100; 

console.log(ford);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


const Car = function(make, speed){
    this.make = make, 
    this.speed = speed
};

const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);//start creating prototype chain
EV.prototype.constructor = EV; //restore initial contructor;

//Car shared methods
Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} current speed is: ${this.speed} km\\h`);
    return this; //if i want to chain option
}

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} current speed is: ${this.speed} km\\h`);
    return this;
}

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
    this.speed = 0;
    console.log(`${this.make} battery charged to: ${this.charge}%`);
    return this;
}

EV.prototype.accelerate = function () {//overrides previous accelerate, as it's closer in chain.
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
    return this;
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 120);
const ford = new Car('Ford', 120);
const tesla = new EV('Tesla', 120, 23);

bmw.accelerate().brake().brake().accelerate().accelerate();
mercedes.accelerate().brake().brake().brake().accelerate();
ford.accelerate().brake().accelerate().accelerate();
tesla.accelerate().accelerate().chargeBattery(tesla.charge + 10).accelerate();

*/
///////////////////
// Class Inheritance
/*
///////
// Construction Classes
const PersonCC = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
}

PersonCC.prototype.calcAge = function() {
    console.log(new Date().getFullYear() - this.birthYear);
}

const StudentCC = function(firstName, birthYear, course){
    PersonCC.call(this, firstName, birthYear); //we can manually set this keyword 
    this.course  = course;
} 

// Linking prototype to create a chain
StudentCC.prototype = Object.create(PersonCC.prototype);
//StudentCC.prototype.__proto__ = PersonCC.prototype; //this would replace prototype.
//StudentCC.prototype = PersonCC.prototype;

StudentCC.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

StudentCC.prototype.constructor = StudentCC; //restore constructor

const mike = new StudentCC('Mike', 2001, 'Computer Science');

// mike.introduce()
// mike.calcAge();

console.log(mike.__proto__);


//console.log(mike);
// console.log(mike instanceof StudentCC);
// console.log(mike instanceof PersonCC);



///////
// ES6 Classes

class PersonCL {
    constructor(fullName, birthYear){
        this.fullName = fullName,
        this.birthYear = birthYear
    }
    //Instance methods
    //methods will be added to prototype
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    //all outside consturctor is in prototype
    get age() {
        return 2037 - this.birthYear;
    }

    //set existing property
    set fullName(name){
        if (name.includes(' ')) {
            this._fullName = name;
        } //else alert (`${name} is not a full name`);
    }
    get fullName() {
        return this._fullName;
    }
    //this are static methods, that are attached to constructor. 
    static hey() {
        console.log(this);
        console.log(`Hey there 👋`);
    };
}

class StudentCL extends PersonCL {
    constructor(fullName, birthYear, course) {
        //always need to happen first, at its creates 'this' keyword
        super(fullName, birthYear);//constructor of parent class
        this.course = course; 
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }
    
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but i feel like ${2037 - this.birthYear + 10}`);
    }

}

// class StudentCL extends PersonCL { //if you not add new properties, then you dont need to even create a new constructor;
// }

// const martha = new StudentCL('Martha Jones', 2012)

const martha = new StudentCL('Martha Jones', 2012, 'Computer Science')
console.log(martha);
martha.introduce();
martha.calcAge();


///////
// Object.Create()

const PersonProto = {
    calcAge() {
        console.log(2027 - this.birthYear);
    },

    init(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
}

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (fullName, birthYear, course) {
    PersonProto.init.call(this, fullName, birthYear);
    this.course = course;
}

StudentProto.introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}

const steven = Object.create(PersonProto);
steven.init('Steven Curry', 2010);

const jay = Object.create(StudentProto);
jay.init('Jay Wise', 1980, 'Mechanical Engineering');

jay.introduce();
jay.calcAge();


// public fields
// private fields
// public methods
// private methods
// there are also static 

class Account {
    //public fields (instances)
    local = navigator.language;
    

    //private fields
    #movement = [];
    #pin;

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        //protected property
        //this._movement = [];
        //this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    getMovements(){
        return this.#movement;
    }

    deposit(val){
        this.#movement.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }



    requestLoan(val){
        if(this.#approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`);
        }
        else {
            console.log(`Loan request is too high`);
        }
        return this;
    }

    //Private methods
    #approveLoan(val){//shouldnt be accessible, hence encapsulation and protection
        if(val < 1000) return true;
        else return false;
    }

    static helper(){
        console.log(`methods on class, not instance`);
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111)
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(100);
acc1.requestLoan(1500);
console.log(acc1);

Account.helper();
//acc1.helper();

//chaining 
acc1.deposit(200).deposit(300).withdraw(100).requestLoan(100).withdraw(200).requestLoan(1500);
console.log(acc1);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class Car {
    make;
    speed;

    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
      }
    
      brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
      }
    
      get speedUS() {
        return this.speed / 1.6;
      }
    
      set speedUS(speed) {
        this.speed = speed * 1.6;
      }
}

class EV extends Car{
    #charge;

    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
        
        console.log(`${this.make}, current speed: ${this.speed}km\\h, current charge ${this.#charge}%`);
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        this.speed = 0;
        console.log(`${this.make}, current speed: ${this.speed}km\\h, current charge ${this.#charge}%`);
        return this;
    }

    accelerate(){
        this.speed += 20;
        this.#charge --;
        console.log(`${this.make}, current speed: ${this.speed}km\\h, current charge ${this.#charge}%`);
        return this;
    }
}

let test = new EV('Rivian', 120, 35);
test.accelerate().accelerate().brake().accelerate().chargeBattery(90).accelerate();
