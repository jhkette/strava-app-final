export function quickSort(items) {
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


/**
 * @function sortedIndex
 * @param array []
 * @param value int
 * @returns low int
 */

export function sortedIndex(array, value) {
    let low = 0;
     let high = array.length;

    while (low < high) {
      let mid = Math.floor((low + high)/2);
      if (array[mid] < value) low = mid + 1;
      else high = mid;
    }
    return low;
  }