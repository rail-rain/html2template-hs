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
  - [api](#api)
  - [jsdoc](#jsdoc)
  - [virtual-hyperscript](#virtual-hyperscript)
* [thanks](#thanks)

## docs

[simple specification](https://github.com/rail-rain/html2template-hs/blob/master/handlebars-light.md)

(i will omit the "require" of api)
### api

* [registe helper](#registe-helper)

#### registe helper

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
 * @param {String} html
 * @return {String} template 
*/
html2ths.convert(html)

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
