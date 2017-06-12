/* @flow */

import React        from 'react';
import ReactDOM     from 'react-dom';
import PRTComponent from 'prt/component';

ReactDOM.render(
  <PRTComponent content={{type     : 'PRTDocument',
                          dialect  : 'pop',
                          version  : '2.0',
                          elements : [[0x00, null, 'HELLO WORLD']]}} />,
  document.getElementById('root'));
