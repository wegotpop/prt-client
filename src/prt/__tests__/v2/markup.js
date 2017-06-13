/* @flow */

/* Import react objects */
import React from 'react';
import renderer from 'react-test-renderer';

/* Import PRT objects */
import PRTDialect from 'prt/v2/dialect'
import PRTMarkUp,
       { PRTInvalidElementsType,
         PRTInvalidElementType,
         PRTInvalidIdentifierType,
         PRTInvalidAttributesType,
         PRTInvalidAttributeKey,
         PRTInvalidAttributeValueType } from 'prt/v2/markup';


/*----------------------------------------------------------------------------*/
class TestDialect extends PRTDialect {
  identifierToXml = (identifier) => {
    switch (identifier) {
      case 0:
        return 'a';
      case 1:
        return 'b';
      default:
        return 'del';
    }
  }
}


/*----------------------------------------------------------------------------*/
const MARK_UP = new PRTMarkUp(),
      DIALECT = new TestDialect();


/*----------------------------------------------------------------------------*/
const jsonify = (component) => renderer.create(component).toJSON();


/*----------------------------------------------------------------------------*/
test('Valid invocation', () => {
  let elements,
      actual,
      expected;

  expect(MARK_UP.componentify(null, DIALECT)).toBe(null);
  expect(MARK_UP.componentify('hello', DIALECT)).toBe('hello');

  elements = [[0, null, null]];
  actual   = jsonify(<PRTMarkUp content={elements} dialect={DIALECT} />);
  expected = jsonify(<div><a /></div>);
  expect(actual).toEqual(expected);

  elements = [[0, null, [[1, null, null]]]];
  actual   = jsonify(<PRTMarkUp content={elements} dialect={DIALECT} />);
  expected = jsonify(<div><a><b /></a></div>);
  expect(actual).toEqual(expected);

  elements = [[0, null, null], [1, null, null]];
  actual   = jsonify(<PRTMarkUp content={elements} dialect={DIALECT} />);
  expected = jsonify(<div><a /><b /></div>);
  expect(actual).toEqual(expected);

  elements = [[0, null, null], null, 'hello', [1, null, null]];
  actual   = jsonify(<PRTMarkUp content={elements} dialect={DIALECT} />);
  expected = jsonify(<div><a />hello<b /></div>);
  expect(actual).toEqual(expected);

  elements = [[0, {id: 'hello'}, null]];
  actual   = jsonify(<PRTMarkUp content={elements} dialect={DIALECT} />);
  expected = jsonify(<div><a id="hello" /></div>);
  expect(actual).toEqual(expected);
});


/*----------------------------------------------------------------------------*/
test('Invalid elements type', () => {
  expect(() => MARK_UP.componentify()).toThrow(PRTInvalidElementsType);
  expect(() => MARK_UP.componentify(true)).toThrow(PRTInvalidElementsType);
  expect(() => MARK_UP.componentify({})).toThrow(PRTInvalidElementsType);
});


/*----------------------------------------------------------------------------*/
test('Invalid element type', () => {
  expect(() => MARK_UP.componentify([true])).toThrow(PRTInvalidElementType);
  expect(() => MARK_UP.componentify([undefined])).toThrow(PRTInvalidElementType);
  expect(() => MARK_UP.componentify([[]])).toThrow(PRTInvalidElementType);
});


/*----------------------------------------------------------------------------*/
test('Invalid identifier type', () => {
  expect(() => MARK_UP.componentify([['a', null, null]]))
    .toThrow(PRTInvalidIdentifierType);
  expect(() => MARK_UP.componentify([[true, null, null]]))
    .toThrow(PRTInvalidIdentifierType);
  expect(() => MARK_UP.componentify([[-12, null, null]]))
    .toThrow(PRTInvalidIdentifierType);
});


/*----------------------------------------------------------------------------*/
test('Invalid attributes type', () => {
  expect(() => MARK_UP.componentify([[0, undefined, null]], DIALECT))
    .toThrow(PRTInvalidAttributesType);
  expect(() => MARK_UP.componentify([[0, true, null]], DIALECT))
    .toThrow(PRTInvalidAttributesType);
  expect(() => MARK_UP.componentify([[0, [], null]], DIALECT))
    .toThrow(PRTInvalidAttributesType);
  expect(() => MARK_UP.componentify([[0, () => null, null]], DIALECT))
    .toThrow(PRTInvalidAttributesType);
});


/*----------------------------------------------------------------------------*/
test('Invalid attribute value type', () => {
  expect(() => MARK_UP.componentify([[0, {x: 15}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeValueType);
  expect(() => MARK_UP.componentify([[0, {x: true}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeValueType);
  expect(() => MARK_UP.componentify([[0, {x: []}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeValueType);
  expect(() => MARK_UP.componentify([[0, {x: {}}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeValueType);
  expect(() => MARK_UP.componentify([[0, {x: () => null}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeValueType);
});


/*----------------------------------------------------------------------------*/
test('Invalid attribute key', () => {
  expect(() => MARK_UP.componentify([[0, {key: 'hello'}, null]], DIALECT))
    .toThrow(PRTInvalidAttributeKey);
});
