var tagRegexp = /^(.*?)<([\w-]+?)(\s[^>]*)?>(.*?)(<\/\1>)?$/,
    textnodeKey = 1,
    tagNameKey = 2,
    attributesKey = 3,
    fragmentKey = 4,
    tagCloseKey = 5;

var parse = function (matchData) {
  
  var attributes = matchData[attributesKey];
  if (attributes) {
    attributes = attributes
    .replace(/ ([\w-]+?)="(.+?)"/g, ",\"$1\":\"$2\"")
    .substr(1);
  }
  var children = fragmentParse(matchData[fragmentKey]);
  
  return "h(\"" + matchData[tagNameKey] + "\""
  + (attributes ? ",{" + attributes + "}" : "")
  + (children ? ",[" + children.toString() + "]" : "")
  + ")";
};

var fragmentParse = function (fragment) {
  if (!fragment) {
    return null;
  }
  var matchData = fragment.match(tagRegexp);
  if (!matchData) {
    return JSON.stringify(fragment);
  }
  var children = [];
  
  if (matchData[textnodeKey]) {
    children.push(JSON.stringify(matchData[textnodeKey]));
  }
  
  if (matchData[tagCloseKey]) {
    children.push(parse(matchData));
    return children;
  }
  
  var fragments = matchData[fragmentKey].split("</" + matchData[tagNameKey] + ">");
  if (fragments.length === 2) { 
    matchData[fragmentKey] = fragments[0];
  } else {
    matchData[fragmentKey] = null;
  }
  children.push(parse(matchData));
  
  var anotherChild;  
  if (fragments.length === 2) { 
    anotherChild = fragments[1];
  } else {
    anotherChild = fragments[0];
  }
  children.push(fragmentParse(anotherChild));
  
  return children.filter(function (current) {return current});
}

var htmlParser =  function (rootHtml) {
  return fragmentParse(rootHtml)[0];
}

var renders = {
  '?': function (variable, html) {//if
    if (variable) {
      return html();
    }
  },
  '^': function (variable, html) {// if !
    if (!variable) {
      return html();
    }
  },
  '#': function (variable, html) {// array
    return variable.map(function (current) {
      return html(current);
    });
  },
  '+': function (variable, html) {// number
    var results = [];
    for (var i = 0; i < variable; i++) {
      results.push(html(i));
    }
    return results;
  }
};

var htmlParser = require('./htmlParser.js');

module.exports = function (html, h) {
  var hscript = htmlParser(html);
  console.log(hscript);
  return new Function('r', 'h', 'o', 'return ' + hscript
    .replace(/{{([\#\?\^\+\/]?)(.+?)}}/g, '{{$1o.$2}}')
    .replace(/"{{([\#\?\^\+])(.+?)}}",/g, 'r["$1"]($2,function(v){return ')
    .replace(/, "{{\/.+?}}"/g, '})')
    .replace(/{{o\.\.}}/g, "{{v}}")
    .replace(/{{o\.\.(.+?)}}/g, "{{v.$1}}")
    .replace(/("{{|}}")/g, '')
    .replace(/{{/g, '"+').replace(/}}/g, '+"'))
    .bind(null, renders, h);
}

