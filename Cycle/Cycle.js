function cycle(...values) {
    let index = 0;

    return () => {
        const currentValue = values[index];
        index = (index + 1) % values.length;

        return currentValue;
    };
}

const helloFn = cycle('hello');
console.log(helloFn()); // "hello"
console.log(helloFn()); // "hello"

const onOffFn = cycle('on', 'off');
console.log(onOffFn()); // "on"
console.log(onOffFn()); // "off"
console.log(onOffFn()); // "on"
