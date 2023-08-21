import { Observable, of, from, fromEvent, timer, interval, forkJoin, combineLatest, EMPTY, concat, Subject, BehaviorSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, debounceTime, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
// const helloButton = document.querySelector('button#hello');
// const temperatureInput = document.getElementById('temperature-input');
// const conversionDropdown = document.getElementById('conversion-dropdown');
// const resultText = document.getElementById('result-text');
// const sliderInput = document.querySelector('input#slider');
// const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');
// const emitButton = document.querySelector('button#emit');
// const inputElement: HTMLInputElement = document.querySelector('#value-input');
// const subscribeButton = document.querySelector('button#subscribe');
const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');


//BASE: https://random-data-api.com/
const BASE_URL = 'https://random-data-api.com/api/';
const RAND_NAME = 'name/random_name';
const RAND_NATION = 'nation/random_nation';
const RAND_FOOD = 'food/random_food';

/*
const observable$ = new Observable<string>(subscriber => {
  subscriber.next('Alice');
  setTimeout(() => subscriber.next('Ben'), 2000);
  setTimeout(() => subscriber.next('Charlie'), 4000);
  //setTimeout(() => subscriber.complete(), 100);
});

console.log('Subscription 1 starts');
observable$.subscribe(value => console.log('Subscription  1: ', value));

setTimeout(()=>{
  console.log('Subscription 2 starts');
  observable$.subscribe(value => console.log('Subscription  2: ', value));
}, 1000);
*/

/*
const observable$ = new Observable<string>(subscriber=> {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');
  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
    //subscriber.next('Alana');
  }, 4000);
  
  setTimeout(() => {
    subscriber.error(new Error('Error on timeout.'));
  }, 2000);
  //subscriber.next('Alana');

  return() => {
    console.log('Teardown');
  }
  //setTimeout(() => console.log('Observable executed'), 1000);;
});


// const observer = {
//   
//     next: x => console.log('Observer got a next value: ' + x),
//     error: err => console.error('Observer got an error: ' + err),
//     complete: () => console.log('Observer got a complete notification'),
//   
// };

console.log('Before subscribtion');
observable$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Observer completed'),
  error: err => console.error(err.message),
});
console.log('After subscribtion');
*/

/*
const obsrevableTimer$ = new Observable<number>(subscriber => {
  //start counter
  let counter = 1;
  const intervaID = setInterval(() => {
    //safe for max 30
    if(counter === 30){
      subscriber.next(counter++);
      subscriber.complete();
    }
    console.log('Emitted: ', counter);
    subscriber.next(counter++);
  }, 2000);

  return () => {
    console.log('Teardown');
    clearInterval(intervaID);
  }
});

const subscription = obsrevableTimer$.subscribe({
  next: value => console.log(value),
  error: err => console.error(err.message),
  complete: () => console.log('Finished'),
})

setTimeout(() => {
  subscription.unsubscribe();
},7000);
*/

/* Cold Observable
const ajax$ = ajax<any>(`${BASE_URL}${RAND_NAME}`);

ajax$.subscribe({
  next: value => console.log('Sub 1:', value.response.first_name)
});

ajax$.subscribe({
  next: value => console.log('Sub 2:', value.response.first_name)
});

ajax$.subscribe({
  next: value => console.log('Sub 3:', value.response.first_name)
});

*/

/* Hot Observable
const helloClick$ = new Observable<PointerEvent>(subscriber => 
{
  helloButton.addEventListener('click', (event: PointerEvent) => {
    subscriber.next(event);
  });

  //we should remove listener here, when unsubscribed. 
});

helloClick$.subscribe(event => console.log('Sub 1:', event.type, event.x, event.y));

setTimeout(()=>{
  helloClick$.subscribe(event => console.log('Sub 2:', event.type, event.x, event.y));
}, 3000);
*/

/* of / from
/// ---- 1
// of('Alice', 'Ben', 'Charlie').subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed')
// });


/// ---- 2
// const names$ = new Observable<string>(subscriber=>{
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// })

// names$.subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed')
// });

/// ---- 3
// ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed')
// });


// function ourOwnOf(...args: string[]): Observable<string> {
//   return new Observable<string>(subscriber => {
//       for(let i = 0; i < args.length; i++){
//         subscriber.next(args[i]);
//       }
//       subscriber.complete();
//     }
//   )
// }

// let names = ['Alice', 'Ben', 'Charlie'];
// from(names).subscribe({
//     next: val => console.log(val),
//     complete: () => console.log('Completed')
// });

// const somePromise = new Promise((resolve, reject) => {
//   //resolve('Resolved!');
//   reject('Resolved!');
// })

// const obsFromPromise$ = from(somePromise);

// obsFromPromise$.subscribe({
//     next: val => console.log(val),
//     complete: () => console.log('Completed'),
//     error: err => console.error('Error:', err)
// });
*/

/* fromEvent
//helloButton
const helloClick$ = fromEvent<MouseEvent>(helloButton, 'click');

const subscription = helloClick$.subscribe(event => {console.log(event.type, event.x, event.y)});

setTimeout(()=> {
  console.log('Unsrubscribe');
  subscription.unsubscribe();
}, 5000);

const helloClick$ = new Observable<MouseEvent>(subscriber => {
  const clickHandlerFn = (event: MouseEvent) => {
    console.log('Event callback executed');
    subscriber.next(event);
  }

  helloButton.addEventListener('click', clickHandlerFn)

  return () => {
    console.log('Teardown');
    helloButton.removeEventListener('click', clickHandlerFn);
  }
});

const subscription = helloClick$.subscribe(event => console.log(event.type, event.x, event.y));

setTimeout(()=> {
  console.log('Unsrubscribe');
  subscription.unsubscribe();
}, 5000);
*/

/* timer
console.log('App started');

// const subcription = timer(2000).subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed')
// });

// setTimeout(() => { subcription.unsubscribe(); }, 1000);

const timer$ = new Observable<number>(subscriber => {
  const timeoutId = setTimeout(() => {
    console.log('Timeout');
    subscriber.next(0);
    subscriber.complete(); 
  }, 2000);

  return () => {
    console.log('Teardown');
    clearTimeout(timeoutId);
  };
});

const subcription = timer$.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Completed')
});

setTimeout(() => { subcription.unsubscribe(); }, 3000);
*/

/* interval
// const subcription = interval(1000).subscribe({
//   next: val => console.log(val++),
//   complete: () => console.log('Completed')
// });

// setTimeout(() => { subcription.unsubscribe(); }, 4000);

const interval$ = new Observable<number>(subscriber => {
  let counter = 0;
  const intervalId = setInterval(() => {
    //console.log('Emitted: ', counter);
    subscriber.next(counter++);
  }, 1000);

  return () => {
    console.log('Teardown');
    clearInterval(intervalId);
  };
});

const subcription = interval$.subscribe({
  next: val => console.log(val++),
  complete: () => console.log('Completed')
});

setTimeout(() => { subcription.unsubscribe(); }, 4000);

*/

/* forkJoin
//Mike is from New Dehli and likes to eat pasta.

// const randomName$ = ajax<any>(`${BASE_URL}${RAND_NAME}`);
// const randomNation$ = ajax<any>(`${BASE_URL}${RAND_NATION}`);
// const randomFood$ = ajax<any>(`${BASE_URL}${RAND_FOOD}`);

randomName$.subscribe((response: any)=> console.log('Name: ', response.response.first_name));
randomNation$.subscribe((response: any)=> console.log('City: ', response.response.capital));
randomFood$.subscribe((response: any)=> console.log('Dish: ', response.response.dish));

// const subcription = forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameAjax, nationAjax, foodAjax]) => console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}`)


const a$ = new Observable<string>(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);

  return () => {
    console.log('A teardown');
  };
});

const b$ = new Observable<string>(subscriber => {
  setTimeout(() => {
    subscriber.error('Failure!');
  }, 3000);

  return () => {
    console.log('B teardown');
  };
});

forkJoin([a$, b$]).subscribe({
  next: val => console.log(val),
  error: err => console.error('Error:', err),
});
*/

/* combineLatest
const temperaturInputEvent$ = fromEvent<InputEvent>(temperatureInput, 'input');
const conversionInputEvent$ = fromEvent<InputEvent>(conversionDropdown, 'input');

combineLatest([temperaturInputEvent$, conversionInputEvent$]).subscribe(
  ([temperatureInputEvent, conversionInputEvent]) => {
    const temperature = (temperatureInputEvent.target as HTMLInputElement).value;
    const conversion = (conversionInputEvent.target as HTMLSelectElement).value;

    let result: number;

    if(!temperature || !conversion) {
      resultText.innerText = 'Please fill the above form';
      return;
    }

    result = conversion === 'f-to-c' ? 
    ((parseFloat(temperature) - 32) * 5) / 9 : 
    (parseFloat(temperature) * 9) / 5 + 32;
    
    // if (conversion === 'f-to-c') {
    //   result = ((parseFloat(temperature) - 32) * 5) / 9;
    // } else {
    //   result = (parseFloat(temperature) * 9) / 5 + 32;
    // }

    resultText.innerText = result.toString();
  }
);
*/

/* Filter
interface NewsItem{
  category: 'Business' | 'Sports' | 'Politics';
  content: string;
}

const newsFeed$ =  new Observable<NewsItem>(subscriber => {
  setTimeout(() => subscriber.next({category: 'Business', content: 'A'}), 1000);
  setTimeout(() => subscriber.next({category: 'Sports', content: 'B'}), 3000);
  setTimeout(() => subscriber.next({category: 'Politics', content: 'C'}), 4000);
  setTimeout(() => subscriber.next({category: 'Sports', content: 'D'}), 6000);
  setTimeout(() => subscriber.next({category: 'Business', content: 'E'}), 7000);
});

const sportsNewsFeed$ = newsFeed$.pipe(filter(newsItem => newsItem.category === 'Sports'));

sportsNewsFeed$.subscribe(newsItem => console.log(newsItem));

// newsFeed$.pipe(
//   filter(newsItem => newsItem.category === 'Sports')
// ).subscribe(
//   newsItem => console.log(newsItem)
// )
*/

/* Map
//Mike is from New Dehli and likes to eat pasta.

const randomFirstName$ = ajax<any>(`${BASE_URL}${RAND_NAME}`).pipe(
  map(response => response.response.first_name)
);
const randomCapital$ = ajax<any>(`${BASE_URL}${RAND_NATION}`).pipe(
  map(response => response.response.capital)
);
const randomDish$ = ajax<any>(`${BASE_URL}${RAND_FOOD}`).pipe(
  map(response => response.response.dish)
);

// randomFirstName$.subscribe(response=> console.log('Name: ', response));
// randomCapital$.subscribe(response=> console.log('City: ', response));
// randomDish$.subscribe(response=> console.log('Dish: ', response));

 const subcription = forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
   ([fistName, capital, dish]) => console.log(`${fistName} is from ${capital} and likes to eat ${dish}`)
 );
*/
 
/* Tap
of(1,6,4,7,8,4,1,5,9).pipe(
  //order in pipe matters.
  //tap(value=> console.log('Spy: ', value)),
  //map(value=> value * 2),
  filter(value=> value > 5),
  tap(value=> console.log('Spy: ', value)),
  map(value=> value * 2),
  tap({ //Possibilities
    next: value => console.log('Spy: ', value),
    complete: () => console.log('Completed'),
    error: err => console.error('Error:', err),
    subscribe: () => console.log('Subscribed'),
    unsubscribe: () => console.log('Unsubscribed'),
    finalize: () => console.log('Finalized'),
  }),
).subscribe(value=> console.log('Output: ', value));
*/

/* debounceTime

fromEvent(sliderInput, 'input').pipe(
  debounceTime(1000),
  map(event => (event.target as HTMLInputElement).value),
).subscribe(event => console.log(event));

*/

/* catchError

const failingHttpRequest$ = new Observable(subscriber => {
  setTimeout(()=> {
    subscriber.error(new Error('Timeout'));
  }, 3000)
});

console.log('App started');

failingHttpRequest$.pipe(
  //catchError(err => of('Fallback value'))
  catchError(err => EMPTY)//empty just completes the observable without any value.
).subscribe({
  next: value => console.log(value),
  error: err => console.error(err.message),
  complete: () => console.log('Completed')
});
*/

/* Flattening operators - concatMap

//// concatMap(value=>observable$);

// const source$ = new Observable(subscriber => {
//   setTimeout(() => subscriber.next('A'), 2000);
//   setTimeout(() => subscriber.next('B'), 5000);
// })
// console.log('App has started!');
// source$.pipe(
//   concatMap(value => of(1, 2))
// ).subscribe(value => console.log(value))

//endpointInput
//fetchButton

console.log('Start Application');
const click$ = fromEvent(fetchButton, 'click');

const subscription = click$.pipe(
  map(() => endpointInput.value),
  //concatMap/mergeMap/switchMap
  concatMap(value => 
    ajax(`${BASE_URL}${value}/random_${value}`).pipe(
      catchError(error => of(`Could not fetch data: ${error}`))
    )
  ),
  //catchError(() => EMPTY) <-- not correct, it will still complete the subscription. 
).subscribe({
  next: value => console.log(value),
  error: err => console.error('Error:', err),
  complete: () => console.log('Completed!')
});

// setTimeout(() => {
//   console.log('Unsubscribed');
//   subscription.unsubscribe()
// }, 15000);
*/

/* Subject | BehaviorSubject
// Subject is hot observable
//  emitButton 
//  inputElement
//  subscribeButton

// const value$ = new Subject<string>();

// //emit values
// fromEvent(emitButton, 'click').pipe(
//   map(() => inputElement.value)
// ).subscribe(
//   value$
//   //() => value$.next(inputElement.value)
// );

// //start new subscription
// fromEvent(subscribeButton, 'click').subscribe(
//   () => {
//     console.log('New Subscription');
//     value$.subscribe(value => console.log(value));
//   }
// )

// const isLoggedIn$ = new Subject<boolean>();

// fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
// fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// // Navigation bar
// isLoggedIn$.subscribe(
//   isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
// )


// // Buttons
// isLoggedIn$.subscribe(isLoggedIn => {
//   logoutButton.style.display = isLoggedIn ? 'block' : 'none';
//   loginButton.style.display = !isLoggedIn ? 'block' : 'none';
// });

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
  isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
)

// Buttons
isLoggedIn$.subscribe(isLoggedIn => {
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = !isLoggedIn ? 'block' : 'none';
});

fromEvent(printStateButton, 'click').pipe(
  withLatestFrom(isLoggedIn$)
).subscribe(
  ([event, isLoggedIn]) => console.log(`User is logged in: `, isLoggedIn)
);  
*/