/* @flow */

/* Import PRT objects */
import { isObject } from 'prt/utils';


/*----------------------------------------------------------------------------*/
test('Input is object', () => {
  expect(isObject({})).toBe(true);
  expect(isObject(new Object())).toBe(true);
  expect(isObject(new (function () {}))).toBe(true);
});


/*----------------------------------------------------------------------------*/
test('Input is not an Object', () => {
  expect(isObject()).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject(0)).toBe(false);
  expect(isObject(true)).toBe(false);
  expect(isObject('hello')).toBe(false);
  expect(isObject([])).toBe(false);
  expect(isObject(new Array())).toBe(false);
  expect(isObject(new Function())).toBe(false);
  expect(isObject(Object)).toBe(false);
});
