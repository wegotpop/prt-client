/* @flow */

/* Import PRT types */
import type { PRTIdentifier,
              PRTPlainText } from 'prt/v2/types';

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTIdentifierToXml = (PRTIdentifier) => PRTPlainText;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTXmlToIdentifier = (PRTPlainText) => PRTIdentifier;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTAttributeToXml  = (PRTIdentifier,
                                  PRTPlainText,
                                  PRTPlainText) => Array<PRTPlainText>;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTXmlToAttribute  = (PRTPlainText,
                                  PRTPlainText,
                                  PRTPlainText) => Array<PRTPlainText>;


/*----------------------------------------------------------------------------*/
class PRTDialect {
  identifierToXml: PRTIdentifierToXml = i => i ? i.toString() : '';
  xmlToIdentifier: PRTXmlToIdentifier = t => 0xBAD;
  attributeToXml : PRTAttributeToXml  =
    (i, n, v) => [n ? n.toString() : '', v ? v.toString() : ''];
  xmlToAttribute : PRTXmlToAttribute  =
    (i, n, v) => [n ? n.toString() : '', v ? v.toString() : ''];
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTDialect;
