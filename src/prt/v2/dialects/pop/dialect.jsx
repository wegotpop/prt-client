/* @flow */

/* Import PRT types */
import type { PRTIdentifier,
              PRTPlainText } from 'prt/v2/types';

import type { PRTIdentifierToXml,
              PRTXmlToIdentifier,
              PRTAttributeToXml,
              PRTXmlToAttribute } from 'prt/v2/dialect';

/* Import PRT objects */
import PRTError   from 'prt/error';
import PRTDialect from 'prt/v2/dialect';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidIdentifier = function (identifier: PRTIdentifier) {
  this.message = `Invalid identifier for pop dialect: ` +
                 `${identifier} (type ${typeof identifier})`;
};
PRTPOPInvalidIdentifier.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidIdentifier.prototype.name = 'PRTPOPInvalidIdentifier';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidXMLTag = function (tag: PRTPlainText) {
  this.message = `Invalid XML tag for pop dialect: ` +
                 `${tag.toString()} (type ${typeof tag})`;
};
PRTPOPInvalidXMLTag.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidXMLTag.prototype.name = 'PRTPOPInvalidXMLTag';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidAttribute = function (identifier : PRTPlainText,
                                                attribute  : PRTPlainText) {
  this.message = `Invalid attribute for identifier "${identifier.toString()}"` +
                `: ${attribute.toString()} (type ${typeof attribute})`;
};
PRTPOPInvalidAttribute.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidAttribute.prototype.name = 'PRTPOPInvalidAttribute';


/*----------------------------------------------------------------------------*/
export const PRTPOPInvalidXMLAttribute = function (identifier : PRTPlainText,
                                                   attribute  : PRTPlainText) {
  this.message = `Invalid attribute for identifier "${identifier.toString()}"` +
                `: ${attribute.toString()} (type ${typeof attribute})`;
};
PRTPOPInvalidXMLAttribute.prototype      = Object.create(PRTError.prototype);
PRTPOPInvalidXMLAttribute.prototype.name = 'PRTPOPInvalidXMLAttribute';


/*----------------------------------------------------------------------------*/
class PRTPOPDialect extends PRTDialect {

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  identifierToXml: PRTIdentifierToXml = identifier => {
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
  xmlToIdentifier: PRTXmlToIdentifier = tag => {
    switch (tag) {
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
        throw new PRTPOPInvalidXMLTag(tag);
    }
  }

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  attributeToXml: PRTAttributeToXml = (identifier, name, value) => {
    const invalid = () => {
      throw new PRTPOPInvalidAttribute(this.identifierToXml(identifier), name);
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

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  xmlToAttribute: PRTXmlToAttribute = (tag, name, value) => {
    const invalid = () => {
      throw new PRTPOPInvalidXMLAttribute(this.xmlToIdentifier(tag), name);
    };
    /* If not generic attributes */
    if (name !== 'id' ||
        name !== 'class') {
      switch (identifier) {
        /* Anchor */
        case 'a':
          if (name === 'href') {
            invalid();
          }
          break;
        /* Image */
        case 'img':
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
  }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTPOPDialect;
