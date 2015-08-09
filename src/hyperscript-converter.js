var htmlParser = require('./html-parser.js');

module.exports = new htmlParser({
  attributesConvert: ",\"$1\":\"$2\"",
  
  tagConvert: function (name, attributes, children) {
    return "h(\"" + name + "\""
    + (attributes ? ",{" + attributes + "}" : "")
    + (children ? ",[" + children + "]" : "") + ")";
  },
  textConvert: function (textNode) {
    return JSON.stringify(textNode.replace(/\s+/g, " "));
  }
});