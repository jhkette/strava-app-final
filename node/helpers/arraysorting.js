const _ = require("lodash");
/**
 * 
 * @Function findMaxSubArray
 * @param k - Integer length for subarray
 * @param nums  -[] array of watts values
 * @returns maxSum int
 */



function findMaxSubArray( k, nums){

  let maxSum = 0; // initialise maxsum
  let tempSum = 0; // initialise temp value
  if (!nums.length) return null; // handle edge cases
  if(nums.length < k) return null;
  for(let i = 0; i < k; i++){ // loop up to k to get first max sum value
      maxSum += nums[i]
  }
  tempSum = maxSum;
  for (let i = k; i < nums.length; i++ ){ // loop though nums length from k
      // tempsum - subtract the last value of prior window and the new value to front of window
      tempSum = tempSum - nums[i - k] + nums[i]; 
      // maxSum 
      maxSum = Math.max(maxSum, tempSum) // check if value is bigger than prior maxSum
  }
  return Math.round(maxSum/k); // then we divide by k to get the actual average (power)
}

/**
 * quicksort function  sorts a list
 * this function is from
 * Colt Steele JavaScript Algorithms and Data Structures Masterclass video series on 
 * udemy 
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

module.exports = { findMaxSubArray, quickSort };
