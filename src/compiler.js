"use strict";

var templateEngine = require("./template-engine");
var helper = require("./helpers");

var convert = function (html) {
  return templateEngine(compiler.htmlConverter(html));
};

var compile = function (html, h) {
  return new Function("helpers", "h", "obj"
  , "with(obj){"
  + "return " + convert(html)
  + "}"
  ).bind(null, helper.helpers, h);
};

var compiler = {
  compile: compile,
  convert: convert,
  registerHelper: helper.registerHelper,
  unregisterHelper: helper.unregisterHelper
};

module.exports = compiler;
