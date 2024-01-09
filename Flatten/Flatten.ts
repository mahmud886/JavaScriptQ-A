// Solution: 1;
type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  const res = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();
    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      res.push(item);
    }
  }

  return res;
}

// Solution: 2
type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}

// Solution: 3
type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  return value.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
}
