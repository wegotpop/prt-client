/* @flow */

/* Import react objects */
/* eslint-disable no-unused-vars */
import React, {
/* eslint-enable no-unused-vars */
  Component
} from 'react';

/* Import PRT types */
import type { PRTPlainText } from 'prt/v2/types';

/* Import PRT objects */
import PRTError           from 'prt/error';
import parseVersionString from 'prt/version';
import PRTMarkUpV2_0      from 'prt/v2/markup';

/*----------------------------------------------------------------------------*/
export const PRTUnknownVersion = function (version: PRTPlainText) {
  this.message = 'Unknown version specified: ' +
                 `${version.toString()} (type ${typeof version})`;
};
PRTUnknownVersion.prototype      = Object.create(PRTError.prototype);
PRTUnknownVersion.prototype.name = 'PRTUnknownVersion';


/*----------------------------------------------------------------------------*/
type GetPRTMarkUpByVersion = (PRTPlainText) => Component;
const getPRTMarkUpByVersion: GetPRTMarkUpByVersion = (version) => {
  const [major, minor] = parseVersionString(version);
  switch (major) {
    case 2:
      switch(minor) {
        case 0:
          return PRTMarkUpV2_0;
      }
    /* eslint-disable no-fallthrough */
    default:
      throw new PRTUnknownVersion(version);
    /* eslint-enable no-fallthrough */
  }
};

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default getPRTMarkUpByVersion;
