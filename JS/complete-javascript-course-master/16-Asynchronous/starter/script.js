'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
/*
///////////////////////////////////////

//////// OLD WAY
/*


///Callback HELL
const getCountryData = function(county) {
    const request = new XMLHttpRequest();

    request.open('GET', `https://restcountries.com/v3.1/name/${county}`);
    
    request.send();
    
    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        //render selected counry
        renderCountry(data);

        //get neighbour country
        const [neighbour] = data.borders;

        if(!neighbour) return; //there were not countries

        const request2 = new XMLHttpRequest();

        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

        request2.send();

        
        request2.addEventListener('load', function(){
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            //render selected counry
            renderCountry(data2, 'neighbour');
        });
    });
}


getCountryData('usa');

*/
/* 
//////// NEW WAY
const renderError= function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
}

const renderCountry = function(data, className = '') {


    let languages = Object.values(data.languages);
    let currencies = Object.values(data.currencies).map(currency => currency.name);
    const html = `        
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln.</p>
            <p class="country__row"><span>🗣️</span>${languages.join(', ')}</p>
            <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>
        </div>
    </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html);
}

const getJSON = function(url, errorMsg = `Something went wrong`){
    return fetch(url).then(res => {
        if(!res.ok) throw new Error(`${errorMsg} (${res.status})`)
        return res.json();
    });
}


const getCountryData = function(country){
    getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
        renderCountry(data[0])

        if(!data[0].borders) throw new Error('No neighbour found!');

        const neighbour = data[0].borders[0];

        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,  `Country not found`) //do not call then here, to avoid callback hell
    })
    .then(data=> renderCountry(data[0], 'neighbour'))
    .catch(err=> 
    {
            console.error(`${err}💥💥💥`)
            renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)

    })
    .finally(() => {
            //always called, no matter if error or not
            countriesContainer.style.opacity = 1;
    });//better then calling err as second callback function in each promise.
}

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {
//             console.log(response);

//             if(!response.ok) throw new Error(`Country not found (${response.status})`);

//             return response.json()
//         })//, err => alert(err)
//         .then(data => {
//             renderCountry(data[0])
//             //const neighbour = data[0].borders[0];

//             const neighbour ='asdasdasdasd';

//             if(!neighbour) return;

//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`) //do not call then here, to avoid callback hell
//         })
//         .then(response=> {

//             if(!response.ok) throw new Error(`Country not found (${response.status})`);

//             return response.json()
//         })
//         .then(data=> renderCountry(data[0], 'neighbour'))
//         .catch(err=> 
//         {
//             console.error(`${err}💥💥💥`)
//             renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
//         }).finally(() => {
//             //always called, no matter if error or not
//             countriesContainer.style.opacity = 1;
//         });//better then calling err as second callback function in each promise.
// }

btn.addEventListener('click', function(){
    getCountryData('Australia');
});


///////////////////////////////////////
// Coding Challenge #1


In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀


const whereAmI = function(lat, lng){
    let url =  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&accept-language=english&format=json` 
    return  fetch(url)
            .then(result => {
                if(!result.ok) throw new Error(`Problem with geocoding ${res.status}`);
                return result.json();
            })
            .then(data => {
                console.log(data);
                let country = data.address.country;
                
                console.log(`You are in ${data.address.city}, ${country}`);

                getCountryData(country);
            })
            .catch(err => console.err(`${err.message} 💥`));
}

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

console.log('Test start');//1 //its in callstack
setTimeout(() => console.log(`0 sec timer`), 0);//4 this is in callback queue
Promise.resolve('Resolved Promise 1').then(res=>console.log(res));//3 (immidtiate promis go to microtasks queue, which has priority)

Promise.resolve('Resolved Promise 2').then(res=>{
    for (let i = 0; i < 2_000_000_000; i++){}
    console.log(res)
});
console.log('Test End');//2 //its in callstack

const lotteryPromise = new Promise(function(resolve, reject) { //executer function as param
    console.log(`Lottery draw is happening 🎫`);
    setTimeout(function() {
        if(Math.random() >= 0.5){
            resolve(`You WIN 🏆`);//fullfilled / resolved promise
        }
        else reject(`You lost... 😥`); //rejected promies (error etc.)
    }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));



wait(2).then(()=> {
    console.log(`I waited for 2 seconds`)
    return wait(1);
}).then(()=>console.log(`I waited for 1 second`));

/* This way we can simplofy below: 
setTimeout(()=>{
    console.log('1 sec passed');
    setTimeout(()=>{
        console.log('2 sec passed');
        setTimeout(()=>{
            console.log('3 sec passed');
            setTimeout(()=>{
                console.log('4 sec passed');
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);


//to this, eskaping the callback hell: 
wait(1)
.then(()=>{
    console.log('1 sec passed');
    return wait(1);
})
.then(()=>{
    console.log('2 sec passed');
    return wait(1);
})
.then(()=>{
    console.log('3 sec passed');
    return wait(1);
})
.then(()=>{
    console.log('4 sec passed');
})

Promise.resolve('abc').then(x=>console.log(x));
Promise.reject(new Error(`Problem!`)).catch(x=>console.error(x));



// navigator.geolocation.getCurrentPosition(
//     position=> console.log(position), 
//     err=>console.error(err)
// );

const getPosition = () => {
    return new Promise ((resolve, reject) => {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position), 
        //     err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};


//getPosition().then(pos=>console.log(pos));

const renderError= function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
}

const renderCountry = function(data, className = '') {


    let languages = Object.values(data.languages);
    let currencies = Object.values(data.currencies).map(currency => currency.name);
    const html = `        
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln.</p>
            <p class="country__row"><span>🗣️</span>${languages.join(', ')}</p>
            <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>
        </div>
    </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html);
}

const whereAmI = function () {
    getPosition()
    .then(pos => {
        // let lat = pos.coords.latitude;
        // let lng = pos.coords.longitude;

        //same as: 
        const {latitude: lat, longitude: lng} = pos.coords;
        let url =  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&accept-language=english&format=json` 
        return fetch(url);
    })
    .then(result => {
        if(!result.ok) throw new Error(`Problem with geocoding (${result.Status})`);

        return result.json();
    })
    .then(data => {
        let country = data.address.country;
        let url = `https://restcountries.com/v3.1/name/${country}`
        return fetch(url);
    })
    .then(result => {
        if(!result.ok) throw new Error(`Country not found (${result.Status})`);

        return result.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(error => console.error(`${error.message})`))
    .finally(() => {
        //always called, no matter if error or not
        countriesContainer.style.opacity = 1;
    });
  };
  
  btn.addEventListener('click', whereAmI);

  */

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

