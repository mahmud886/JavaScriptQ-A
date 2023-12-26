## Deep Clone

The term "deep clone" is not formally defined in JavaScript's language specification, but is generally well understood in the community. A deep clone makes a copy of JavaScript value, leading to a completely new value that has no references pointing back to the properties in the original object (if it's an object). Any changes made to the deep-copied object will not affect the original object.

Implement a deepClone function that performs a deep clone operation on JavaScript objects. You can assume the input only contains JSON-serializable values (null, boolean, number, string, Array, Object) and will not contain any other objects like Date, Regex, Map or Set.

### Example

```js
const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.
```

### Solution

Writing out a complete deep clone solution from scratch is almost impossible under typical interview constraints. In typical interview settings, the scope is fairly limited, and interviewers are more interested in how you would detect different data types and your ability to leverage various built-in APIs and Object methods to traverse a given object.

#### Solution 1: JSON.stringify

The easiest (but flawed) way to deep copy an object in JavaScript is to first serialize it and then deserialize it back via JSON.stringify and JSON.parse.

```js
export default function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}
```

-   Although this approach is acceptable given the input object only contains null, boolean, number, string, you should be aware of the downsides of this approach:

-   We can only copy non-symbol-keyed properties whose values are supported by JSON. Unsupported data types are simply ignored.
    JSON.stringify also has other a few surprising behaviors such as converting Date objects to ISO timestamp strings, NaN and Infinity becoming null etc.
-   Obviously, your interviewer will not allow you to use this.

#### Solution 2: Recursion

Here is a solution that doesn't rely on JSON.stringify and JSON.parse.

#### JS

```js
/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item));
    }

    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, deepClone(value)]));
}
```

##### TS

```ts
export default function deepClone<T>(value: T): T {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item)) as T;
    }

    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, deepClone(value)])) as T;
}
```
