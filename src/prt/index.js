// @flow
/* Import components */
import PRTComponent from 'prt/component';

/* Import helpers */
import {
  registerPRTDialectByNameAndVersion,
  getPRTDialectByNameAndVersion,
  PRTInvalidDialectNameType,
  PRTInvalidDialectVersion,
  PRTAlreadyRegisteredDialect,
  PRTInvalidDialectType,
} from 'prt/dialects';

/* Import errors */
import PRTError from 'prt/error';
import {
  PRTInvalidContentType,
  PRTInvalidDocumentType,
} from 'prt/component';

import {
  PRTUnknownVersion,
} from 'prt/markups';

import {
  PRTInvalidVersionType,
  PRTInvalidVersionString,
} from 'prt/version';

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Export everything */
export default PRTComponent;
export {
  /* Generic */
  getPRTDialectByNameAndVersion,
  registerPRTDialectByNameAndVersion,
  PRTError,

  /* Component related */
  PRTInvalidContentType,
  PRTInvalidDocumentType,

  /* Dialect related */
  PRTInvalidDialectNameType,
  PRTInvalidDialectVersion,
  PRTAlreadyRegisteredDialect,
  PRTInvalidDialectType,

  /* Markup related */
  PRTUnknownVersion,

  /* Version related */
  PRTInvalidVersionType,
  PRTInvalidVersionString,
};
