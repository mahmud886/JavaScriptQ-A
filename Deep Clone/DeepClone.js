// Solution 1: JSON.stringify
// export default
function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

// Solution 2: Recursion

function deepClone(value) {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item));
    }

    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, deepClone(value)]));
}

const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

console.log(clonedObj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);
console.log(clonedObj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.

console.log(clonedObj1);
console.log(clonedObj2);
