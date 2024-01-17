## Topological Sort

Implement a function that performs a topological sort on a directed graph (in adjacency list format), where the keys represent nodes and values are an array of nodes that have an outgoing edge to the current node.

## Example

```js
const graph1 = {
    A: ['B', 'C'],
    B: ['C', 'D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: [],
};
topologicalSort(graph1); // ['A', 'B', 'C', 'D', 'E', 'F']

const graph2 = {
    A: ['B', 'C'],
    B: ['C', 'D'],
    C: ['D'],
    D: ['E'],
    E: ['F'],
    F: [],
};
topologicalSort(graph2); // ['A', 'B', 'C', 'D', 'E', 'F']

const graph3 = {
    A: [],
    B: ['A'],
    C: ['B'],
    D: ['C'],
    E: ['D'],
    F: ['E'],
};
topologicalSort(graph3); // ['F', 'E', 'D', 'C', 'B', 'A']
```

Note that there can be multiple valid topological orderings for a directed graph, but for our test cases there is only one valid solution.

A Queue data structure is also provided for you at the bottom of the skeleton code.

## Recap

Topological sort is an algorithm which is used to sort the elements of a directed acyclic graph (DAG) in a linear order such that the order respects the order defined by edges within the graph.

The easy way to understand this is to think of the nodes of a graph as tasks, and an edge from node A to node B represents that node B has a dependency on node A. What a topological sort does is to produce an array of nodes out of the graph such that the order of nodes in the array respects all the dependencies defined in the graph.

Why is it that a topological sort only works on DAGs and not any graph? This is because the graph has to have directed edges in order to represent dependencies, and acyclic (no cycles) because any cycles would represent an unresolvable dependency between nodes.

Topological sorting is often used in scheduling problems, such as scheduling tasks with dependencies, or in compilation, where the order of compilation is determined by the dependencies between modules.

There are many ways to implement topological sort, but one simple and intuitive way is using the Kahn's algorithm, which works as follows:

1. Initialize a queue and a list to store the sorted nodes.
2. For each node in the graph, if it has no incoming edges, add it to the queue.
3. While the queue is not empty:
4. Dequeue a node from the front of the queue.
5. Add this node to the list of sorted nodes.
6. For each child of this node, decrease its in-degree (the number of incoming edges) by 1.
7. If a child's in-degree becomes 0, add it to the queue.
8. If the length of the sorted list is less than the number of nodes in the graph, this means that there is a cycle in
   the graph, and no topological ordering is possible.

Topological sort is an algorithm that produces a linear ordering of the vertices of a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. Topological sort implemented with Kahn's algorithm has linear time complexity, which makes it relatively efficient for large graphs.

## Clarification Questions

If unspecified:

-   Input and output format:
    -   Should the input graph be represented as an adjacency matrix, adjacency list, or some other data structure?
    -   Should the output be a list of nodes in topological order or an array of integers representing the topological order of the nodes?

## Solutions

JS

