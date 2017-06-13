/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PRTComponent from 'prt';

storiesOf('PRTComponent', module)
  .add('null', () => <PRTComponent
    content={{type     : 'PRTDocument',
      dialect  : 'pop',
      version  : '2.0',
      elements : null
    }} />
  )
  .add('string', () => <PRTComponent
    content={{type     : 'PRTDocument',
      dialect  : 'pop',
      version  : '2.0',
      elements : 'HELLLO WORLD'
    }} />
  )
  .add('bold', () => <PRTComponent
    content={{type     : 'PRTDocument',
      dialect  : 'pop',
      version  : '2.0',
      elements : [[0x01, null, 'HELLO WORLD']]}
    } />
  )
  .add('two elements 1 and 2 with a space between', () => <PRTComponent
    content={{type     : 'PRTDocument',
      dialect  : 'pop',
      version  : '2.0',
      elements : [[0x01, null, 'HELLO WORLD 1'], ' ', [0x02, null, 'HELLO WORLD 2']]}
    } />
  )
  .add('bold and code nested', () => <PRTComponent
    content={{type     : 'PRTDocument',
      dialect  : 'pop',
      version  : '2.0',
      elements : [[0x01, null, [[0x02, null, 'HELLO WORLD 2']]]]
    }} />
  )
