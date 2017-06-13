/* @flow */

/*----------------------------------------------------------------------------*/
type IsObject = (any) => bool;
export const isObject: IsObject = o =>
  Object.prototype.toString.call(o) === '[object Object]';
