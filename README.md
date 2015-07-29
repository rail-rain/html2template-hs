# html2template-hs

converted html into the mustache like template hyperscript !

## demo

``` js
var html2hs = require('html2template-hs');
var h = require('hyperscript');
var obj = {
  greeting: "hello!"
};

html2hs(
  '<span>{{greeting}}</span>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
   // <span>hello!</span>
});
```

## api
(i will omit the "require" of api)

####if
``` js
var obj = {
  flag: false
};

html2hs(
  '<div>' +
    '{{?flag}}' +
      '<span>hello</span>' +
    '{{/flag}}' +
    '<span>world</span>' +
  '</div>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
   // <div>
   //   <span>world</span>
   // </div>
});
```

####reverse if
``` js
var obj = {
  flag: false
};

html2hs(
  '<div>' +
    '{{^flag}}' +
      '<span>hello</span>' +
    '{{/flag}}' +
    '<span>world</span>' +
  '</div>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
});
```

####array repeat
``` js
var obj = {
  items: ['hello', 'world']
};

html2hs(
  '<div>' +
    '{{#items}}' +
      '<span>{{.}}</span>' +
    '{{/items}}' +
  '</div>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
});
```

####object in array repeat
``` js
var obj = {
  items: [
    {greeting: "hello"},
    {greeting: "world"}
  ]
};

html2hs(
  '<div>' +
    '{{#items}}' +
      '<span>{{.greeting}}</span>' +
    '{{/items}}' +
  '</div>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
});
```

####number repeat
``` js
var obj = {
  items: 3
};

html2hs(
  '<div>' +
    '{{+items}}' +
      '<span>{{.}}</span>' +
    '{{/items}}' +
  '</div>',
  h, function (hscript) {
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>0</span>
  //   <span>1</span>
  //   <span>2</span>
  // </div>
});
```