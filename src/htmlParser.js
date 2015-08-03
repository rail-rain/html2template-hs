var htmlSpliter = /(<\/?[\w-]+(?:\s[^>]*)?>)/,
  tagSpliter = /^<(\/?[\w-]+)(\s[^>]*)?>$/;
  
var nonCloseTags = ['br','img','hr','meta','input','embed','area','base','col','keygen','link','param','source'],
  nonTrimTags = ['span', 'script', 'style', 'pre', 'textarea', 'a', 'abbr', 'acronym',
      'b', 'bdi', 'bdo', 'big', 'button', 'cite',
      'code', 'del', 'dfn', 'em', 'font', 'i', 'ins', 'kbd', 'mark', 'q',
      'rt', 'rp', 's', 'samp', 'small', 'strike', 'strong',
      'sub', 'sup', 'svg', 'time', 'tt', 'u', 'var'];
  
var TagParser = function () {
  this.fragments = [[]];
  this.currentTag = [];
}

TagParser.prototype.lastFrgment = function () {
  return this.fragments[this.fragments.length - 1];
};
  
TagParser.prototype.addElement = function (element) {
  this.fragments[this.fragments.length - 1].push(element);
};

TagParser.prototype.getResult = function () {
  return this.fragments[0].toString();
};

TagParser.prototype.addCloseTag = function (closeTag) {
  var fragment = this.fragments[this.fragments.length - 1];
  fragment[fragment.length - 1] += closeTag;
};

TagParser.prototype.addTextNode = function (textNode) {
  
  if (nonTrimTags.indexOf(this.currentTag[this.currentTag.length - 1]) > -1) {
    this.addElement(JSON.stringify(textNode));
    return;
  }
  if (/^\s+$/.test(textNode)) {
    return;
  }
  this.addElement(JSON.stringify(textNode.replace(/\s/g, "")));
};

TagParser.prototype.tagOpen = function(name, attributes) {
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, ",\"$1\":\"$2\"")
      .substr(1);
  }

  this.addElement("h(\"" + name + "\""
  + (attributes ? ",{" + attributes + "}" : ""));
  
  if (nonCloseTags.indexOf(name) > -1) {
    this.addCloseTag(")");
  } else {
    this.fragments.push([]);
    this.currentTag.push(name);
  }
};

TagParser.prototype.tagClose = function() {
  this.currentTag.pop();
  var children = this.lastFrgment();
  var childrenLength = children.length;
  var childrenString = children.toString();
  this.fragments.pop();
  this.addCloseTag(
    (childrenLength ? ",[" + childrenString + "]" : "") + ")");
};

var fragmentParse = function(element, fragments) {
  var tag = element.match(tagSpliter);
  if (!tag) {
    fragments.addTextNode(element);
  } else if (tag[1].search("/")) {
    fragments.tagOpen(tag[1], tag[2]);
  } else{
    fragments.tagClose();
  }
};

module.exports = function(html) {
  var fragments = new TagParser();
  html
    .replace(/\n\r/g, "")
    .replace(/<!--.*?-->/g, "")
    .split(htmlSpliter)
    .forEach(function(current) {
      if (current) {
        fragmentParse(current, fragments);
      }
    });
  return fragments.getResult();
};