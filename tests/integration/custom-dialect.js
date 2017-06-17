/* @flow */

/* Import react objects */
/* eslint-disable no-unused-vars */
import React, {
/* eslint-enable no-unused-vars */
  Component
} from 'react';
import renderer from 'react-test-renderer';

/* Import PRT objects */
/* eslint-disable no-unused-vars */
import PRTComponent                       from 'prt/component';
/* eslint-enable no-unused-vars */
import registerPRTDialectByNameAndVersion from 'prt/dialects';
import PRTDialect                         from 'prt/v2/dialect';


/*----------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
class Alpha extends Component {
  render = () => <b>ALPHA</b>;
}
/* eslint-enable no-unused-vars */

/*----------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
class Beta extends Component {
  render = () => <i>BETA</i>;
}
/* eslint-enable no-unused-vars */

/*----------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
class Gamma extends Component {
  render = () => <span>GAMMA</span>;
}
/* eslint-enable no-unused-vars */

/*----------------------------------------------------------------------------*/
export const MyDialectError   = function () {};
MyDialectError.prototype      = Object.create(Error.prototype);
MyDialectError.prototype.name = 'MyDialectError';
MyDialectError.message        = 'Invalid identifier';


/*----------------------------------------------------------------------------*/
class MyDialect extends PRTDialect {
  identifierToElement = (identifier) => {
    /* eslint-disable indent */
    switch (identifier) {
      case 0  : return <Alpha />;
      case 1  : return <Beta />;
      case 2  : return <Gamma />;
      default : throw new MyDialectError(identifier);
    }
    /* eslint-enable indent */
  };
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
registerPRTDialectByNameAndVersion('my-dialect', '2.0', MyDialect);


/*----------------------------------------------------------------------------*/
const jsonify = (component) => renderer.create(component).toJSON();


/*----------------------------------------------------------------------------*/
const prtify = (elements) => ({
  type    : 'PRTDocument',
  version : '2.0',
  dialect : 'my-dialect',
  elements,
});


/*----------------------------------------------------------------------------*/
test('Valid identifiers to custom dialect', () => {
  expect(jsonify(<PRTComponent content={prtify([[0, null, null]])} />))
    .toEqual(jsonify(<div><Alpha /></div>));
  expect(jsonify(<PRTComponent content={prtify([[1, null, null]])} />))
    .toEqual(jsonify(<div><Beta /></div>));
  expect(jsonify(<PRTComponent content={prtify([[2, null, null]])} />))
    .toEqual(jsonify(<div><Gamma /></div>));
});


/*----------------------------------------------------------------------------*/
test('Inalid identifiers to custom dialect', () => {

});
