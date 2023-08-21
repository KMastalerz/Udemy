'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //its node list not array

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scrolling
btnScrollTo.addEventListener('click', function(e){
  //e.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX, 
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  //new way - Modern browsers
  section1.scrollIntoView({
    behavior: 'smooth'
  });
})


//////////////////
// Page navigation

// This is not efficient way

// document.querySelectorAll('.nav__link').forEach(
//   function(el) { el.addEventListener('click', function(e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({
//         behavior: 'smooth'
//       });
//       //console.log(id);
//     })
//   }
// )

// More efficient is event delegation

// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching strategy
  if(e.target.classList.contains('nav__link')) {
     // 2. Determine, which element originated the event
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      });
      //console.log(id);
  }
});

///////////////
// Tabs display

const swichTab = function(e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab'); //get closest element with operations tab

  if (!clicked) return;

  const id = clicked.dataset.tab; // clicked.getAttribute('data-tab')

  //active tab
  clicked.classList.add('operations__tab--active');

  //close on rest
  tabs.forEach(tab=>{
    if(!tab.classList.contains(`operations__tab--${id}`))
    tab.classList.remove('operations__tab--active');
  });

  //activate data content
  //document.querySelector(`.operations__content--${id}`).classList.add('operations__content--active');
  tabsContent.forEach(c=>{
    if(!c.classList.contains(`operations__content--${id}`))
      c.classList.remove('operations__content--active');
    else 
      c.classList.add('operations__content--active');
  });
}

//tabs.forEach(t=>t.addEventListener('click', ()=>console.log('Click')));
tabsContainer.addEventListener('click', swichTab);

///////////////////////
// Menu fade animation
const changeOpacity = function(e) {
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el=> {
      if(el !== link) el.style.opacity = this;
    })

    logo.style.opacity = this;
  }
}

// nav.addEventListener('mouseover', function(e){
//   changeOpacity(e, 0.5);
// }); //mouse over bubble, mouse eneter does not. We need bubbling for this.
//passing argument int handler
nav.addEventListener('mouseover', changeOpacity.bind(0.5)); 
nav.addEventListener('mouseout', changeOpacity.bind(1)); //mouse out bubble, mouse leave does not. We need bubbling for this.

///////////////////////////////////
// Lock navigation on top - sticky

// const navScrool = function() {
//   let vpPosition = window.scrollY;
//   let initialCoords = section1.getBoundingClientRect();

//   if(vpPosition > initialCoords.top) nav.classList.add('sticky');
//   else n
// }

// window.addEventListener('scroll', navScrool)
const stickyNav = function(entries) { // can be (entries, observer)
  const [entry] = entries; //same as setting up 0

  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');

};

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, { //could pass object as options
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,//needs to be pixels
});

headerObserver.observe(header);

//////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  // if(entry.isIntersecting)
  //   entry.target.classList.remove('section--hidden');
  // else
  //   entry.target.classList.add('section--hidden');

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); //no longer observe, once target is handled
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]'); //download if attribute data-src exists

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){ //remove blu after loading done
    entry.target.classList.remove('lazy-img');
  })
  

  observer.unobserve(entry.target); //no longer observe, once target is handled
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img =>imgObserver.observe(img));

//////////////////////
// Slider Part 1
//set slides side by side

const slider = function () { //wrap around function to not pollute global namespace
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  const slides = document.querySelectorAll('.slide');

  let curSlide = 0;
  let maxSlide = slides.length - 1;


  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`)
    });
  }
  const moveSlide = function(curIndex) { 
    slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - curIndex)}%)`);
    selectDot(curIndex);
  }
  const selectDot = function(curIndex) {
    dotContainer.childNodes.forEach((dot, i) => i === curIndex ? dot.classList.add('dots__dot--active') : dot.classList.remove('dots__dot--active'));
    // console.log('----- Select Dot -----');
    // console.log(`At index: ${curIndex}`);

    // document.querySelectorAll('.dots__dot').forEach(dot=> dot.classList.remove('dots__dot--active'));

    // document.querySelector(`.dots__dot[data-slide="${curIndex}"]`).classList.add('dots__dot--active');
  }
  const nextSlide = function() {
    if(curSlide === maxSlide){
      curSlide = 0;
    } else {
      curSlide++;
    }
    moveSlide(curSlide)
  }
  const prevSlide = function() {
    if(curSlide === 0){
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    moveSlide(curSlide);
  }
  const init = function() {
    createDots();
    moveSlide(0);
  }

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function(e){
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      //const {slide} = e.target.dataset; //another destructuring
      curSlide = +e.target.dataset.slide;
      moveSlide(curSlide);
    }
  });
};

