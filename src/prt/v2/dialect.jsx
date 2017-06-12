/* @flow */

/* Import PRT types */
import type { PRTIdentifier,
              PRTPlainText } from 'prt/v2/types';

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTIdentifierToHTML = (PRTIdentifier) => PRTPlainText;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTAttributeToHTML  = (PRTIdentifier,
                                   PRTPlainText,
                                   PRTPlainText) => Array<PRTPlainText>;


/*----------------------------------------------------------------------------*/
class PRTDialect {
    identifierToHTML: PRTIdentifierToHTML = id => id.toString();
    attributeToHTML : PRTAttributeToHTML  = (id, name, value) => [name, value];
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTDialect;
