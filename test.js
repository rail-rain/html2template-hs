var html2hs = require('./src/index.js');
var html = require('./src/htmlParser');

var h = require('hyperscript');
var obj = {
  greeting: "hello!",
  flag: false,
  array: ['hello', 'world'],
  object: [
    {greeting: "hello"},
    {greeting: "world"}
  ],
  number: 3
};

'<div>' +
  '<input type="text" value="{{foo}}">' +
  '<div>world</div>' +
'</div>'

var hscript = html(
    '<div>' +
      '{{?flag}}' +
        '<span>hello</span>' +
      '{{/flag}}' +
      '<span>world</span>' +
    '</div>'
  )
  console.log(hscript);
   // <div>
   //   <span>world</span>
   // </div>

// var hscript = html2hs(
//   '<span>{{greeting}}</span>',
//   h)
//   console.log(hscript(obj).outerHTML);
//    // <span>hello!</span>
// 
// var hscript = html2hs(
//   '<div>' +
//     '{{?flag}}' +
//       '<span>hello</span>' +
//     '{{/flag}}' +
//     '<span>world</span>' +
//   '</div>',
//   h)
//   console.log(hscript(obj).outerHTML);
//    // <div>
//    //   <span>world</span>
//    // </div>
// 
// var hscript = html2hs(
//   '<div>' +
//     '{{^flag}}' +
//       '<span>hello</span>' +
//     '{{/flag}}' +
//     '<span>world</span>' +
//   '</div>',
//   h)
//   console.log(hscript(obj).outerHTML);
//   // <div>
//   //   <span>hello</span>
//   //   <span>world</span>
//   // </div>
// 
// var hscript = html2hs(
//   '<div>' +
//     '{{#array}}' +
//       '<span>{{.}}</span>' +
//     '{{/array}}' +
//   '</div>',
//   h)
//   console.log(hscript(obj).outerHTML);
//   // <div>
//   //   <span>hello</span>
//   //   <span>world</span>
//   // </div>
// 
// var hscript = html2hs(
//   '<div>' +
//     '{{#object}}' +
//       '<span>{{.greeting}}</span>' +
//     '{{/object}}' +
//   '</div>',
//   h)
//   console.log(hscript(obj).outerHTML);
//   // <div>
//   //   <span>hello</span>
//   //   <span>world</span>
//   // </div>
// 
// 
// var hscript = html2hs(
//   '<div>' +
//     '{{+number}}' +
//       '<span>{{.}}</span>' +
//     '{{/number}}' +
//   '</div>',
//   h)
//   console.log(hscript(obj).outerHTML);
//   // <div>
//   //   <span>0</span>
//   //   <span>1</span>
//   //   <span>2</span>
//   // </div>