# html2template-hs

converted html into the mustache like template hyperscript !

## demo

``` js
var html2ths = require('html2template-hs');
var h = require('hyperscript');
var obj = {
  greeting: "hello!"
};

var hscript = html2ths(
  '<span>{{greeting}}</span>',
  h);
  console.log(hscript(obj).outerHTML);
   // <span>hello!</span>
```

## api
(i will omit the "require" of api)

####if
``` js
var obj = {
  flag: false
};

var hscript = html2ths(
    '<div>' +
      '{{?flag}}' +
        '<span>hello</span>' +
      '{{/flag}}' +
      '<span>world</span>' +
    '</div>',
  h);
  console.log(hscript);
   // <div>
   //   <span>world</span>
   // </div>
```

####reverse if
``` js
var obj = {
  flag: false
};

var hscript = html2ths(
  '<div>' +
    '{{^flag}}' +
      '<span>hello</span>' +
    '{{/flag}}' +
    '<span>world</span>' +
  '</div>',
  h)
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```

####array repeat
``` js
var obj = {
  items: ['hello', 'world']
};

var hscript = html2ths(
  '<div>' +
    '{{#array}}' +
      '<span>{{.}}</span>' +
    '{{/array}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```

####object in array repeat
``` js
var obj = {
  items: [
    {greeting: "hello"},
    {greeting: "world"}
  ]
};

var hscript = html2ths(
  '<div>' +
    '{{#object}}' +
      '<span>{{.greeting}}</span>' +
    '{{/object}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```

####number repeat
``` js
var obj = {
  items: 3
};

var hscript = html2ths(
  '<div>' +
    '{{+number}}' +
      '<span>{{.}}</span>' +
    '{{/number}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>0</span>
  //   <span>1</span>
  //   <span>2</span>
  // </div>
```