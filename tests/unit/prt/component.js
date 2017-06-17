/* @flow */

/* Import react objects */
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-disable no-unused-vars */
import renderer from 'react-test-renderer';

/* Import PRT objects */
import PRTComponent, {
  PRTInvalidContentType,
  PRTInvalidDocumentType
} from 'prt/component';


/*----------------------------------------------------------------------------*/
const jsonify = (component) => renderer.create(component).toJSON();


/*----------------------------------------------------------------------------*/
test('Valid component invocation', () => {
  const actual = jsonify(<PRTComponent content={{
    type     : 'PRTDocument',
    version  : '2.0',
    dialect  : 'pop',
    elements : null
  }} />);
  const expected = jsonify(<div></div>);
  expect(actual).toEqual(expected);
});


/*----------------------------------------------------------------------------*/
test('Invalid component invocation', () => {
  expect(() => jsonify(<PRTComponent />)).toThrow(PRTInvalidContentType);
  expect(() => jsonify(<PRTComponent content={{}} />))
    .toThrow(PRTInvalidDocumentType);
});
