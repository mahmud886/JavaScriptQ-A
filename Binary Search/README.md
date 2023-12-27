## Binary Search

Implement a function that performs binary search on an array of numbers. The function should take in a sorted array of integers and a target integer to find. It returns the index of the target element or -1, if the target element doesn't exist in the array.

#### Examples

```js
binarySearch([1, 2, 3, 6, 9, 11], 6); // 3
binarySearch([1, 2, 3, 12, 16, 14], 5); // -1
```

#### Recap

Binary search is a search algorithm that can efficiently determine if a sorted array of integers contain a specific number. The algorithm repeatedly divides the input array into half until the target element is found, thereby decreasing the search space by half each step. It is a significant improvement versus linear search.

Here is a quick explanation of how binary search works on an array that is already sorted:

- Calculate the middle index of the array and retrieve the middle element.
- If the target element is greater than the middle element, search the right half of the array (ignore the left half).
- If the target element is lesser than the middle element, search the left half of the array.
- If the target element is equal to the middle element, return the index of the element.
- Repeat the steps above until we complete the search. Return -1 if the target was not found.

Binary search is an efficient search algorithm that reduces the search space by half at each step, which means it can find the target element in O(log(n)) time, where n is the size of the input array. This makes it much faster than linear search, which has a time complexity of O(n).

Clarification Questions
If unspecified:

Should the data be sorted in an ascending or descending order?
Should the data be sorted in-place or is it acceptable to use additional data structures?
What kinds of inputs do we need to handle?

- Will it just be an array of integers or should we handle other data types?
- Are there a large number of duplicate elements?
- How should negative numbers be handled?

#### Solution

Note: This question tackles a standard binary search which uses an iterative approach and assumes the array is already sorted. Refer to the 'Notes' section for other alternatives.

```js
/**
 * @param {Array<number>} arr The input integer array to be searched.
 * @param {number} target The target integer to search within the array.
 * @return {number} The index of target element in the array, or -1 if not found.
 */
export default function binarySearch(arr, target) {
  // Initialize the left and right indices of the array
  let left = 0;
  let right = arr.length - 1;

  // Keep searching until the left and right indices meet.
  while (left <= right) {
    // Calculate the mid index to retrieve the mid element later.
    const mid = Math.floor((left + right) / 2);

    if (target < arr[mid]) {
      // If the target element is less than the middle element,
      // search the left half of the array.
      // Adjust the right index so the next loop iteration
      // searches the left side.
      right = mid - 1;
    } else if (target > arr[mid]) {
      // If the target element is greater than the middle element,
      // search the right half of the array.
      // Adjust the left index so the next loop iteration
      // searches the left side.
      left = mid + 1;
    } else {
      // If the target element is equal to the middle element,
      // return the index of the middle element.
      return mid;
    }
  }

  // If the element is not found, return -1.
  return -1;
}
```
