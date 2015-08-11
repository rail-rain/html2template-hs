var htmlParser = require('./html-parser');

var htmlParse = new htmlParser({
  attributesConvert: ',"$1":"$2"',
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