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
    identifierToXml: PRTIdentifierToXml = id => id.toString();
    xmlToIdentifier: PRTXmlToIdentifier = tag => parseInt(tag.toString()[0]);
    attributeToXml : PRTAttributeToXml  = (id, name, value) => [name, value];
    xmlToAttribute : PRTXmlToAttribute  = (id, name, value) => [name, value];
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTDialect;
