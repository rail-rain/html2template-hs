var htmlParser = require('./html-parser');

module.exports = function (converters) {
  
  var createParser = function (customParsers) {
    return new htmlParser({
      attributesConvert: function (full, name, value) {
        var attributes = [name, value];
        if (customParsers.attributes) attributes = customParsers.attributes(name, value);
        return converters.attributesConvert(attributes[0], attributes[1]);
      },
      tagConvert: function (name, attributes, children) {
        return converters.tagConvert(name, attributes, children);
      },
      textConvert: function (textNode) {
        if (customParsers.textNode) textNode = customParsers.textNode(textNode);
        
        return converters.textConvert(textNode);
      }
    });
  };
  
  var htmlParse = createParser({});

  htmlParse.createParser = createParser;
  
  return htmlParse;
};