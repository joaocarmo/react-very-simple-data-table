// Pure JavaScript helper functions

// Usage: err('string')

const err = (msg) => { throw Error(msg) }

// Usage: getNestedValue({ a: { b: 1 } }, ['a', 'b']) => 1
export function getNestedValue(
  nestedObj = err('Nested object is undefined'),
  pathArr = err('Path array is undefined'),
) {
  if (typeof nestedObj !== 'object') {
    throw new Error('The first argument should be an object')
  }
  if (!Array.isArray(pathArr)) {
    throw new Error('The second argument should be an array')
  }
  return pathArr.reduce((obj, key) => (
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined
  ), nestedObj)
}

// Usage: getLastValue([3, 2, 1]) => 1
export function getLastValue(arr) {
  if (!Array.isArray(arr)) return undefined
  return arr[arr.length - 1]
}
