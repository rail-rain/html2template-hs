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

var html2hs = require('./htmlParser');

module.exports = function (html, h) {

  var hscript = html2hs(html);
  return new Function('r', 'h', 'o', 'return ' + hscript
    .replace(/"{{([\#\?\^\+])(.+?)}}",/g, 'r["$1"](o.$2,function(v){return ')
    .replace(/,"{{\/.+?}}"/g, '})')
    .replace(/{{(.+?)}}/g, '{{o.$1}}')
    .replace(/{{o\.\.}}/g, "{{v}}")
    .replace(/{{o\.\.(.+?)}}/g, "{{v.$1}}")
    .replace(/("{{|}}")/g, '')
    .replace(/{{/g, '"+').replace(/}}/g, '+"'))
    .bind(null, renders, h);
}

