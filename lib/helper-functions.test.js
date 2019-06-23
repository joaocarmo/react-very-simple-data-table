import { getNestedValue, getLastValue } from './helper-functions'

const nestedTestObject = {
  firstLevel: 1,
  second: {
    level: 2,
  },
  array: [1, 2, 3],
}

describe('Examine the function that fetches a nested key', () => {
  it('fetches a first level key', () => {
    expect(getNestedValue(nestedTestObject, ['firstLevel'])).toEqual(1)
  })
  it('fetches a second level key', () => {
    expect(getNestedValue(nestedTestObject, ['second', 'level'])).toEqual(2)
  })
  it('fetches an element from an array', () => {
    expect(getNestedValue(nestedTestObject, ['array', 2])).toEqual(3)
  })
  it('throws on missing arguments', () => {
    expect(() => getNestedValue()).toThrow()
    expect(() => getNestedValue({})).toThrow()
    expect(() => getNestedValue({}, [])).not.toThrow()
  })
  it('throws on invalid arguments', () => {
    expect(() => getNestedValue('object', [])).toThrow()
    expect(() => getNestedValue({}, 'array')).toThrow()
    expect(() => getNestedValue({}, [])).not.toThrow()
  })
})

describe('Examine the function that finds the last value from an array', () => {
  it('returns undefined from an empty array', () => {
    expect(getLastValue([])).toBeUndefined()
  })
  it('returns the last element from a defined array', () => {
    expect(getLastValue([1, 2, 3])).toEqual(3)
  })
  it('does not throw on missing argument', () => {
    expect(() => getLastValue()).not.toThrow()
  })
  it('returns undefined on missing argument', () => {
    expect(getLastValue()).toBeUndefined()
  })
  it('returns undefined on invalid argument', () => {
    expect(getLastValue('array')).toBeUndefined()
  })
})
