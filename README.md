# html2template-hs

converted html into the [handlebars] like template hyperscript and virtual-hyperscript !

This is still during the experiment therefore Possibility of change without notice

## demo

``` js
var html2ths = require('html2template-hs');
var h = require('hyperscript');
var obj = {
  greeting: "hello!"
};

var hscript = html2ths.compile(
  '<span>{{greeting}}</span>',
  h);
  console.log(hscript(obj).outerHTML);
   // <span>hello!</span>
```

* [docs](#docs)
  - [built-in helpers](#built-in-helpers)
  - [api](#api)
  - [jsdoc](#jsdoc)
  - [virtual-hyperscript](#virtual-hyperscript)
* [thanks](#thanks)

## docs
(i will omit the "require" of api)

### built-in helpers

* [if](#if)
* [unless](#unless)
* [if else](#if-else)
* [array repeat](#array-repeat)
* [object in array repeat](#object-in-array-repeat)

#### if
``` js
var obj = {
  flag: false
};

var hscript = html2ths.compile(
    '<div>' +
      '{{#if flag}}' +
        '<span>hello</span>' +
      '{{/if}}' +
      '<span>world</span>' +
    '</div>',
  h);
  console.log(hscript);
   // <div>
   //   <span>world</span>
   // </div>
```

#### unless

``` js
var obj = {
  flag: false
};

var hscript = html2ths.compile(
  '<div>' +
    '{{#unless flag}}' +
      '<span>hello</span>' +
    '{{/unless}}' +
    '<span>world</span>' +
  '</div>',
  h)
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```
#### if else
``` js
var obj = {
  flag: false
};

var hscript = html2ths.compile(
    '<div>' +
      '{{#if flag}}' +
        '<span>hello</span>' +
      '{{else}}' +
        '<span>good night</span>' +
      '{{/if}}' +
      '<span>world</span>' +
    '</div>',
  h);
  console.log(hscript);
   // <div>
   //   <span>good night</span>
   //   <span>world</span>
   // </div>
```

#### array repeat
``` js
var obj = {
  items: ['hello', 'world']
};

var hscript = html2ths.compile(
  '<div>' +
    '{{#each array}}' +
      '<span>{{this}}</span>' +
    '{{/each}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```

#### object in array repeat
``` js
var obj = {
  items: [
    {greeting: "hello"},
    {greeting: "world"}
  ]
};

var hscript = html2ths.compile(
  '<div>' +
    '{{#each object}}' +
      '<span>{{this.greeting}}</span>' +
    '{{/each}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>hello</span>
  //   <span>world</span>
  // </div>
```

### api

* [registe helper](#registe-helper)
* [registe block helper](#registe-block-helper)

#### registe helper

``` js
var obj = {
  name: 'world'
};

html2ths.registerHelper("greeting", function (name) {
  return 'hello ' + name;
});

var hscript = html2ths.compile(
    '<span>{{greeting name}}</span>',
  h);
  console.log(hscript(obj).outerHTML);
  //   <span>hello world</span>
```

#### registe block helper
``` js
var obj = {
  greeting: {
    morning: 'good morning',
    noon: 'hello',
    evening: 'good evening',
    night: 'good night'
  }
};

html2ths.registerHelper("with", function (object, html) {
  return html(object);
});

var hscript = html2ths.compile(
  '<div>' +
    '{{#with greeting}}' +
      '<span>{{this.morning}}</span>' +
      '<span>{{this.noon}}</span>' +
      '<span>{{this.evening}}</span>' +
      '<span>{{this.night}}</span>' +
    '{{/with}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>good morning</span>
  //   <span>hello</span>
  //   <span>good evening</span>
  //   <span>good night</span>
  // </div>

```

another sample

``` js
var obj = {
  items: 3
};

html2ths.registerHelper("for", function (number, html) {
  var results = [];
  for (var i = 0; i < number; i++) {
    results.push(html(i));
  }
  return results;
});

var hscript = html2ths.compile(
  '<div>' +
    '{{#for number}}' +
      '<span>{{this}}</span>' +
    '{{/for}}' +
  '</div>',
  h);
  console.log(hscript(obj).outerHTML);
  // <div>
  //   <span>0</span>
  //   <span>1</span>
  //   <span>2</span>
  // </div>
```

### jsdoc

``` js
/**
 * @param {String} html
 * @param {Function} h hyperscript
 * @return {Function} template 
*/
html2ths.compile(html, h)

/**
 * @param {String} name
 * @param {Function} helper
*/
html2ths.registerHelper(name, helper)

/**
 * @param {String} name
*/
html2ths.unregisterHelper(name)
```

### virtual-hyperscript

``` js
var html2tvd = require('html2template-hs/virtual-dom');
```

#### api
``` js
/**
 * @param {Array} notAttributes sample > ['ev-', 'hook']
*/
html2vd.setNotAttributes(notAttributes)
```

## thanks

  [handlebars] MIT
  
  Copyright (C) 2011-2015 by Yehuda Katz
  
[handlebars]: http://handlebarsjs.com/ "handlebars"
