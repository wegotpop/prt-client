/* @flow */

/* Import react objects */
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

/* Import PRT types */
import type {
  PRTIdentifier,
  PRTPlainText
} from 'prt/v2/types';

import type {
  PRTIdentifierToElement,
  PRTTagNameToIdentifier,
  PRTAttributeToProp,
  PRTPropToAttribute
} from 'prt/v2/dialect';

/* Import PRT objects */
import PRTError   from 'prt/error';
import PRTDialect from 'prt/v2/dialect';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidIdentifier = function (identifier: PRTIdentifier) {
  this.message = 'Invalid identifier for pop dialect: ' +
                 `${identifier} (type ${typeof identifier})`;
};
PRTPOPInvalidIdentifier.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidIdentifier.prototype.name = 'PRTPOPInvalidIdentifier';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidTagName = function (tag: PRTPlainText) {
  this.message = 'Invalid tag name for pop dialect: ' +
                 `${tag.toString()} (type ${typeof tag})`;
};
PRTPOPInvalidTagName.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidTagName.prototype.name = 'PRTPOPInvalidTagName';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidAttribute =
  function (identifier : PRTPlainText, attribute  : PRTPlainText) {
    this.message = 'Invalid attribute for identifier '                    +
                   `"${identifier.toString()}": ${attribute.toString()} ` +
                   `(type ${typeof attribute})`;
  };
PRTPOPInvalidAttribute.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidAttribute.prototype.name = 'PRTPOPInvalidAttribute';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidPropName =
  function (identifier : PRTPlainText, attribute  : PRTPlainText) {
    this.message = 'Invalid attribute for identifier '                    +
                   `"${identifier.toString()}": ${attribute.toString()} ` +
                   `(type ${typeof attribute})`;
  };
PRTPOPInvalidPropName.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidPropName.prototype.name = 'PRTPOPInvalidPropName';


/*----------------------------------------------------------------------------*/
class PRTPOPDialect extends PRTDialect {

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  identifierToElement: PRTIdentifierToElement = identifier => {
    /* eslint-disable indent */
    switch (identifier) {
      /* Anchor */
      case 0x00: return <a />;
      /* Bold */
      case 0x01: return <b />;
      /* Code */
      case 0x02: return <code />;
      /* Headers */
      case 0x03: return <h1 />;
      case 0x04: return <h2 />;
      case 0x05: return <h3 />;
      case 0x06: return <h4 />;
      case 0x07: return <h5 />;
      case 0x08: return <h6 />;
      case 0x09: return <h7 />;
      /* Italic */
      case 0x0A: return <i />;
      /* Image */
      case 0x0B: return <img />;
      /* Paragraph */
      case 0x0C: return <p />;
      /* Preformatted */
      case 0x0D: return <pre />;
      /* Strikethrough */
      case 0x0E: return <s />;
      /* Underline */
      case 0x0F: return <u />;
      /* Unknown */
      default:
        throw new PRTPOPInvalidIdentifier(identifier);
    }
    /* eslint-enable indent */
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  tagNameToIdentifier: PRTTagNameToIdentifier = tagName => {
    /* eslint-disable indent */
    switch (tagName) {
      /* Anchor */
      case 'a'    : return 0x00;
      /* Bold */
      case 'b'    : return 0x01;
      /* Code */
      case 'code' : return 0x02;
      /* Headers */
      case 'h1'   : return 0x03;
      case 'h2'   : return 0x04;
      case 'h3'   : return 0x05;
      case 'h4'   : return 0x06;
      case 'h5'   : return 0x07;
      case 'h6'   : return 0x08;
      case 'h7'   : return 0x09;
      /* Italic */
      case 'i'    : return 0x0A;
      /* Image */
      case 'img'  : return 0x0B;
      /* Paragraph */
      case 'p'    : return 0x0C;
      /* Preformatted */
      case 'pre'  : return 0x0D;
      /* Strikethrough */
      case 's'    : return 0x0E;
      /* Underline */
      case 'u'    : return 0x0F;
      /* Unknown */
      default:
        throw new PRTPOPInvalidTagName(tagName);
    }
    /* eslint-enable indent */
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  attributeToProp: PRTAttributeToProp =
    (identifier, attributeName, attributeValue) => {
      const invalid = () => {
        throw new PRTPOPInvalidAttribute(
          this.identifierToElement(identifier), attributeName);
      };
      /* If not generic attributes */
      if (attributeName !== 'id' &&
          attributeName !== 'class') {
        /* eslint-disable indent */
        switch (identifier) {
          /* Anchor */
          case 0x00:
            if (attributeName !== 'href') {
              invalid();
            }
            break;
          /* Image */
          case 0x0B:
            if (attributeName !== 'alt' &&
                attributeName !== 'src') {
              invalid();
            }
            break;
          default:
            invalid();
        }
        /* eslint-enable indent */
      }
      /* Return validated name and value */
      return [attributeName, attributeValue];
    };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  propToAttribute: PRTPropToAttribute =
    (tagName, attributeName, attributeValue) => {
      const invalid = () => {
        throw new PRTPOPInvalidPropName(
          this.tagNameToIdentifier(tagName), attributeName);
      };
      /* If not generic attributes */
      if (attributeName !== 'id' &&
          attributeName !== 'class') {
        /* eslint-disable indent */
        switch (tagName) {
          /* Anchor */
          case 'a':
            if (attributeName !== 'href') {
              invalid();
            }
            break;
          /* Image */
          case 'img':
            if (attributeName !== 'alt' &&
                attributeName !== 'src') {
              invalid();
            }
            break;
          default:
            invalid();
        }
        /* eslint-enable indent */
      }
      /* Return validated name and value */
      return [attributeName, attributeValue];
    };
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTPOPDialect;
