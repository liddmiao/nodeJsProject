const { TestResult } = require("@jest/types");

test('indexJs', () => {
  const str = require('../index')
  expect(str).toBe('hello world')
})