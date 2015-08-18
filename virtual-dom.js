"use strict";

var compiler = require("./src/compiler");
var virtualDom = require("./src/virtual-dom-converter");

compiler.htmlConvert = virtualDom;

compiler.setNotAttributes = virtualDom.setNotAttributes;

module.exports = compiler;
