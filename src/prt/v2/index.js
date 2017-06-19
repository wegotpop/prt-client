/* @flow */

/* Import class */
import PRTDialect from 'prt/v2/dialect';

import {
  PRTInvalidElementsType,
  PRTInvalidElementType,
  PRTInvalidIdentifierType,
  PRTInvalidAttributesType,
  PRTInvalidAttributeKey,
  PRTInvalidAttributeValueType,
} from 'prt/v2/markup';

import PRTPOPDialect, {
  PRTPOPInvalidIdentifier,
  PRTPOPInvalidTagName,
  PRTPOPInvalidAttribute,
  PRTPOPInvalidPropName,
} from 'prt/v2/dialects/pop/dialect';


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Export everything */
export default PRTDialect;
/* Export errors */
export {
  /* Generic */
  PRTInvalidElementsType,
  PRTInvalidElementType,
  PRTInvalidIdentifierType,
  PRTInvalidAttributesType,
  PRTInvalidAttributeKey,
  PRTInvalidAttributeValueType,

  /* POP dialect related */
  PRTPOPDialect,
  PRTPOPInvalidIdentifier,
  PRTPOPInvalidTagName,
  PRTPOPInvalidAttribute,
  PRTPOPInvalidPropName,
};
