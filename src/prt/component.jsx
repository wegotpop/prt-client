/* @flow */

/* Import react objects */
import React, { Component,
         createElement } from 'react';

/* Import PRT types */
import type { PRTPlainText, PRTDocument } from 'prt/v2/types';

/* Import PRT objects */
import { isObject }                      from 'prt/utils';
import PRTError                          from 'prt/error';
import getPRTMarkUpByVersion             from 'prt/markups';
import { getPRTDialectByNameAndVersion } from 'prt/dialects';


/*----------------------------------------------------------------------------*/
export const PRTInvalidContentType = function (document: any) {
  this.message = `Invalid content specified, expected an Object, ` +
                 `but got: ${document} (type ${typeof document})`;
};
PRTInvalidContentType.prototype      = Object.create(PRTError.prototype);
PRTInvalidContentType.prototype.name = 'PRTInvalidContentType';


/*----------------------------------------------------------------------------*/
export const PRTInvalidDocumentType = function (type: any) {
  this.message = `Invalid document type specified, expected the string ` +
                 `'PRTDocument', but got: ${type} (type ${typeof type})`;
};
PRTInvalidDocumentType.prototype      = Object.create(PRTError.prototype);
PRTInvalidDocumentType.prototype.name = 'PRTInvalidDocumentType';


/*----------------------------------------------------------------------------*/
class PRTComponent extends Component {

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  props: {
    content: PRTDocument,
  };

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  render = () => {
    const content = this.props.content;
    if (!isObject(content)) {
        throw new PRTInvalidContentType(content);
    }

    const { type, version, dialect, elements } = content;
    if (type !== 'PRTDocument') {
        throw new PRTInvalidDocumentType(type);
    }
    /* Get dialect and mark up objects */
    const MarkUp  = getPRTMarkUpByVersion(version);
    const Dialect = getPRTDialectByNameAndVersion(dialect, version);

    /* Render mark up */
    return createElement(MarkUp, { content: elements, dialect: Dialect });
  }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTComponent;
