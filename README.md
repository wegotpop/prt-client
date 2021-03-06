# PRT
![CircleCI](https://circleci.com/gh/wegotpop/prt-client.png?circle-token=:circle-token)

This repository is the reference client-side implemention of [PRT][1], a safe,
small and strict rich text serialisation protocol.

### Table of Content

- [PRTv2.0](#prtv20)
    - [Javascript](#javascript)
    - [Demo](#demo)
- [Lincese](#license)


## PRTv2.0

### Javascript

> TODO: Add **real** documentation here...

Using the following `MyComponent`:

```js
import { Component } from 'react';
import PRTComponent from 'prt/component';

class MyComponent extends Component {
  render = () => {
    const document = {
      type     : 'PRTDocument',
      version  : '2.0',
      dialect  : 'pop',
      elements : [[0, {href: '#'}, 'click here']],
    };
    return <PRTComponent content={document} />;
  };
}
```

it will be rendered as:

```html
<div>
  <a href="#">click here</a>
</div>
```

Create custom dialect:

```js
import registerPRTDialectByNameAndVersion from 'prt';
import PRTDialect from 'prt/v2/dialect';

import { MyProjX,
         MyProjY,
         MyProjZ,
         MyProjEmpty } from 'my-proj';

class MyProjDialect extends PRTDialect {

  identifierToElement = identifier => {
    switch (identifier) {
      case 0  : return <MyProjX />;
      case 1  : return <MyProjY />;
      case 2  : return <MyProjZ />;
      default : return <MyProjEmpty />;
    }
  }

  attributeToProp = (identifier, name, value) = {
    if (identifier === 2 &&
        name === 'contenteditable') {
      name  = 'editability';
      value = value === 'true' ? 'enabled' : 'disabled';
    }
    return [name, value];
  };
}

registerPRTDialectByNameAndVersion('my-proj', '2.0', MyProjDialect);
```
## Demo

Start demo app with

```bash
$ yarn storybook
```

## License

Copyright &copy;2017 [**We Got POP Ltd.**][6]

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- anchors -->
[1]: https://github.com/wegotpop/prt
[2]: https://facebook.github.io/react
[3]: https://flow.org
[4]: http://eslint.org
[5]: https://babeljs.io
[6]: https://www.wegotpop.com
