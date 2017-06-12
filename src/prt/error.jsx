/* @flow */

/*----------------------------------------------------------------------------*/
const PRTError = function (_: any) {
  this.message = 'An error occured';
};
PRTError.prototype      = Object.create(Error.prototype);
PRTError.prototype.name = 'PRTError';


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTError;
