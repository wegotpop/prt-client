/* @flow */

/* Import PRT objects */
import parseVersionString, {
  PRTInvalidVersionType,
  PRTInvalidVersionString
} from 'prt/version';


/*----------------------------------------------------------------------------*/
test('Valid strings', () => {
  const [major, minor, other] = parseVersionString('0.8');
  expect(major).toBe(0);
  expect(minor).toBe(8);
  expect(other).toBe(undefined);
});


/*----------------------------------------------------------------------------*/
test('Invalid strings', () => {
  expect(() => parseVersionString('')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('_')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('.')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('0.')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('.0')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('_._')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('-2.0')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('2.-1')).toThrow(PRTInvalidVersionString);
  expect(() => parseVersionString('1.2.3')).toThrow(PRTInvalidVersionString);
});


/*----------------------------------------------------------------------------*/
test('Invalid inputs', () => {
  expect(() => parseVersionString()).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString(0)).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString(2.8)).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString(true)).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString([])).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString({})).toThrow(PRTInvalidVersionType);
  expect(() => parseVersionString(() => null)).toThrow(PRTInvalidVersionType);
});
