"use strict";
  
  var helpers = {
    'if': function (flag, html, elseHtml) {
      if (flag) {
        return html();
      } else if (elseHtml) {
        return elseHtml();
      }
    },
    'unless': function (flag, html, elseHtml) {
      if (!flag) {
        return html();
      } else if (elseHtml) {
        return elseHtml();
      }
    },
    'each': function (array, html, elseHtml) {
      if (array) {
        return array.map(function (current) {
          return html(current);
        });
      } else if (elseHtml) {
        return elseHtml();
      }
    }
  };
  
  var mustacheReplace = function (mustache, body) {
    if (body.indexOf("this") === 0) {
      if (body.length === 1) {
        body = 'v';
      } else {
        body = 'v' + body.substr(4);
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
  
  var helpersReplace = function (helper, isBlock, name, args) {
    return 'r["' + name + '"]('
    + args.split(" ")
      .map(function (arg) {return 'o.' + arg})
      .join(",") + (isBlock ? ',function(v){return [' : ')');
  };

  var compile = function (hscript, h) {
    
    return new Function('r', 'h', 'o', 'return ' + hscript
      .replace(/" ?{{(\#)?(\w+) (.+?)}} ?",?/g, helpersReplace)
      .replace(/," ?{{\/\w+}} ?"/g, ']})')
      .replace(/," ?{{else}} ?",/g, ']},function(){return [')
      .replace(/"?{{([.\w\[\]]+)}}"?/g, mustacheReplace)
      .replace(/o\.\./g, "o"))
      .bind(null, helpers, h);
  };
  
  var registerHelper = function (name, helper) {
    helpers[name] = helper;
  };
  
  var unregisterHelper = function (name) {
    helpers[name] = undefined;
  };
  
  module.exports = {
    'compile': compile,
    'registerHelper': registerHelper,
    'unregisterHelper': unregisterHelper
  };
