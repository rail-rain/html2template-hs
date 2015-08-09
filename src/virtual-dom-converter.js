var notAttributes = /(ev-)/;

var htmlParser = require('./html-parser.js');

var htmlParse = new htmlParser({
    attributesConvert: function (full, name, value) {
      var isAttr = name.search(notAttributes) === -1;
      if (!isAttr) {
        properties += (',"' + name + '":"' + value + '"');
        return '';
      }
      
      return ',"' + name + '":"' + value + '"';
    },
    tagConvert: function (name, attributes, children) {
      return "h(\"" + name + "\""
      + (attributes || properties ? ",{"
      + (attributes ? "attributes:{" + attributes + "}" : "")
      + (attributes && properties ? ",": "")
      + (properties ? properties.substr(1) : "")
      + "}" : "")
      + (children ? ",[" + children + "]" : "") + ")";
    },
    textConvert: function (textNode) {
      return JSON.stringify(textNode.replace(/\s+/g, " "));
    }
  });
  
  htmlParse.setNotAttributes = function (newNotAttributes) {
    notAttributes = new RegExp(
      "(" + newNotAttributes.join("|") + ")");
  };

module.exports = htmlParse;