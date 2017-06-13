/* @flow */

/* Import PRT objects */
import PRTError from 'prt/error';

/*----------------------------------------------------------------------------*/
test('Inheritance check', () => {
  expect(PRTError.prototype instanceof Error).toBe(true);
  expect((new PRTError()).message).toBe('An error occured');
});
