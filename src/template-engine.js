"use strict";

var mustacheReplace = function(mustache, body) {
  if (body.indexOf("this") === 0) {
    if (body.length === 1) {
      body = "v";
    } else {
      body = "v" + body.substr(4);
    }
  } else {
    body = "o." + body;
  }

  if (mustache.indexOf('"') !== 0) {
    body = '"+' + body;
  }
  if (mustache.lastIndexOf('"') !== mustache.length - 1) {
    body += '+"';
  }
  return body;
};

var helpersReplace = function(helper, isBlock, name, args) {
  return 'helpers["' + name + '"](' + args.split(" ")
    .map(function(arg) {
      return "o." + arg
    })
    .join(",") + (isBlock ? ",function(v){return [" : ")");
};

var convert = function(hscript) {

  return hscript
    .replace(/" ?{{(\#)?(\w+) (.+?)}} ?",?/g, helpersReplace)
    .replace(/," ?{{\/\w+}} ?"/g, "]})")
    .replace(/," ?{{else}} ?",/g, "]},function(){return [")
    .replace(/"?{{([.\w\[\]]+)}}"?/g, mustacheReplace)
    .replace(/o\.\./g, "o");
};

module.exports = convert;