/* @flow */

/* Import react objects */
import React, { Component,
                createElement } from 'react';

/* Import PRT types */
import type { PRTPlainText,
              PRTAttributes,
              PRTElement,
              PRTElements } from 'prt/v2/types';

/* Import PRT objects */
import PRTError   from 'prt/error';
import PRTDialect from 'prt/v2/dialect';


/*----------------------------------------------------------------------------*/
export const PRTInvalidElementsType = function (elements: any) {
  this.message = `Invalid elements type, expected null, string or array, ` +
                 `but got: ${elements} (type ${typeof elements})`;
};
PRTInvalidElementsType.prototype      = Object.create(PRTError.prototype);
PRTInvalidElementsType.prototype.name = 'PRTInvalidElementsType';


/*----------------------------------------------------------------------------*/
export const PRTInvalidElementType = function (element: any) {
  this.message = `Invalid element type, expected null, string or array[3], ` +
                 `but got: ${element} (type ${typeof element})`;
};
PRTInvalidElementType.prototype      = Object.create(PRTError.prototype);
PRTInvalidElementType.prototype.name = 'PRTInvalidElementType';


/*----------------------------------------------------------------------------*/
export const PRTInvalidIdentifierType = function (identifier: any) {
  this.name    = 'PRTInvalidIdentifierType';
  this.message = `Invalid identifier type, expected positive number, ` +
                 `but got:  ${identifier} (type ${typeof identifier})`;
};
PRTInvalidIdentifierType.prototype = Object.create(Error.prototype);


/*----------------------------------------------------------------------------*/
export const PRTInvalidAttributesType = function (attributes: any) {
  this.name   = 'PRTInvalidAttributesType';
  this.messge = `Invalid attributes type, expected null or {[string]: ` +
                `string}, bug got: ${attributes} (type ${typeof attributes})`;
};
PRTInvalidAttributesType.prototype = Object.create(Error.prototype);


/*----------------------------------------------------------------------------*/
export const PRTInvalidAttributeKey = function (key: PRTPlainText) {
  this.name   = 'PRTInvalidAttributeKey';
  this.messge = `Invalid key for attribute, expected string other than ` +
                `'key', but got: ${key.toString()} (type ${typeof key})`;
};
PRTInvalidAttributeKey.prototype = Object.create(Error.prototype);


/*----------------------------------------------------------------------------*/
export const PRTInvalidAttributeValueType = function (value: any) {
  this.name   = 'PRTInvalidAttributeValueType';
  this.messge = `Invalid type of attribute value, expected string, ` +
                `but got: ${value} (type ${typeof value})`;
};
PRTInvalidAttributeValueType.prototype = Object.create(Error.prototype);


/*----------------------------------------------------------------------------*/
type Componentify =
  (PRTElements, PRTDialect) => null | PRTPlainText | Array<Component>;


/*----------------------------------------------------------------------------*/
class PRTMarkUp extends Component {

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  props: {
      content: PRTElements,
      dialect: PRTDialect,
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  componentify: Componentify = (elements, dialect) => {
    /* If elements is non-existent or a simple string */
    if (elements === null ||
        elements instanceof String ||
        typeof elements === 'string') {
      return elements;
    }
    /* If element is not an array */
    else if (!(elements instanceof Array)) {
      throw new PRTInvalidElementsType(elements);
    }

    /* If elements is an array of HTML-like elements iterate over its content */
    const componentified = [];
    for (let i = 0; i < elements.length; i++) {
      /* If element is non-existent */
      const element = elements[i];
      if (element === null) {
        continue;
      }
      /* If element is a string */
      else if (element instanceof String ||
               typeof element === 'string') {
        componentified.push(element);
      }
      /* If element is an HTML-like element */
      else if (element instanceof Array &&
               element.length === 3) {
        const [identifier, attributes, children] = element;
        /* Validate the type of identifier */
        if (!(identifier instanceof Number ||
              typeof identifier === 'number') ||
            identifier < 0) {
          throw new PRTInvalidIdentifierType(identifier);
        }

        const props = {};
        /* Validate the type of attributes */
        if (attributes !== null) {
          if (!(attributes instanceof Object ||
                typeof attributes === 'object')) {
            throw new PRTInvalidAttributesType(attributes);
          }
          /* Validate properties */
          let key;
          let value;
          const keys = Object.keys(attributes);
          for (let j = 0; j < keys.length; j++) {
            key   = keys[j];
            value = attributes[key];
            /* Make sure attriute value is a string */
            if (!(value instanceof String ||
                  typeof value === 'string')) {
              throw new PRTInvalidAttributeValueType(value);
            }
            /* Sanitise the value of key */
            else if (key === 'key') {
              throw new PRTInvalidAttributeKey(key);
            }
            /* Sanitise attributes by dialect */
            [key, value] = dialect.attributeToHTML(identifier, key, value);
            props[key.toString()] = value;
          }
        }
        props.key = i;
        /* Collect componentified element translated by dialect */
        componentified.push(
          createElement(dialect.identifierToHTML(identifier), props, this.componentify(children, dialect)));
      }
      /* If element is not null, nor string, nor array */
      else {
        throw new PRTInvalidElementType(element);
      }
    }
    return componentified;
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  render = () => <div>{this.componentify(this.props.content,
                                         this.props.dialect)}</div>;
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTMarkUp;

