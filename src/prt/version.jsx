/* @flow */

/* Import PRT types */
import type { PRTPlainText } from 'prt/v2/types';

/* Import PRT objects */
import PRTError      from 'prt/error';
import PRTMarkUpV2_0 from 'prt/v2/markup';


/*----------------------------------------------------------------------------*/
export const PRTInvalidVersionType = function (version: any) {
  this.message = `Invalid version type, expected string, but got: ` +
                 `${version} (type ${typeof version})`;
};
PRTInvalidVersionType.prototype      = Object.create(PRTError.prototype);
PRTInvalidVersionType.prototype.name = 'PRTInvalidVersionType';


/*----------------------------------------------------------------------------*/
export const PRTInvalidVersionString = function (version: PRTPlainText) {
  this.message = `Invalid version string, expected <major>.<minor>, ` +
                 `but got: ${version.toString()} (type ${typeof version})`;
};
PRTInvalidVersionString.prototype      = Object.create(PRTError.prototype);
PRTInvalidVersionString.prototype.name = 'PRTInvalidVersionString';


/*----------------------------------------------------------------------------*/
type ParseVersionString = (PRTPlainText) => Array<number>;
const parseVersionString: ParseVersionString = (version) => {
  /* If version is not a string */
  if (!(version instanceof String ||
        typeof version === 'string')) {
    throw new PRTInvalidVersionType(version);
  }

  let majorInt: number = 0;
  let minorInt: number = 0;
  let [majorStr, minorStr, other] = version.split('.');

  /* If version string is not propertly formatted */
  if (!majorStr                            ||
      !minorStr                            ||
      other                                ||
      isNaN(majorInt = parseInt(majorStr)) ||
      isNaN(minorInt = parseInt(minorStr)) ||
      majorInt < 0                         ||
      minorInt < 0) {
    throw new PRTInvalidVersionString(version);
  }

  /* Return parsed version components */
  return [majorInt, minorInt];
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default parseVersionString;
