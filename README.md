# PRT

This repository is the reference client-side implemention of [PRT][1], a safe,
small and strict rich text serialisation protocol.

### Table of Content

- [PRTv2.0](#prtv20)
    - [Javascript](#javascript)
        - [Dependencies](#dependencies)
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
import registerPRTDialectByNameAndVersion from 'prt/dialects';
import PRTDialect from 'prt/v2/dialect';

class MyDialect extends PRTDialect {
  identifierToHTML = identifier => {
    switch (identifier) {
      case 0  : return 'MyNameSpace:X';
      case 1  : return 'MyNameSpace:Y';
      case 3  : return 'MyNameSpace:Z';
      default : return 'MyNameSpace:Empty';
    }
  }
}

// ...

registerPRTDialectByNameAndVersion('my-dialect', '2.0', MyDialect);
```

#### Dependencies

- [`react`][2]
- [`flow`][3]
- [`eslint`][4]
- [`babel`][5]


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
