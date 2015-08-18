"use strict";

var mustacheReplace = function(mustache, body) {
  if (body.indexOf("this") === 0) {
      body = "v" + body.substr(4);
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
  return 'helpers["' + name + '"]('
  + args.split(" ").join(",")
  + (isBlock ? ",function(v){return [" : ")");
};

var convert = function(hscript) {

  return hscript
    .replace(/"{{(\#)?(\w+) (.+?)}}",?/g, helpersReplace)
    .replace(/,"{{\/\w+}}"/g, "]})")
    .replace(/,"{{else}}",/g, "]},function(v){return [")
    .replace(/"?{{([.\w\[\]]+)}}"?/g, mustacheReplace);
};

module.exports = convert;

