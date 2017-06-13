// @flow
/* Import components */
import PRTComponent from 'prt/component';

/* Import helpers */
import registerPRTDialectByNameAndVersion, {
  getPRTDialectByNameAndVersion
} from 'prt/dialects';

/* Export everything */
export default PRTComponent;
export {
  getPRTDialectByNameAndVersion,
  registerPRTDialectByNameAndVersion,
};
