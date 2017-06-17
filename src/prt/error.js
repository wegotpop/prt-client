/* @flow */

/*----------------------------------------------------------------------------*/
const PRTError = function () {
  this.message = 'An error occured';
};
PRTError.prototype      = Object.create(Error.prototype);
PRTError.prototype.name = 'PRTError';


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
export default PRTError;