```js
/**
 * @param {Object} graph Node to array of neighboring nodes.
 * @return {Array<string>} A topological traversal of nodes.
 */
export default function topologicalSort(graph) {
    // Initialize a Map object to store each node's incoming and outgoing edges,
    // an array to store the output topological sort order,
    // and a Queue object to store nodes to be processed
    const nodes = new Map();
    const queue = new Queue();
    const order = [];

    // Iterating over all the keys in the input graph object
    // add each key to the "nodes" Map object
    // with properties "in" with value 0
    // and "out" with the value of set of neighboring nodes.
    Object.keys(graph).forEach((node) => {
        nodes.set(node, { in: 0, out: new Set(graph[node]) });
    });

    // Set the Map with the correct `in` values.
    // Iterating over all the keys in the input graph object,
    // for each node increase the `in` property of its neighbor node by 1.
    Object.keys(graph).forEach((node) => {
        graph[node].forEach((neighbor) => {
            nodes.get(neighbor).in += 1;
        });
    });

    // Iterate over the nodes and add all the nodes with `in: 0` to the queue.
    nodes.forEach((value, node) => {
        if (value.in === 0) {
            queue.enqueue(node);
        }
    });

    // While queue is not empty.
    while (queue.length()) {
        // Dequeue a node from the front of the queue.
        const node = queue.dequeue();

        // For each neighbor of this dequeued node decrease its `in` property by 1,
        // if the `in` becomes 0, enqueue the neighbor node.
        nodes.get(node).out.forEach((neighbor) => {
            nodes.get(neighbor).in -= 1;
            if (nodes.get(neighbor).in === 0) {
                queue.enqueue(neighbor);
            }
        });

        // Add the dequeued node to the output array.
        order.push(node);
    }

    // Return topological-ordered array if it has the same length as
    // the number of keys in the graph, otherwise there is a cycle
    // and we return an empty array.
    return order.length === Object.keys(graph).length ? order : [];
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Queue {
    constructor() {
        this._dummyHead = new Node();
        this._dummyTail = new Node();
        this._dummyHead.prev = this._dummyTail;
        this._dummyTail.next = this._dummyHead;
        this._length = 0;
    }

    /**
     * Adds an item to the back of the queue.
     * @param {*} item The item to be pushed onto the queue.
     * @return {number} The new length of the queue.
     */
    enqueue(item) {
        const node = new Node(item);
        const prevLast = this._dummyTail.next;
        prevLast.prev = node;

        node.next = prevLast;
        node.prev = this._dummyTail;
        this._dummyTail.next = node;
        this._length++;
        return this._length;
    }

    /**
     * Remove an item from the front of the queue.
     * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const node = this._dummyHead.prev;
        const newFirst = node.prev;
        this._dummyHead.prev = newFirst;
        newFirst.next = this._dummyHead;
        // Unlink the node to be dequeued.
        node.prev = null;
        node.next = null;
        this._length--;
        return node.value;
    }

    /**
     * Determines if the queue is empty.
     * @return {boolean} `true` if the queue has no items, `false` otherwise.
     */
    isEmpty() {
        return this._length === 0;
    }

    /**
     * Returns the item at the front of the queue without removing it from the queue.
     * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
     */
    front() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this._dummyHead.prev.value;
    }

    /**
     * Returns the item at the back of the queue without removing it from the queue it.
     * @return {*} The item at the back of the queue if it is not empty, `undefined` otherwise.
     */
    back() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this._dummyTail.next.value;
    }

    /**
     * Returns the number of items in the queue.
     * @return {number} The number of items in the queue.
     */
    length() {
        return this._length;
    }
}
```

TS

