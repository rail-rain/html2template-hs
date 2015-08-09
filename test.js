var html2hs = require('./src/hyperscript-converter.js');

console.log(html2hs.htmlParse(
  '<div>' +
    '<span>foo</span>' +
  '</div>'
));