/* @flow */

/* Import PRT types */
import type { PRTIdentifier,
              PRTPlainText } from 'prt/v2/types';

import type { PRTIdentifierToHTML,
              PRTAttributeToHTML } from 'prt/v2/dialect';

/* Import PRT objects */
import PRTError   from 'prt/error';
import PRTDialect from 'prt/v2/dialect';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidIdentifier = function (identifier: PRTIdentifier) {
  this.message = `Invalid identifier for pop dialect: ` +
                 `${identifier} (type ${typeof identifier})`;
}
PRTPOPInvalidIdentifier.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidIdentifier.prototype.name = 'PRTPOPInvalidIdentifier';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidAttribute = function (identifier : PRTPlainText,
                                                attribute  : PRTPlainText) {
  this.message = `Invalid attribute for identifier "${identifier.toString()}"` +
                `: ${attribute.toString()} (type ${typeof attribute})`;
}
PRTPOPInvalidAttribute.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidAttribute.prototype.name = 'PRTPOPInvalidAttribute';


/*----------------------------------------------------------------------------*/
class PRTPOPDialect extends PRTDialect {

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  identifierToHTML: PRTIdentifierToHTML = identifier => {
    switch (identifier) {
      /* Anchor */
      case 0x00: return 'a';
      /* Bold */
      case 0x01: return 'b';
      /* Code */
      case 0x02: return 'code';
      /* Headers */
      case 0x03: return 'h1';
      case 0x04: return 'h2';
      case 0x05: return 'h3';
      case 0x06: return 'h4';
      case 0x07: return 'h5';
      case 0x08: return 'h6';
      case 0x09: return 'h7';
      /* Italic */
      case 0x0A: return 'i';
      /* Image */
      case 0x0B: return 'img';
      /* Paragraph */
      case 0x0C: return 'p';
      /* Preformatted */
      case 0x0D: return 'pre';
      /* Strikethrough */
      case 0x0E: return 's';
      /* Underline */
      case 0x0F: return 'u';
      /* Unknown */
      default:
        throw new PRTPOPInvalidIdentifier(identifier);
    }
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  attributeToHTML: PRTAttributeToHTML = (identifier, name, value) => {
    const invalid = () => {
      throw new PRTPOPInvalidAttribute(this.identifierToHTML(identifier), name);
    };
    /* If not generic attributes */
    if (name !== 'id' ||
        name !== 'class') {
      switch (identifier) {
        /* Anchor */
        case 0x00:
          if (name === 'href') {
            invalid();
          }
          break;
        /* Image */
        case 0x0B:
          if (name !== 'alt' ||
              name !== 'src') {
            invalid();
          }
          break;
        default:
          invalid();
      }
    }
    /* Return validated name and value */
    return [name, value];
  };
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTPOPDialect;
