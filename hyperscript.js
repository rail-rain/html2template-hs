var compiler = require('./src/compiler');
var hyperscript = require('./src/hyperscript-converter');

module.exports = {
  compile: function (html, h) {
    return compiler.compile(hyperscript(html), h);
  },
  registerHelper: compiler.registerHelper,
  unregisterHelper: compiler.unregisterHelper,
  createCompiler: function (parsers) {
    var customParser = hyperscript.createParser(parsers);
    return function (html, h) {
      return compiler.compile(customParser(html), h);
    };
  }
};