/* @flow */

/*----------------------------------------------------------------------------*/
type IsObject = (any) => boolean;
export const isObject: IsObject = o =>
  Object.prototype.toString.call(o) === '[object Object]';
