

// https://www.geeksforgeeks.org/smallest-subarray-from-a-given-array-with-sum-greater-than-or-equal-to-k/

// JavaScript code to implement the above idea
 
/**
 * @function getShortestSubarray
 * @param {*} A 
 * @param {*} X 
 * @returns float
 */
function getShortestSubarray(A, X) {
    let ans = Number.MAX_VALUE; // 
    const n = A.length;
    // Array to store prefix sums
    const prefixSum = new Array(n).fill(0);
    // Deque storing index of increasing order prefix sums
    const deque = [];
    // loop through the array finding the prefix sum of the array and adding to an array
    for (let i = 0; i < n; i++) {
        prefixSum[i] = A[i] + (i === 0 ? 0 : prefixSum[i - 1]); // add sum to prefix sum, continue adding throughoutloop
        if (prefixSum[i] >= X) { // if prefix sum i is greater than the X assign as answer
            ans = Math.min(ans, i + 1); // answer is is the minumum between i +i or ans
        }
    }
    // loop through prefix sum array
    for (let i = 0; i < n; i++) {
        // Check if prefixsum - sum in deque is equal to target - if so assign to ans
        while (deque.length > 0 && prefixSum[i] - prefixSum[deque[0]] >= X) {
            ans = Math.min(ans, i - deque[0]);
            deque.shift();
        }
 
        // Make the deque store prefix sums in increasing order
        // if prexix sum index at end of deque is greater than prefixSum[i] - pop deque index
        while (deque.length > 0 && prefixSum[deque[deque.length - 1]] >= prefixSum[i]) {
            deque.pop();
        }
        deque.push(i);
    }
    return ans === Number.MAX_VALUE ? null : ans;
}



function runDistance(numbers){
   
    // slice(1) gets all but the first element. 
    // map returns a new value for each of those, and the value 
    //returned is the difference between the element and the corresponding 
    // element in A

    const distances = numbers.slice(1).map((v, i) => (v - numbers[i]).toFixed(1)).map(Number);
   
    return distances
  }


module.exports = {runDistance, getShortestSubarray}