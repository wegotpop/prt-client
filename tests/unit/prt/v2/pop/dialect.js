/* @flow */

/* Import react objects */
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-disable no-unused-vars */
import renderer from 'react-test-renderer';

/* Import PRT objects */
import PRTPOPDialect, {
  PRTPOPInvalidIdentifier,
  PRTPOPInvalidXMLTag,
  PRTPOPInvalidAttribute,
  PRTPOPInvalidXMLAttribute
} from 'prt/v2/dialects/pop/dialect';


/*----------------------------------------------------------------------------*/
const dialect = new PRTPOPDialect();


/*----------------------------------------------------------------------------*/
const jsonify = (component) => renderer.create(component).toJSON();


/*----------------------------------------------------------------------------*/
test('Valid identifiers to elements', () => {
  expect(jsonify(dialect.identifierToElement(0x00))).toEqual(jsonify(<a />));
  expect(jsonify(dialect.identifierToElement(0x01))).toEqual(jsonify(<b />));
  expect(jsonify(dialect.identifierToElement(0x02))).toEqual(jsonify(<code />));
  expect(jsonify(dialect.identifierToElement(0x03))).toEqual(jsonify(<h1 />));
  expect(jsonify(dialect.identifierToElement(0x04))).toEqual(jsonify(<h2 />));
  expect(jsonify(dialect.identifierToElement(0x05))).toEqual(jsonify(<h3 />));
  expect(jsonify(dialect.identifierToElement(0x06))).toEqual(jsonify(<h4 />));
  expect(jsonify(dialect.identifierToElement(0x07))).toEqual(jsonify(<h5 />));
  expect(jsonify(dialect.identifierToElement(0x08))).toEqual(jsonify(<h6 />));
  expect(jsonify(dialect.identifierToElement(0x09))).toEqual(jsonify(<h7 />));
  expect(jsonify(dialect.identifierToElement(0x0A))).toEqual(jsonify(<i />));
  expect(jsonify(dialect.identifierToElement(0x0B))).toEqual(jsonify(<img />));
  expect(jsonify(dialect.identifierToElement(0x0C))).toEqual(jsonify(<p />));
  expect(jsonify(dialect.identifierToElement(0x0D))).toEqual(jsonify(<pre />));
  expect(jsonify(dialect.identifierToElement(0x0E))).toEqual(jsonify(<s />));
  expect(jsonify(dialect.identifierToElement(0x0F))).toEqual(jsonify(<u />));
});


/*----------------------------------------------------------------------------*/
test('Invalid identifiers to elements', () => {
  expect(
    () => dialect.identifierToElement(0xBAD)).toThrow(PRTPOPInvalidIdentifier);
});


/*----------------------------------------------------------------------------*/
test('Valid tag names to identifiers', () => {
  expect(dialect.tagNameToIdentifier('a')).toBe(0x00);
  expect(dialect.tagNameToIdentifier('b')).toBe(0x01);
  expect(dialect.tagNameToIdentifier('code')).toBe(0x02);
  expect(dialect.tagNameToIdentifier('h1')).toBe(0x03);
  expect(dialect.tagNameToIdentifier('h2')).toBe(0x04);
  expect(dialect.tagNameToIdentifier('h3')).toBe(0x05);
  expect(dialect.tagNameToIdentifier('h4')).toBe(0x06);
  expect(dialect.tagNameToIdentifier('h5')).toBe(0x07);
  expect(dialect.tagNameToIdentifier('h6')).toBe(0x08);
  expect(dialect.tagNameToIdentifier('h7')).toBe(0x09);
  expect(dialect.tagNameToIdentifier('i')).toBe(0x0A);
  expect(dialect.tagNameToIdentifier('img')).toBe(0x0B);
  expect(dialect.tagNameToIdentifier('p')).toBe(0x0C);
  expect(dialect.tagNameToIdentifier('pre')).toBe(0x0D);
  expect(dialect.tagNameToIdentifier('s')).toBe(0x0E);
  expect(dialect.tagNameToIdentifier('u')).toBe(0x0F);
});


/*----------------------------------------------------------------------------*/
test('Invalid tag names to identifiers', () => {
  expect(() => dialect.tagNameToIdentifier('')).toThrow(PRTPOPInvalidXMLTag);
  expect(() => dialect.tagNameToIdentifier('invalid')).toThrow(PRTPOPInvalidXMLTag);
});


/*----------------------------------------------------------------------------*/
test('Valid attributes to XML', () => {
  expect(dialect.attributeToProp(0x01, 'id', 'i')).toEqual(['id', 'i']);
  expect(dialect.attributeToProp(0x02, 'class', 'c')).toEqual(['class', 'c']);
  expect(dialect.attributeToProp(0x00, 'href', '#')).toEqual(['href', '#']);
  expect(dialect.attributeToProp(0x0B, 'alt', 'a')).toEqual(['alt', 'a']);
  expect(dialect.attributeToProp(0x0B, 'src', 's')).toEqual(['src', 's']);
});


/*----------------------------------------------------------------------------*/
test('Invalid attributes to XML', () => {
  expect(() => dialect.attributeToProp(0x01, 'alt', 'a'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToProp(0x02, 'href', '#'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToProp(0x00, 'src', 's'))
    .toThrow(PRTPOPInvalidAttribute);
  expect(() => dialect.attributeToProp(0x0B, 'href', '#'))
    .toThrow(PRTPOPInvalidAttribute);
});


/*----------------------------------------------------------------------------*/
test('Valid XML to attributes', () => {
  expect(dialect.propToAttribute('b', 'id', 'i')).toEqual(['id', 'i']);
  expect(dialect.propToAttribute('code', 'class', 'c')).toEqual(['class', 'c']);
  expect(dialect.propToAttribute('a', 'href', '#')).toEqual(['href', '#']);
  expect(dialect.propToAttribute('img', 'alt', 'a')).toEqual(['alt', 'a']);
  expect(dialect.propToAttribute('img', 'src', 's')).toEqual(['src', 's']);
});


/*----------------------------------------------------------------------------*/
test('Invalid XML to attributes', () => {
  expect(() => dialect.propToAttribute('b', 'alt', 'a'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.propToAttribute('code', 'href', '#'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.propToAttribute('a', 'src', 's'))
    .toThrow(PRTPOPInvalidXMLAttribute);
  expect(() => dialect.propToAttribute('img', 'href', '#'))
    .toThrow(PRTPOPInvalidXMLAttribute);
});