```ts
export default function topologicalSort(graph: Record<string, Array<string>>): Array<string> {
    // Initialize a Map object to store each node's incoming and outgoing edges,
    // an array to store the output topological sort order,
    // and a Queue object to store nodes to be processed
    const nodes = new Map<string, { in: number; out: Set<string> }>();
    const queue = new Queue<string>();
    const order = [];

    // Iterating over all the keys in the input graph object
    // add each key to the "nodes" Map object
    // with properties "in" with value 0
    // and "out" with the value of set of neighboring nodes.
    Object.keys(graph).forEach((node) => {
        nodes.set(node, { in: 0, out: new Set(graph[node]) });
    });

    // Set the Map with the correct `in` values.
    // Iterating over all the keys in the input graph object,
    // for each node increase the `in` property of its neighbor node by 1.
    Object.keys(graph).forEach((node) => {
        graph[node].forEach((neighbor) => {
            nodes.get(neighbor)!.in += 1;
        });
    });

    // Iterate over the nodes and add all the nodes with `in: 0` to the queue.
    nodes.forEach((value, node) => {
        if (value.in === 0) {
            queue.enqueue(node);
        }
    });

    // While queue is not empty.
    while (queue.length()) {
        // Dequeue a node from the front of the queue.
        const node = queue.dequeue()!;

        // For each neighbor of this dequeued node decrease its `in` property by 1,
        // if the `in` becomes 0, enqueue the neighbor node.
        nodes.get(node)?.out.forEach((neighbor) => {
            nodes.get(neighbor)!.in -= 1;
            if (nodes.get(neighbor)!.in === 0) {
                queue.enqueue(neighbor);
            }
        });

        // Add the dequeued node to the output array.
        order.push(node);
    }

    // Return topological-ordered array if it has the same length as
    // the number of keys in the graph, otherwise there is a cycle
    // and we return an empty array.
    return order.length === Object.keys(graph).length ? order : [];
}

class Node<T> {
    value: T | undefined;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(value?: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Queue<T> {
    _dummyHead: Node<T>;
    _dummyTail: Node<T>;
    _length: number;

    constructor() {
        this._dummyHead = new Node<T>();
        this._dummyTail = new Node<T>();
        this._dummyHead.prev = this._dummyTail;
        this._dummyTail.next = this._dummyHead;
        this._length = 0;
    }

    /**
     * Adds an item to the back of the queue.
     */
    enqueue(item: T) {
        const node = new Node(item);
        const prevLast = this._dummyTail.next;
        prevLast!.prev = node;

        node.next = prevLast;
        node.prev = this._dummyTail;
        this._dummyTail.next = node;
        this._length++;
        return this._length;
    }

    /**
     * Remove an item from the front of the queue.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const node = this._dummyHead.prev;
        const newFirst = node!.prev;
        this._dummyHead.prev = newFirst;
        newFirst!.next = this._dummyHead;
        // Unlink the node to be dequeued.
        node!.prev = null;
        node!.next = null;
        this._length--;
        return node!.value;
    }

    /**
     * Determines if the queue is empty.
     */
    isEmpty(): boolean {
        return this._length === 0;
    }

    /**
     * Returns the item at the front of the queue without removing it from the queue.
     */
    front(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        return this._dummyHead.prev!.value;
    }

    /**
     * Returns the item at the back of the queue without removing it from the queue it.
     */
    back(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        return this._dummyTail.next!.value;
    }

    /**
     * Returns the number of items in the queue.
     * @return {number} The number of items in the queue.
     */
    length(): number {
        return this._length;
    }
}
```

## Edge Cases

-   Graph with no edges: Either return an empty array or an appropriate error message.
-   Graph with cycles: Return an error or an empty array.

## Time Complexity

Topological sort implemented with Kahn's algorithm always runs with O(V + E) time complexity, where V is the number of vertices (or nodes) in the graph, and E is the number of edges in the graph.

-   The loop that initializes the Map object to store every node's incoming and outgoing edges has a time complexity of O(V), since it visits all the vertices (nodes) of the graph once.
-   The loop that iterates over all the keys in the input graph and for each node increases the in property of its neighbor node by 1, has a time complexity of O(E), since it's visiting all the edges of the graph once.
-   The loop that iterates over the nodes, adding all the nodes with in: 0 to the queue, has a time complexity of O(V) as well, since it's visiting all the vertices of the graph once.
-   The while loop that iterates until the queue is not empty, has a maximum time complexity of O(V + E) as it is processing all the vertices and edges of the graph.
    Overall, the time complexity of the implementation of Kahn's algorithm is O(V + E).

## Space Complexity

The space complexity for topological sorting implemented with Kahn's algorithm is O(V + E), where V is the number of vertices (or nodes) in the graph, and E is the number of edges in the graph.

-   The Map data structure "nodes" stores properties of each node and takes O(V) space.
-   The output array "order" takes O(V) space as it stores the topological order of all the nodes.
-   The Queue data structure "queue" stores nodes with in-degree equals 0 which requires space linear to the input data and hence takes O(V) space.
    The space complexity of the algorithm is therefore O(V + E).
