/* @flow */

/* Import PRT objects */
import PRTPOPDialect,
       { PRTPOPInvalidIdentifier,
         PRTPOPInvalidXMLTag,
         PRTPOPInvalidAttribute,
         PRTPOPInvalidXMLAttribute } from 'prt/v2/dialects/pop/dialect';


/*----------------------------------------------------------------------------*/
const dialect = new PRTPOPDialect();


/*----------------------------------------------------------------------------*/
test('Valid identifiers to XML tags', () => {
  expect(dialect.identifierToXml(0x00)).toBe('a');
  expect(dialect.identifierToXml(0x01)).toBe('b');
  expect(dialect.identifierToXml(0x02)).toBe('code');
  expect(dialect.identifierToXml(0x03)).toBe('h1');
  expect(dialect.identifierToXml(0x04)).toBe('h2');
  expect(dialect.identifierToXml(0x05)).toBe('h3');
  expect(dialect.identifierToXml(0x06)).toBe('h4');
  expect(dialect.identifierToXml(0x07)).toBe('h5');
  expect(dialect.identifierToXml(0x08)).toBe('h6');
  expect(dialect.identifierToXml(0x09)).toBe('h7');
  expect(dialect.identifierToXml(0x0A)).toBe('i');
  expect(dialect.identifierToXml(0x0B)).toBe('img');
  expect(dialect.identifierToXml(0x0C)).toBe('p');
  expect(dialect.identifierToXml(0x0D)).toBe('pre');
  expect(dialect.identifierToXml(0x0E)).toBe('s');
  expect(dialect.identifierToXml(0x0F)).toBe('u');
});


/*----------------------------------------------------------------------------*/
test('Invalid identifiers to XML tags', () => {
  expect(() => dialect.identifierToXml(0xBAD)).toThrow(PRTPOPInvalidIdentifier);
});


/*----------------------------------------------------------------------------*/
test('Valid XML tags to identifiers', () => {
  expect(dialect.xmlToIdentifier('a')).toBe(0x00);
  expect(dialect.xmlToIdentifier('b')).toBe(0x01);
  expect(dialect.xmlToIdentifier('code')).toBe(0x02);
  expect(dialect.xmlToIdentifier('h1')).toBe(0x03);
  expect(dialect.xmlToIdentifier('h2')).toBe(0x04);
  expect(dialect.xmlToIdentifier('h3')).toBe(0x05);
  expect(dialect.xmlToIdentifier('h4')).toBe(0x06);
  expect(dialect.xmlToIdentifier('h5')).toBe(0x07);
  expect(dialect.xmlToIdentifier('h6')).toBe(0x08);
  expect(dialect.xmlToIdentifier('h7')).toBe(0x09);
  expect(dialect.xmlToIdentifier('i')).toBe(0x0A);
  expect(dialect.xmlToIdentifier('img')).toBe(0x0B);
  expect(dialect.xmlToIdentifier('p')).toBe(0x0C);
  expect(dialect.xmlToIdentifier('pre')).toBe(0x0D);
  expect(dialect.xmlToIdentifier('s')).toBe(0x0E);
  expect(dialect.xmlToIdentifier('u')).toBe(0x0F);
});


/*----------------------------------------------------------------------------*/
test('Invalid XML tags to identifiers', () => {
  expect(() => dialect.xmlToIdentifier('')).toThrow(PRTPOPInvalidXMLTag);
  expect(() => dialect.xmlToIdentifier('invalid')).toThrow(PRTPOPInvalidXMLTag);
});


/*----------------------------------------------------------------------------*/
test('Valid attributes to XML', () => {
  expect(dialect.attributeToXml(0x01, 'id', 'i')).toEqual(['id', 'i']);
  expect(dialect.attributeToXml(0x02, 'class', 'c')).toEqual(['class', 'c']);
  expect(dialect.attributeToXml(0x00, 'href', '#')).toEqual(['href', '#']);
  expect(dialect.attributeToXml(0x0B, 'alt', 'a')).toEqual(['alt', 'a']);
  expect(dialect.attributeToXml(0x0B, 'src', 's')).toEqual(['src', 's']);
});


/*----------------------------------------------------------------------------*/
test('Invalid attributes to XML', () => {
  expect(() => dialect.attributeToXml(0x01, 'alt', 'a'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToXml(0x02, 'href', '#'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToXml(0x00, 'src', 's'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToXml(0x0B, 'href', '#'))
    .toThrow(PRTPOPInvalidAttribute);
});


/*----------------------------------------------------------------------------*/
test('Valid XML to attributes', () => {
  expect(dialect.xmlToAttribute('b', 'id', 'i')).toEqual(['id', 'i']);
  expect(dialect.xmlToAttribute('code', 'class', 'c')).toEqual(['class', 'c']);
  expect(dialect.xmlToAttribute('a', 'href', '#')).toEqual(['href', '#']);
  expect(dialect.xmlToAttribute('img', 'alt', 'a')).toEqual(['alt', 'a']);
  expect(dialect.xmlToAttribute('img', 'src', 's')).toEqual(['src', 's']);
});


/*----------------------------------------------------------------------------*/
test('Invalid XML to attributes', () => {
  expect(() => dialect.xmlToAttribute('b', 'alt', 'a'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.xmlToAttribute('code', 'href', '#'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.xmlToAttribute('a', 'src', 's'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.xmlToAttribute('img', 'href', '#'))
    .toThrow(PRTPOPInvalidXMLAttribute);
});
