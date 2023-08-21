// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// console.log('test');

// const measureKelvin = function () {
//   const measurment = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees, celsius')),
//   };

//   console.table(measurment);

//   debugger;
//   const kelvin = measurment.value + 273;
//   return kelvin;
// };

// //writing debugger; will open debug on window

// console.log(measureKelvin());
// console.warn('Warning');
// console.error('Error');

const printForecast = function (arr) {
  let value = '...';
  for (let i = 0; i < arr.length; i++) {
    value += ` ${arr[i]}°C in ${i + 1} days ...`; //Alt 0176 for °
  }
  return value;
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
