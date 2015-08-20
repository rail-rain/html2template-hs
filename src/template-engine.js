"use strict";

var helpersReplace = function(helper, name, args) {
  return 'helpers["' + name + '"]('
  + args.replace(" ", ",")
  + ",function(v){return [";
};

var mustacheReplace = function(match, frontQuote, body, backQuote, comma) {
  comma = comma || "";
  if (body.indexOf("#") === 0) {
    body = body.replace(/#(\w+) (.+)/, helpersReplace);
    comma = "";
    
  } else if (body === "else") {
    body = "]},function(v){return [";
    comma = "";
    
  } else if (body.indexOf("/") === 0) {
    body = "]})";
    
  } else if (body.indexOf("this") === 0) {
    body = "v" + body.substr(4);
  }
  
  if (!frontQuote) {
    body = '",' + body;
  }
  if (!backQuote) {
    body += ',"';
  }
  
  return body + comma;
};

var convert = function(hscript) {
  return hscript
    .replace(/(")?{{(.+?)}}(")?(,)?/g, mustacheReplace);
};

module.exports = convert;
