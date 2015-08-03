var htmlSpliter = /(<([\w-]+)(?:\s[^>]*)?>(?:.*?<\/\2>)?|[^<]+)/g,
  tagSpliter = /^<([\w-]+)(\s[^>]*)?>(.*?)(?:<\/\1>)?$/;
  
var nonTrimTags = ['span', 'script', 'style', 'pre', 'textarea',
      'a', 'abbr', 'acronym','b', 'bdi', 'bdo', 'big', 'button',
      'cite','code', 'del', 'dfn', 'em', 'font', 'i', 'ins', 'kbd',
      'mark', 'q','rt', 'rp', 's', 'samp', 'small', 'strike', 'strong',
      'sub', 'sup', 'svg', 'time', 'tt', 'u', 'var'];

var textParse = function (textNode, parent) {
  
  if (nonTrimTags.indexOf(parent) > -1) {
    return JSON.stringify(textNode);
  }
  if (/^\s+$/.test(textNode)) {
    return;
  }
  return JSON.stringify(textNode.replace(/\s/g, ""));
};

var TagParse = function (root, name, attributes, children) {
  if (children) {
    children =
      divideUpNodes(children.match(htmlSpliter), name)
      .toString();
  }
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, ",\"$1\":\"$2\"")
      .substr(1);
  }

  return "h(\"" + name + "\""
  + (attributes ? ",{attributes:{" + attributes + "}}" : "")
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