## Promise.all

Promise.all() is a method that takes an iterable of elements (usually Promises) as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

Source: Promise.all() - JavaScript | MDN

Promise.all() is frequently used when there are multiple concurrent API requests and we want to wait for all of them to have completed to continue with code execution, usually because we depend on data from both responses.

```js
const [userData, postsData, tagsData] = await Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/tags'),
]);
```

Let's implement our own version of Promise.all(), a promiseAll function, with the difference being the function takes in an array instead of an iterable. Be sure to read the description carefully and implement accordingly!

## Example

```js
// Resolved example.
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 100);
});

await promiseAll([p0, p1, p2]); // [3, 42, 'foo']
```

```js
// Rejection example.
const p0 = Promise.resolve(30);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('An error occurred!');
  }, 100);
});

try {
  await promiseAll([p0, p1]);
} catch (err) {
  console.log(err); // 'An error occurred!'
}
```

This is a pretty important question to practice because async programming is frequently tested during interviews. Understanding how Promise.all works under the hood will help you in understanding the mechanisms behind similar Promise-related functions like Promise.race,Promise.any, Promise.allSettled, etc.

## Solution

There are a few aspects to this question we need to bear in mind and handle:

1. Promises are meant to be chained, so the function needs to return a Promise.
2. If the input array is empty, the returned Promise resolves with an empty array.
3. The returned Promise contains an array of resolved values in the same order as the input if all of them are fulfilled.
4. The returned Promise rejects immediately if any of the input values are rejected or throw an error.
5. The input array can contain non-Promises.

## Solution 1: Count unresolved promises using async

Since the function needs to return a Promise, we can construct a Promise at the top level of the function and return it. The bulk of the code will be written within the constructor parameter.

We first check if the input array is empty, and resolve with an empty array if so.

We then need to attempt resolving every item in the input array. This can be achieved using Array.prototype.forEach or Array.prototype.map. As the returned values will need to preserve the order of the input array, we create a results array and slot the value in the right place using its index within the input array. To know when all the input array values have been resolved, we keep track of how many unresolved promises there are by initializing a counter of unresolved values and decrementing it whenever a value is resolved. When the counter reaches 0, we can return the results array.

One thing to note here is that because the input array can contain non-Promise values, if we are not await-ing them, we need to wrap each value with Promise.resolve() which allows us to use .then() on each of them and we don't have to differentiate between Promise vs non-Promise values and whether they need to be resolved.

Lastly, if any of the values are rejected, we reject the top-level Promise immediately without waiting for any other pending promises.

JS

```js
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
```

TS

```ts
type ReturnValue<T> = { -readonly [P in keyof T]: Awaited<T[P]> };

export default function promiseAll<T extends readonly unknown[] | []>(iterable: T): Promise<ReturnValue<T>> {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results as ReturnValue<T>);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results as ReturnValue<T>);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
```

## Solution 2: Count unresolved promises using Promise.then

Here's an alternative version which uses Promise.then() if you prefer not to use async/await.

JS

```js
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          unresolved -= 1;

          if (unresolved === 0) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}
```

Once one of the Promise's resolving functions (resolve or reject) is called, the promise is in the "settled" state, and subsequent calls to either function can neither change the fulfillment value or rejection reason nor change the eventual state from "fulfilled" to "rejected" or vice versa.

## Edge Cases

Empty input array. An empty array should be returned.
If the array contains non-Promise values, they will still be part of the returned array if all the input values are fulfilled.
If the outcome is a rejection, the value of the first rejection should be returned.

## Techniques

Knowledge of Promises, how to construct one, how to use them.
Async programming.

## Notes

The evaluator does not verify that your input array is resolved concurrently rather than sequentially.
