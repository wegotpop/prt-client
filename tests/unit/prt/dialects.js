/* @flow */

/* Import PRT objects */
import PRTDialectV2_0 from 'prt/v2/dialect';
import registerPRTDialectByNameAndVersion, {
  getPRTDialectByNameAndVersion,
  PRTInvalidDialectNameType,
  PRTInvalidDialectVersion,
  PRTAlreadyRegisteredDialect,
  PRTInvalidDialectType
} from 'prt/dialects';


/*----------------------------------------------------------------------------*/
class TestDialect extends PRTDialectV2_0 {}


/*----------------------------------------------------------------------------*/
test('Valid registration', () => {
  const reference = 'test';
  const version   = '2.0';
  registerPRTDialectByNameAndVersion(reference, version, TestDialect);
  expect(
    getPRTDialectByNameAndVersion(reference, version) instanceof TestDialect)
    .toBe(true);
});


/*----------------------------------------------------------------------------*/
test('Invalid registration', () => {
  expect(() => registerPRTDialectByNameAndVersion())
    .toThrow(PRTInvalidDialectNameType);
  expect(() => registerPRTDialectByNameAndVersion(12))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => registerPRTDialectByNameAndVersion(true))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => registerPRTDialectByNameAndVersion([]))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => registerPRTDialectByNameAndVersion({}))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => registerPRTDialectByNameAndVersion(() => null))
    .toThrow(PRTInvalidDialectNameType);

  expect(() => registerPRTDialectByNameAndVersion('version too high', '3.0'))
    .toThrow(PRTInvalidDialectVersion);

  const register = () =>
    registerPRTDialectByNameAndVersion('reference', '2.0', TestDialect);
  register();
  expect(() => register()).toThrow(PRTAlreadyRegisteredDialect);

  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0'))
    .toThrow(PRTInvalidDialectType);
  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0', 12))
    .toThrow(PRTInvalidDialectType);
  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0', true))
    .toThrow(PRTInvalidDialectType);
  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0', []))
    .toThrow(PRTInvalidDialectType);
  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0', {}))
    .toThrow(PRTInvalidDialectType);
  expect(() => registerPRTDialectByNameAndVersion('hello', '2.0', () => null))
    .toThrow(PRTInvalidDialectType);
});


/*----------------------------------------------------------------------------*/
test('Invalid retrieve', () => {
  expect(() => getPRTDialectByNameAndVersion())
    .toThrow(PRTInvalidDialectNameType);
  expect(() => getPRTDialectByNameAndVersion(12))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => getPRTDialectByNameAndVersion(true))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => getPRTDialectByNameAndVersion([]))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => getPRTDialectByNameAndVersion({}))
    .toThrow(PRTInvalidDialectNameType);
  expect(() => getPRTDialectByNameAndVersion(() => null))
    .toThrow(PRTInvalidDialectNameType);

  expect(() => getPRTDialectByNameAndVersion('version is too low', '1.0'))
    .toThrow(PRTInvalidDialectVersion);
  expect(() => getPRTDialectByNameAndVersion('version is too high', '3.0'))
    .toThrow(PRTInvalidDialectVersion);
  expect(() => getPRTDialectByNameAndVersion('does not exist', '2.0'))
    .toThrow(PRTInvalidDialectVersion);
});
