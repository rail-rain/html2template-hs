"use strict";

var htmlSpliter = /(<([\w-]+)(?:\s[^>]*)?>(?:.*?<\/\2>)?|[^<]+)/g,
  tagSpliter = /^<([\w-]+)(\s[^>]*)?>(.*?)(?:<\/\1>)?$/;
  
var htmlParser = function (events) {
  this.tagConvert = events.tagConvert;
  this.attributesConvert = events.attributesConvert;
  this.textConvert = events.textConvert;
  
  return this.htmlParse.bind(this);
};

htmlParser.prototype.textParse = function (textNode, parent) {
  if (/^\s+$/.test(textNode)) return;
  
  return this.textConvert(textNode.replace(/\s+/g, " ").trim(), parent);
};

htmlParser.prototype.tagParse = function (root, name, attributes, children) {
  if (children) {
    children =
      this.divideUpNodes(children.match(htmlSpliter), name)
      .toString();
  }
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, this.attributesConvert)
      .substr(1);
  }
  return this.tagConvert(name, attributes, children);
};

htmlParser.prototype.divideUpNodes = function (nodes, parent) {
  return nodes.map(function (node) {
    if (node.indexOf("<") === 0) {
      return node.replace(tagSpliter, this.tagParse.bind(this));
    }
    return this.textParse(node, parent);
  }.bind(this)).filter(function (item) {return item});
};

htmlParser.prototype.htmlParse = function(html) {
  return html
    .trim()
    .replace(/[\n\r]/g, "")
    .replace(/<!--.*?-->/g, "")
    .replace(tagSpliter, this.tagParse.bind(this));
};

module.exports = htmlParser;
