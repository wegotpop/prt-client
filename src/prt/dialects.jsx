/* @flow */

/* Import PRT types */
import type { PRTPlainText } from 'prt/v2/types';

/* Import PRT objects */
import parseVersionString from 'prt/version';
import PRTDialectV2_0     from 'prt/v2/dialect';
import PRTPOPDialectV2_0  from 'prt/v2/dialects/pop/dialect';

import PRTError from './error';

/*----------------------------------------------------------------------------*/
const _PRT_DIALECTS: Array<{[PRTPlainText]: PRTDialectV2_0}> = [
  {},
  {pop: new PRTPOPDialectV2_0},
];


/*----------------------------------------------------------------------------*/
export const PRTInvalidDialectNameType = function (reference: any) {
  this.message = `Invalid dialect name type, expected string, but got: ` +
                 `${reference} (type ${typeof reference})`;
}
PRTInvalidDialectNameType.prototype      = Object.create(PRTError.prototype);
PRTInvalidDialectNameType.prototype.name = 'PRTInvalidDialectNameType';


/*----------------------------------------------------------------------------*/
export const PRTInvalidDialectVersion = function (version: PRTPlainText) {
  this.message = `Invalid dialect version specified: ` +
                 `${version.toString()} (type ${typeof version})`;
}
PRTInvalidDialectVersion.prototype      = Object.create(PRTError.prototype);
PRTInvalidDialectVersion.prototype.name = 'PRTInvalidDialectVersion';


/*----------------------------------------------------------------------------*/
export const PRTAlreadyRegisteredDialect = function (dialect: PRTPlainText) {
  this.message = `Dialect has already been registered: ${dialect.toString()}`;
}
PRTAlreadyRegisteredDialect.prototype      = Object.create(PRTError.prototype);
PRTAlreadyRegisteredDialect.prototype.name = 'PRTAlreadyRegisteredDialect';


/*----------------------------------------------------------------------------*/
export const PRTInvalidDialectType = function (dialect: any) {
  this.message = `Invalid dialect type specified, expected instance of ` +
                 `PRTDialect, but got: ${dialect} (type ${typeof dialect})`;
}
PRTInvalidDialectType.prototype      = Object.create(PRTError.prototype);
PRTInvalidDialectType.prototype.name = 'PRTInvalidDialectType';


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
type Register = (PRTPlainText, PRTPlainText, PRTDialectV2_0) => void;
const registerPRTDialectByNameAndVersion: Register =
(reference, version, dialect) => {
  let dialects;
  /* If reference is not a string */
  if (!(reference instanceof String ||
        typeof reference === 'string')) {
    throw new PRTInvalidDialectNameType(reference);
  }
  /* If dialect object collection does not exist */
  else if (!(dialects = _PRT_DIALECTS[parseVersionString(version)[0] - 1])) {
    throw new PRTInvalidDialectVersion(version);
  }
  /* If dialect already registered */
  else if (dialects[reference]) {
    throw new PRTAlreadyRegisteredDialect(reference);
  }
  /* If dialect is not a dialect object */
  else if (!(dialect instanceof PRTDialectV2_0)) {
    throw new PRTInvalidDialectType(dialect);
  }

  /* Register new dialect */
  dialects[reference] = dialect;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
type Getter = (?PRTPlainText, PRTPlainText) => PRTDialectV2_0;
export const getPRTDialectByNameAndVersion: Getter =
(reference, version) => {
  let dialects;
  /* If reference is not a string */
  if (!(reference instanceof String ||
        typeof reference === 'string')) {
    throw new PRTInvalidDialectNameType(reference);
  }
  /* If dialect object collection does not exist */
  else if (!(dialects = _PRT_DIALECTS[parseVersionString(version)[0] - 1])) {
    throw new PRTInvalidDialectVersion(version);
  }

  /* Get dialect object */
  return dialects[reference];
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default registerPRTDialectByNameAndVersion;
