var renders = {
  '?': function (variable, html) {//if
    if (variable) {
      return html();
    }
  },
  '^': function (variable, html) {// if !
    if (!variable) {
      return html();
    }
  },
  '#': function (variable, html) {// array
    return variable.map(function (current) {
      return html(current);
    });
  },
  '+': function (variable, html) {// number
    var results = [];
    for (var i = 0; i < variable; i++) {
      results.push(html(i));
    }
    return results;
  }
};

var htmlParser = require('./htmlParser.js');

module.exports = function (html, h) {

  var hscript = htmlParser(html);
  return new Function('r', 'h', 'o', 'return ' + hscript
    .replace(/{{([\#\?\^\+\/]?)(.+?)}}/g, '{{$1o.$2}}')
    .replace(/"{{([\#\?\^\+])(.+?)}}",/g, 'r["$1"]($2,function(v){return ')
    .replace(/,"{{\/.+?}}"/g, '})')
    .replace(/{{o\.\.}}/g, "{{v}}")
    .replace(/{{o\.\.(.+?)}}/g, "{{v.$1}}")
    .replace(/("{{|}}")/g, '')
    .replace(/{{/g, '"+').replace(/}}/g, '+"'))
    .bind(null, renders, h);
}

