"use strict";

var compiler = require("./src/compiler");
var hyperscript = require("./src/hyperscript-converter");

compiler.htmlConverter = hyperscript;

module.exports = compiler;
