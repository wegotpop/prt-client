/* @flow */

/* Import PRT objects */
import PRTDialect from 'prt/v2/dialect';

/*----------------------------------------------------------------------------*/
const dialect = new PRTDialect();


/*----------------------------------------------------------------------------*/
test('Identifier to XML', () => {
  expect(dialect.identifierToXml()).toBe('');
  expect(dialect.identifierToXml(12)).toBe('12');
});


/*----------------------------------------------------------------------------*/
test('XML to Identifier', () => {
  expect(dialect.xmlToIdentifier()).toBe(0xBAD);
  expect(dialect.xmlToIdentifier('div')).toBe(0xBAD);
});


/*----------------------------------------------------------------------------*/
test('Attribute to XML', () => {
  expect(dialect.attributeToXml()).toEqual(['', '']);
  expect(dialect.attributeToXml(12)).toEqual(['', '']);
  expect(dialect.attributeToXml(0, 'x')).toEqual(['x', '']);
  expect(dialect.attributeToXml(0, 'x', 'y')).toEqual(['x', 'y']);
  expect(
    dialect.attributeToXml(0, true, Infinity)).toEqual(['true', 'Infinity']);
});


/*----------------------------------------------------------------------------*/
test('XML to Attribute', () => {
  expect(dialect.xmlToAttribute()).toEqual(['', '']);
  expect(dialect.xmlToAttribute(12)).toEqual(['', '']);
  expect(dialect.xmlToAttribute(0, 'x')).toEqual(['x', '']);
  expect(dialect.xmlToAttribute(0, 'x', 'y')).toEqual(['x', 'y']);
  expect(
    dialect.xmlToAttribute(0, true, Infinity)).toEqual(['true', 'Infinity']);
});
