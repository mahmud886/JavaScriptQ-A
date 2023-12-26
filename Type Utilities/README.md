## Implement the following utility functions to determine the types of primitive values.

-   JavaScript is a dynamically typed language, which means the types of variable can be changed during runtime. Many interview questions involve recursion of values that contain values of different types and how to handle each value type differs according to the type (e.g. different code is needed to iterate over an array vs an object). Knowledge of handling the JavaScript types is crucial to solving questions like Deep Clone and Deep Equal.

-   In this question, we will implement the following utility functions to determine the types of primitive values.

-   isBoolean(value): Return true if value is a boolean, false otherwise.
-   isNumber(value): Return true if value is a number, false otherwise. Note that - NaN is considered a number.
-   isNull(value): Return true if value is null, false otherwise.
-   isString(value): Return true if value is a String, else false.
-   isSymbol(value): Return true if value is a Symbol primitive, else false.
-   isUndefined(value): Return true if value is undefined, else false.

## Solution

-   Implementing these utility functions won't be an entire interview question itself, but you likely need to implement some of these utility functions as part of solving more complex interview questions.

-   Most of the functions involve only one line and you might not even need to write a separate function for a single line of logic. The more important thing here is to know how to check for each data type.

-   It's also important to note the difference between null and undefined. null == undefined is true, so we need to use === if the intention is to checking for exact null and undefined values.
