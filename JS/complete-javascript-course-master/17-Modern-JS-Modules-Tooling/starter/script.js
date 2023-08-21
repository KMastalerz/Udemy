//importing module
//import { addToCart, totalPrice as price, tq} from "./shoppingCart.js";
//import * as ShoppingCart from "./shoppingCart.js";
/*
import add, {cart} from "./shoppingCart.js"


console.log('Importing Module');

//ShoppingCart.addToCart('bread', 5);

//console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

add('pizza', 5);
add('bread', 2);
add('apple', 15);

console.log(cart);

// console.log('Start fetch');

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');

// const data = await res.json();

// console.log(data);

// console.log('Something');

const getLastPost = async function(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');

    const data = await res.json();

    return {title: data.at(-1).title, text: data.at(-1).body};
}


const lastPost = await getLastPost();

console.log(lastPost);

const shoppingCart2 = (function (){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity)
    {
        cart.push({product, quantity});
        console.log(`${quantity} ${product}${quantity>1 ? `s` : ''} added to cart`);
    }

    const orderStock = function(product, quantity)
    {
        console.log(`${quantity} ${product}${quantity>1 ? `s` : ''} ordered from supplier`);
    }

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    }
})();

shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
*/

//command lines

/* 
dir - directory
cd - change directory ..
mkdir - create follder
echo. > 'filename' -> echo. > script.js
type NUL > 'filename' -> type NUL > index.html
cd. > 'filename' -> cd. > style.css
. > 'filename' -> . > readme.txt (throws an error, but still creates a file)
code index.html
del - delete file
rmdir - delete empty folder
del - R [folder] - delete folder with all items
npm init - to initialize package.json
npm i  - install dependencies
npm i parcel --save-dev
npx parcel index.html
npm uninstall [project]
*/

//import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

import cloneDeep from "lodash-es";

const state = {
   cart: [
    {product: 'bread', quantity: 5},
    {product: 'pizza', quantity: 15},
   ],
   user: {loggedIn: true},
}

const cloneState = Object.assign({}, state);
const lodashCloneState = cloneDeep(state); //create deep clone

state.cart.push({product: 'apple', quantity: 25})

console.log(cloneState);
console.log(lodashCloneState);

//whenever we change modules it will maintain state
if(module.hot){
    module.hot.accept();
}

console.log(state.cart.find(el=>el.quantity >= 5));
Promise.resolve('Test').then(x=>console.log(x));

import 'core-js/stable'
//Polyfilling async functions
import 'regenerator-runtime/runtime'