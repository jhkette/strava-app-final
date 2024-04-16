const _ = require("lodash");
/**
 * https://sunjetliu.medium.com/algorithm-practice-find-averages-of-subarrays-db9108c0d55e
 * Function findAverages
 * @param n - Integer length for average
 * @param array  -[] array of watts values
 * @returns averages []
 */

function findAverages(n, array) {
  // if n is bigger than arrayay length return null
  if (n > array.length) {
    return null;
  }
  // store average in arrayay
  const averages = [];
  let windowSum = 0.0, // initalise windowSum and windowStart values
    windowStart = 0;
  for (let windowEnd = 0; windowEnd < array.length; windowEnd++) { // start loop
    windowSum += array[windowEnd]; // add the next element
    if (windowEnd >= n - 1) { // if windowend = n-1 ie the length we are looking for
      averages.push(windowSum / n); // add the average to results
      // we subtract from the sum the first item in the window - as the window is moving one up
      windowSum -= array[windowStart]; 
      windowStart += 1; // move window start up one
    }
  }
  return averages; // return the array of averages
}

/**
 * quicksort function  sorts a list using
 * quick sort algorithm
 * @param items[]
 * @returns []
 */

function quickSort(items) {
  // terminate execution and return array if empty
  // or containing one elemrnt
  if (items.length <= 1) return items;

  // set the pivot to the last item on the list
  const pivot = items[items.length - 1];

  // create temporary contaners
  const leftItems = [];
  const rightItems = [];

  // loop through the array to put the pivot in its sorted position
  for (const item of items.slice(0, items.length - 1)) {
    if (item > pivot) {
      rightItems.push(item);
    } else {
      leftItems.push(item);
    }
  }

  // repeat same processes above on both partition
  // until every item is at its sorted position
  return [...quickSort(leftItems), pivot, ...quickSort(rightItems)];
}

module.exports = { findAverages, quickSort };
