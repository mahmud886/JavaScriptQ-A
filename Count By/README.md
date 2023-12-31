## Count By

Implement a function countBy(array, iteratee) that creates an object composed of keys generated from the results of running each element of array thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. iteratees can either be:

- Functions: iteratee functions is invoked with one argument: (value).

- Strings: The property of an object. E.g. 'length' can be used to return the number of elements of arrays.

```js
countBy(array, iteratee);
```

## Arguments

array (Array): The array to iterate over.
iteratee (Function): The iteratee function to transform elements. The function is invoked with one argument: (value).

## Returns

(Object): Returns the composed aggregate object.

## Examples

JS

```js
countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }

countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

## Solution

1. Create an empty results object to store the count of occurrences of each key.
2. Determine the iteratee function. If iteratee is already a function, we can use it as-is. Otherwise, if a string value was provided, a function is created to access that property on an element.
3. Iterate through the array and determine the key for each element by calling iteratee(element). If the key does not exist within the results object, set the value for that key to 0. Next we can increment the value for that key.

JS

```js
/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The function invoked per iteration.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function countBy(array, iteratee) {
  const result = {};
  const iterateeFunc = typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  for (const element of array) {
    const key = iterateeFunc(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
```

TS

```ts
type IterateeFn<T> = (value: T) => number | string;

export default function countBy<T>(array: Array<T>, iteratee: IterateeFn<T> | string): Record<string, number> {
  const result: Record<string, number> = {};
  const iterateeFunc: IterateeFn<T> = typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  for (const element of array) {
    const key = iterateeFunc(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
```

An alternative way to increment the result counter is to use the nullish coalescing assignment operator to set the value to 0 if key doesn't exist within result. Note that using nullish coalescing assignment operator means you might be accessing inherited properties, which is not desired, but since the object is created via Object.create(null), there will not be inherited properties and is safe to use.

JS

```js
/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The function invoked per iteration.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function countBy(array, iteratee) {
  const result = Object.create(null);

  for (const element of array) {
    const key = typeof iteratee === 'function' ? iteratee(element) : element[iteratee];
    result[key] ??= 0;
    result[key]++;
  }

  return result;
}
```
