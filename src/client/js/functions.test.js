const addition = require("./functions");

test("Test addition on Functions func", () => {
  expect(addition.formula(4, 4)).toBe(8);
});

test("Test addition on Func not to be", () => {
  expect(addition.formula(4, 4)).not.toBe(10);
});
