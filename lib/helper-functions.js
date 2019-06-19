// Pure JavaScript helper functions

// Usage: getNestedValue({ a: { b: 1 } }, ['a', 'b']) => 1
export function getNestedValue(nestedObj, pathArr) {
  return pathArr.reduce((obj, key) => (
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined
  ), nestedObj)
}

// Usage: getLastValue([3, 2, 1]) => 1
export function getLastValue(arr) {
  if (!Array.isArray(arr)) return undefined
  return arr[arr.length - 1]
}
