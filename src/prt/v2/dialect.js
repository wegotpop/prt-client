/* @flow */

/* Import PRT types */
import type {
  PRTIdentifier,
  PRTPlainText
} from 'prt/v2/types';

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTIdentifierToElement = (PRTIdentifier) => PRTPlainText;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTTagNameToIdentifier = (PRTPlainText) => PRTIdentifier;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTAttributeToProp  = (PRTIdentifier,
                                  PRTPlainText,
                                  PRTPlainText) => Array<PRTPlainText>;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPropToAttribute  = (PRTPlainText,
                                  PRTPlainText,
                                  PRTPlainText) => Array<PRTPlainText>;


/*----------------------------------------------------------------------------*/
class PRTDialect {
  identifierToElement: PRTIdentifierToElement = i => i ? i.toString() : '';
  tagNameToIdentifier: PRTTagNameToIdentifier = t => (t, 0xBAD);
  attributeToProp : PRTAttributeToProp  =
    (i, n, v) => [n ? n.toString() : '', v ? v.toString() : ''];
  propToAttribute : PRTPropToAttribute  =
    (i, n, v) => [n ? n.toString() : '', v ? v.toString() : ''];
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTDialect;
