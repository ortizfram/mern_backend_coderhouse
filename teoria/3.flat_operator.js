// .flat() operator

const nestedArray = [1, 2, [3, 4, [5, 6]]];

const flattenedArray = nestedArray.flat();
// Result: [1, 2, 3, 4, [5, 6]]


const completelyFlattenedArray = nestedArray.flat(Infinity);
// Result: [1, 2, 3, 4, 5, 6]
