/* @flow */

/* Import PRT objects */
import PRTDialect from 'prt/v2/dialect';

/*----------------------------------------------------------------------------*/
const dialect = new PRTDialect();


/*----------------------------------------------------------------------------*/
test('Identifier to XML', () => {
  expect(dialect.identifierToElement()).toBe('');
  expect(dialect.identifierToElement(12)).toBe('12');
});


/*----------------------------------------------------------------------------*/
test('XML to Identifier', () => {
  expect(dialect.tagNameToIdentifier()).toBe(0xBAD);
  expect(dialect.tagNameToIdentifier('div')).toBe(0xBAD);
});


/*----------------------------------------------------------------------------*/
test('Attribute to XML', () => {
  expect(dialect.attributeToProp()).toEqual(['', '']);
  expect(dialect.attributeToProp(12)).toEqual(['', '']);
  expect(dialect.attributeToProp(0, 'x')).toEqual(['x', '']);
  expect(dialect.attributeToProp(0, 'x', 'y')).toEqual(['x', 'y']);
  expect(
    dialect.attributeToProp(0, true, Infinity)).toEqual(['true', 'Infinity']);
});


/*----------------------------------------------------------------------------*/
test('XML to Attribute', () => {
  expect(dialect.propToAttribute()).toEqual(['', '']);
  expect(dialect.propToAttribute(12)).toEqual(['', '']);
  expect(dialect.propToAttribute(0, 'x')).toEqual(['x', '']);
  expect(dialect.propToAttribute(0, 'x', 'y')).toEqual(['x', 'y']);
  expect(
    dialect.propToAttribute(0, true, Infinity)).toEqual(['true', 'Infinity']);
});
