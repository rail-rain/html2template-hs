var htmlSpliter = /(<([\w-]+)(?:\s[^>]*)?>(?:.*?<\/\2>)?|[^<]+)/g,
  tagSpliter = /^<([\w-]+)(\s[^>]*)?>(.*?)(?:<\/\1>)?$/,
  notAttributes = /(ev-)/;
  
var setNotAttributes = function (newNotAttributes) {
  notAttributes = new RegExp(
    "(" + newNotAttributes.join("|") + ")");
};

var textParse = function (textNode, parent) {
  if (/^\s+$/.test(textNode)) {
    return;
  }
  return JSON.stringify(textNode.replace(/\s+/g, " "));
};

var TagParse = function (root, name, attributes, children) {
  if (children) {
    children =
      divideUpNodes(children.match(htmlSpliter), name)
      .toString();
  }
  if (attributes) {
    var properties = "";
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, function (full, name, variable) {
        var isAttr = name.search(notAttributes) === -1;
        if (!isAttr) {
          properties += (',"' + name + '":"' + variable + '"');
          return '';
        }
        
        return ',"' + name + '":"' + variable + '"';
      }).substr(1);
  }

  return "h(\"" + name + "\""
  + (attributes || properties ? ",{"
  + (attributes ? "attributes:{" + attributes + "}" : "")
  + (attributes && properties ? ",": "")
  + (properties ? properties.substr(1) : "")
  + "}" : "")
  + (children ? ",[" + children + "]" : "") + ")";
};

var divideUpNodes = function (nodes, parent) {
  return nodes.map(function (node) {
    if (node.indexOf("<") === 0) {
      return node.replace(tagSpliter, TagParse);
    }
    return textParse(node, parent);
  }).filter(function (item) {return item});
};

module.exports = function(html) {
  return html
    .trim()
    .replace(/[\n\r]/g, "")
    .replace(/<!--.*?-->/g, "")
    .replace(tagSpliter, TagParse);
};