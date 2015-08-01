var htmlSpliter = /(<\/?[\w-]+?(?:\s[^>]*)?>)/,
  tagSpliter = /^<(\/?[\w-]+)(\s[^>]*)?>$/;
  
var arrayLastItem = function (array) {
  return array[array.length - 1];
};

var tagOpen = function(name, attributes, chidrenArray) {
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, ",\"$1\":\"$2\"")
      .substr(1);
  }
  
  chidrenArray.push([]);

  return "h(\"" + name + "\""
  + (attributes ? ",{" + attributes + "}" : "");
};

var tagClose = function(chidrenArray) {
  var children = arrayLastItem(chidrenArray);
  var childrenLength = children.length;
  var childrenString = children.toString();
  chidrenArray.pop();
  return (childrenLength ? "[" + childrenString + "]" : "") + ")";
};

var fragmentParse = function(fragment, chidrenArray) {
  var match = fragment.match(tagSpliter);
  if (!match) {
    arrayLastItem(chidrenArray).push(JSON.stringify(fragment));
  } else if (!match[1].search("/")) {
    chidrenArray[chidrenArray.length - 2].push(tagClose(chidrenArray));
  } else{
  arrayLastItem(chidrenArray).push(tagOpen(
    match[1],
    match[2],
    chidrenArray
  ))
  }
};

var parseStarter = function(html) {
  var fragments = [[]];
  html.split(htmlSpliter)
    .forEach(function(current) {
      if (current) {
        fragmentParse(current, fragments);
      }
    });
  return fragments[0].toString();
}

module.exports = parseStarter;