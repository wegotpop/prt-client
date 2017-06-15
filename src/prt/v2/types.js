/* @flow */

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTIdentifier = number;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTPlainText  = string | String;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTAttributes =
  null |
  {[PRTPlainText]: PRTPlainText};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTElement =
  null         |
  PRTPlainText |
  [PRTIdentifier, PRTAttributes, PRTElements];


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTElements =
  null         |
  PRTPlainText |
  Array<PRTElement>;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export type PRTDocument = {|
  type     : PRTPlainText,
  version  : PRTPlainText,
  dialect? : PRTPlainText,
  elements : PRTElements,
|};
