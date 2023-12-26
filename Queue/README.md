## Implement a queue data structure in JavaScript that contains the following operations:

-   new Queue(): Creates an instance of a Queue class that doesn't contain any items. The constructor does not accept any arguments.
-   enqueue(): Adds an item to the back of the queue. Required time complexity: O(1).
-   dequeue(): Removes an item from the front of the queue. Required time complexity: O(1).
-   isEmpty(): Determines if the queue is empty. Required time complexity: O(1).
-   front(): Returns the item at the front of the queue without removing it from the queue. Required time complexity: O(1).
-   back(): Returns the item at the back of the queue without removing it from the queue. Required time complexity: O(1).
-   length(): Returns the number of items in the queue. Required time complexity: O(1).

## Example

```js
const queue = new Queue();
queue.isEmpty(); // true
queue.enqueue(1);
queue.enqueue(2);
queue.length(); // 2
queue.enqueue(3);
queue.front(); // 1
queue.back(); // 3
queue.dequeue(); // 1
queue.isEmpty(); // false
```

## Solution

Queues should be implemented with linked lists which are essentially a chain of connected nodes. To simplify handling of linked list manipulation of empty queues, we make use of doubly-linked lists (nodes have both prev and next pointers) and dummy/sentinel head/tail nodes. With the usage of dummy nodes, the linked list will never be "empty" and we don't have to separately handle the case of enqueuing into empty queues and dequeuing a queue with only one item.

-   enqueue()-ing involves creating a new Node and adding it between the \_dummyTail node and \_dummyTail.next (which is \_dummyHead in the case of empty queues).

-   dequeue()-ing involves removing the node between the \_dummyHead node and \_dummyHead.prev. This should be a no-op if the queue is empty otherwise \_dummyTail will get dequeued.

-   Since the time complexity of length() has to be O(1) and counting the number of items in a linked list will take O(n), we need to separately track the number of items in the list with a \_length instance property and update it within the enqueue() and dequeue() methods.

-   Note that the autograder doesn't check if the time complexity of your enqueue() and dequeue() operations are O(1), but if you're only using a single JavaScript array to solve this question, then it's almost certainly not achieving O(1) time complexity for either of those operations.
