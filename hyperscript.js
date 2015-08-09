var compiler = require('./src/compiler');
var hyperscript = require('./src/hyperscript-converter');

module.exports = {
  compile: function (html, h) {
    return compiler.compile(hyperscript(html), h);
  },
  registerHelper: compiler.registerHelper,
  unregisterHelper: compiler.unregisterHelper
};