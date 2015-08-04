(function () {
  "use strict";
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

  var mustacheReplace = function (mustache, body) {
    if (body.indexOf(".") === 0) {
      if (body.length === 1) {
        body = 'v';
      } else {
        body = 'v' + body;
      }
    } else {
      body = 'o.' + body;
    }
    
    if (mustache.indexOf('"') !== 0) {
      body = '"+' + body;
    }
    if (mustache.lastIndexOf('"') !== mustache.length - 1) {
      body += '+"';
    }
    return body;
  };

  var html2hs = require('./htmlParser');

  module.exports = function (html, h) {

    var hscript = html2hs(html);
    
    return new Function('r', 'h', 'o', 'return ' + hscript
      .replace(/"{{([\#\?\^\+])(.+?)}}",/g, 'r["$1"](o.$2,function(v){return ')
      .replace(/,"{{\/.+?}}"/g, '})')
      .replace(/"?{{(.+?)}}"?/g, mustacheReplace))
      .bind(null, renders, h);
  }

}());
