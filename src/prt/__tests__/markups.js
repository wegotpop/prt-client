/* @flow */

/* Import PRT objects */
import getPRTMarkUpByVersion,
       { PRTUnknownVersion } from 'prt/markups';
import PRTMarkUpV2_0         from 'prt/v2/markup';


/*----------------------------------------------------------------------------*/
test('Valid v2.0', () => {
  expect(getPRTMarkUpByVersion('2.0')).toBe(PRTMarkUpV2_0);
});


/*----------------------------------------------------------------------------*/
test('Valid version string, but invalid version', () => {
  expect(() => getPRTMarkUpByVersion('1.0')).toThrow(PRTUnknownVersion);
});
