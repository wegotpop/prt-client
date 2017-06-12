// @flow
import  PRTError from '../error';

test('Error as message', () => {
  const error = new PRTError();
  expect(error.message).toBe('An error occured');
});
