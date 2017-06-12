/* @flow */

/* Import PRT types */
import type { PRTPlainText,
              PRTIdentifier } from 'prt/v2/types';


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPGenericAttributes = {|
  id?      : PRTPlainText,
  'class'? : PRTPlainText,
|};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPImageAttributes = {|
  alt? : PRTPlainText,
  src? : PRTPlainText,
  ...PRTPOPGenericAttributes,
|};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPAnchorAttributes = {|
  href? : PRTPlainText,
  ...PRTPOPGenericAttributes,
|};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPSpecificAttributes =
  PRTPOPImageAttributes |
  PRTPOPAnchorAttributes;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPAttributes =
  null                    |
  PRTPOPGenericAttributes |
  PRTPOPSpecificAttributes;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPElement =
  null         |
  PRTPlainText |
  [PRTIdentifier, PRTPOPAttributes, PRTPOPElements];


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPOPElements =
  null         |
  PRTPlainText |
  Array<PRTPOPElement>;