slider();

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML Parsed and DOM tree build!', e);
  //we dont need to listen is .js is last in HTML
}) //DomContentLoaded, was downlaoded and converted. (HTML & JS only, will not wait for external data)

window.addEventListener('load', function(e){
  console.log('Page fully loaded!', e);
}) // Fully loaded

// window.addEventListener('beforeunload', function(e) { //interact with site to display, this is done to makre sure people saved their changes
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = null;
// }); // Before leaving the page, dont abuse this page


//html



///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// Selecting, Creating and Deleteing Elements. 
/*
// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');//html collection, it is live so if we delete it will refresh, once i remove/add elements | getElementsByClassName is the same. 
console.log(allButtons);


// Creating
// .insertAdjacantHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionalities and analytics.';
message.innerHTML = 'We use cookies for improved functionalities and analytics. <button class="btn btn--close-cookie">Got it!</button>"'

// Dom is unique, it can only once. We have to clone if we want in two places
header.append(message); //last
// header.prepend(message.cloneNode(true)); //first
// header.before(message); //last
// header.after(message); //last


// Delete

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();//it's in memory 
  //before
  //message.parentElement.removeChild(message);
});

// Style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.height); //we can only get those, that were created in js. (inline)

//console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); //we can access style like below
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//root are css variables => custome properties 


//this could be used to set the themes. 

document.documentElement.style.setProperty('--color-primary', 'orangered')

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //absolute (same with href)
console.log(logo.getAttribute('src')); //relative (same with href)
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
// we cannot get non standard property, it will not be added automatically
// console.log(logo.something);
console.log(logo.getAttribute('designer')); // so we do this

// we can also set new attributes 
logo.setAttribute('company', 'Bankist');

//data attributes it has to startwith data-

console.log(logo.dataset.versionNumber); // in naming it skips dash and converts to camel case

////////////////////////////////////////////////////////// Classes 

logo.classList.add('a', 'j');
logo.classList.remove('a', 'j');
logo.classList.toggle('a');
logo.classList.contains('a'); // it contains, not includes. 

logo.className = 'jonas'; //dont use that!!!!!!!!!!!

const s1coords = section1.getBoundingClientRect();
console.log(s1coords);
console.log(e.target.getBoundingClientRect());
console.log(`Current scroll (X/Y): ${window.scrollX} / ${window.scrollY}`);
console.log(`View Port height/width ${document.documentElement.clientHeight} / ${document.documentElement.clientWidth}`);

////////////////////////////////////////////////////////// Events

const alertH1 = function(e) {
  alert('Great');//we can add more on top
};

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1)

setTimeout(()=> h1.removeEventListener('mouseenter', alertH1));

// const highlight = document.querySelectorAll('.highlight');
// highlight.forEach(hi=>hi.addEventListener('mouseenter', function() {console.log(`Well you hoovered over highlight`)}));

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function() {console.log(`Well you hoovered over h`)});


// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK ", e.target, e.currentTarget);
})
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER ", e.target, e.currentTarget);
})
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV ", e.target, e.currentTarget);
})

// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK ", e.target, e.currentTarget);
  e.stopPropagation(); //we can stop travelling the tree
}); 
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER ", e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV ", e.target, e.currentTarget); //e.currentTarget === this
}, true);//if treu will listen to capturing not bubbling events

////////////////////////////////////////////////////////// DOM traversing
const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

console.log(h1.parentNode);
console.log(h1.parentElement); //can be same as note

h1.closest('.header').style.background = 'var(--gradient-secondary)' //we can assign to closest, and get variables from parent styling

h1.closest('h1').style.background = 'var(--gradient-primary)'

//going sidways : siblings, only direct ones

// sibling elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// sibling nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if we need all siblings -> parent and then its children
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function(el) {
  if(el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
})
*/