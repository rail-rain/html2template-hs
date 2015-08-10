var htmlParser = require('./converter-template');

var htmlParse = htmlParser({
  attributesConvert: function (name, value) {
    return ',"' + name + '":"' + value + '"';
  },
  tagConvert: function (name, attributes, children) {
    return "h(\"" + name + "\""
    + (attributes ? ",{" + attributes + "}" : "")
    + (children ? ",[" + children + "]" : "") + ")";
  },
  textConvert: function (textNode) {
    return JSON.stringify(textNode.replace(/\s+/g, " "));
  }
});

module.exports = htmlParse;