const imageContainer = document.querySelector('.images');

//Pormisyfying set timeout
const wait  = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}

const createImage = function(imgPath) {
    return new Promise((resolve, reject) => {

        const img = document.createElement('img');

        img.src = imgPath;

        img.addEventListener('load', () => {
            imageContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject(new Error('Image not found'));
        });
    });
}

let currentImg;

createImage('img/img-1.jpg')
.then(img => {
    currentImg = img;
    console.log('Image 1 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg')
})
.then(img => {
    currentImg = img;
    console.log('Image 2 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg')
})
.then(img => {
    currentImg = img;
    console.log('Image 3 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
})
.catch(err => console.error(err));
*/

/*
const renderError= function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

const renderCountry = function(data, className = '') {


    let languages = Object.values(data.languages);
    let currencies = Object.values(data.currencies).map(currency => currency.name);
    const html = `        
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln.</p>
            <p class="country__row"><span>🗣️</span>${languages.join(', ')}</p>
            <p class="country__row"><span>💰</span>${currencies.join(', ')}</p>
        </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
}

*/
/*

const whereAmI = function () {
    getPosition()
    .then(pos => {
        // let lat = pos.coords.latitude;
        // let lng = pos.coords.longitude;

        //same as: 
        const {latitude: lat, longitude: lng} = pos.coords;
        let url =  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&accept-language=english&format=json` 
        return fetch(url);
    })
    .then(result => {
        if(!result.ok) throw new Error(`Problem with geocoding (${result.Status})`);

        return result.json();
    })
    .then(data => {
        let country = data.address.country;
        let url = `https://restcountries.com/v3.1/name/${country}`
        return fetch(url);
    })
    .then(result => {
        if(!result.ok) throw new Error(`Country not found (${result.Status})`);

        return result.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(error => console.error(`${error.message})`))
    .finally(() => {
        //always called, no matter if error or not
        countriesContainer.style.opacity = 1;
    });
  };
  
*/
  /*
const getPosition = () => {
    return new Promise ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// const getPosition = async () => {
//     var location = await navigator.geolocation.getCurrentPosition(resolve, reject);
//     return location;
// };

const whereAmI = async function() {
    try {
        //get geolocation
        let location = await getPosition(); 

        //get coords
        let {latitude: lat, longitude: lng} = location.coords;
        
        //get reverse geolocation (coords => country)
        let geoURL =  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&accept-language=english&format=json` 
        let geolocationRes = await fetch(geoURL);

        //check if geo is OK
        if(!geolocationRes.ok) throw new Error(`Problem with geocoding (${geolocationRes.Status})`);
        let geoData = await geolocationRes.json();

        let country = geoData.address.country;

        //get country details
        let countryURL = `https://restcountries.com/v3.1/name/${country}`
        let countryRes = await fetch(countryURL); 
        
        if(!countryRes.ok) throw new Error(`Country not foun (${countryRes.status})`);

        const countryData = await countryRes.json();

        //console.log(countryData[0]);

        renderCountry(countryData[0]);

        return `You are in ${geoData.address.city}`;
    }
    catch (err) {
        console.error(`${err.message}`);
        renderError(`Something went wrong 💣 ${err.message}`);


        //reject promise from rejected 
        throw err;
    }
}

//btn.addEventListener('click', whereAmI);
console.log('1: Will get location');
//const city = whereAmI();
//console.log(city);
// whereAmI()
//     .then(city=> console.log(`2: ${city}`))
//     .catch(err=> console.error(`2: ${err}`))
//     .finally(()=> console.log('3: Finished getting location')
// );

(async function() {
    try 
    {
        let city = await whereAmI();
        console.log(`2: ${city}`)
    }
    catch (err) 
    {
        console.error(`2: ${err}`)
    }
    console.log('3: Finished getting location')
})();



const getJSON = function(url, errorMsg = `Something went wrong`){
    return fetch(url).then(res => {
        if(!res.ok) throw new Error(`${errorMsg} (${res.status})`)
        return res.json();
    });
}

const get3Countries = async function(c1,c2,c3)
{
    try
    {
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

        //this short circuits
        const data = await Promise.all([getJSON(`https://restcountries.com/v3.1/name/${c1}`),
                                        getJSON(`https://restcountries.com/v3.1/name/${c2}`),
                                        getJSON(`https://restcountries.com/v3.1/name/${c3}`)])

        console.log(data.map(d => d[0].capital[0]));
        //console.log([data1.capital, data2.capital, data3.capital]);
    }
    catch (err)
    {
        console.error(err);
    }
};

get3Countries('Portugal', 'USA', 'Poland');


const getJSON = function(url, errorMsg = `Something went wrong`){
    return fetch(url).then(res => {
        if(!res.ok) throw new Error(`${errorMsg} (${res.status})`)
        return res.json();
    });
};

// (async function(){
//     //return first settled promise
//     const res = await Promise.race([
//         getJSON(`https://restcountries.com/v3.1/name/italy`),
//         getJSON(`https://restcountries.com/v3.1/name/germany`),
//         getJSON(`https://restcountries.com/v3.1/name/poland`),
//     ]);

//     console.log(res);
// })();


// const timeout = function(sec) {
//     return new Promise(function(_, reject) {
//         setTimeout(function(){
//             reject(new Error('Request took to long'));          
//         }, sec * 1000);
//     });
// };

// Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     timeout(0.1)
// ])
// .then(res => console.log(res[0]))
// .catch(err => console.error(err));

//Promise.allSettled() - return all promises | newver short circuits

// Promise.allSettled([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success'),
// ]).then(res=>console.log(res))


// Promise.all([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Another Success'),
// ]).then(res=>console.log(res))

Promise.any([//return first successfull promise
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
]).then(res=>console.log(res))

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imageContainer = document.querySelector('.images');

//Pormisyfying set timeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}

const createImage = function(imgPath) {
    return new Promise((resolve, reject) => {

        const img = document.createElement('img');

        img.src = imgPath;

        img.addEventListener('load', () => {
            imageContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject(new Error('Image not found'));
        });
    });
}

let currentImg;

const loadNPause = async function() {
    try
    {
        currentImg = await createImage('img/img-1.jpg')
        console.log('Image 1 Loaded');
        await wait(2);
    
        currentImg.style.display = 'none';
        currentImg =await createImage('img/img-2.jpg')
        console.log('Image 2 Loaded');
        await wait(2);
    
        currentImg.style.display = 'none';
        currentImg =await createImage('img/img-3.jpg')
        console.log('Image 3 Loaded');
        await wait(2);
    
        currentImg.style.display = 'none';
    }
    catch(err)
    {
        console.error(err);
    }
}

//loadNPause();

/*
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/
const loadAll = async function(imgArr) {
    try
    {
        let imgs = imgArr.map(async img => 
           //{ return await createImage(img);}
           await createImage(img)
        );

        const imgEl = await Promise.all(imgs)
        imgEl.forEach(img=> img.classList.add('parallel'))


        console.log(imgEl);
    }
    catch(err)
    {
        console.error(err);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);


/*
const createImage = function(imgPath) {
    return new Promise((resolve, reject) => {

        const img = document.createElement('img');

        img.src = imgPath;

        img.addEventListener('load', () => {
            imageContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject(new Error('Image not found'));
        });
    });
}
*/


/*
createImage('img/img-1.jpg')
.then(img => {
    currentImg = img;
    console.log('Image 1 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg')
})
.then(img => {
    currentImg = img;
    console.log('Image 2 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg')
})
.then(img => {
    currentImg = img;
    console.log('Image 3 Loaded');
    return wait(2);
})
.then(() => {
    currentImg.style.display = 'none';
})
.catch(err => console.error(err));
*/