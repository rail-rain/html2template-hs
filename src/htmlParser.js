var htmlSpliter = /(<\/?[\w-]+?(?:\s[^>]*)?>)/,
  tagSpliter = /^<(\/?[\w-]+)(\s[^>]*)?>$/;
  
var nonCloseTags = ['br','img','hr','meta','input','embed','area','base','col','keygen','link','param','source'];
  
var TagParser = function () {
  this.fragments = [[]];
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
}

TagParser.prototype.tagOpen = function(name, attributes) {
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, ",\"$1\":\"$2\"")
      .substr(1);
  }

  this.addElement("h(\"" + name + "\""
  + (attributes ? ",{" + attributes + "}" : ""));
  
  if (nonCloseTags.some(function (current) {return name === current})) {
    this.addCloseTag(")");
  } else {
    this.fragments.push([]);
  }
};

TagParser.prototype.tagClose = function() {
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
    fragments.addElement(JSON.stringify(element));
  } else if (!tag[1].search("/")) {
    fragments.tagClose();
  } else{
  fragments.tagOpen(tag[1], tag[2])
  }
};

module.exports = function(html) {
  var fragments = new TagParser();
  html
    .replace(/<!--.*?-->/, "")
    .split(htmlSpliter)
    .forEach(function(current) {
      if (current) {
        fragmentParse(current, fragments);
      }
    });
  return fragments.getResult();
};