/**
 * 
    Array-based solution
    The stack abstract data type can be easily implement in JavaScript with JavaScript Arrays. The main thing to note when implementing stacks is that that the operations should be O(1). Thankfully, JavaScript Array's push() and pop() operations are O(1) and the method signatures match the Stack's. Many of the methods are just simple wrappers around Array methods.
 
 */

export default class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * Pushes an item onto the top of the stack.
     * @param {*} item The item to be pushed onto the stack.
     * @return {number} The new length of the stack.
     */
    push(item) {
        return this.items.push(item);
    }

    /**
     * Remove an item at the top of the stack.
     * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
     */
    pop() {
        return this.items.pop();
    }

    /**
     * Determines if the stack is empty.
     * @return {boolean} `true` if the stack has no items, `false` otherwise.
     */
    isEmpty() {
        return this.length() === 0;
    }

    /**
     * Returns the item at the top of the stack without removing it from the stack.
     * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
     */
    peek() {
        return this.isEmpty() ? undefined : this.items[this.length() - 1];
    }

    /**
     * Returns the number of items in the stack.
     * @return {number} The number of items in the stack.
     */
    length() {
        return this.items.length;
    }
}

const stack = new Stack();
stack.isEmpty(); // true
stack.push(1);
stack.push(2);
stack.length(); // 2
stack.push(3);
stack.peek(); // 3
stack.pop(); // 3
stack.isEmpty(); // false

// Edge cases
// Calling pop() on empty stacks.
// Calling peek() on empty stacks.
// Techniques
// Familiarity with JavaScript arrays.
// Object-oriented programming.
