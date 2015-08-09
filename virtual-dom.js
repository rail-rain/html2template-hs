var compiler = require('./src/compiler');
var virtualDom = require('./src/virtual-dom-converter');

module.exports = {
  compile: function (html, h) {
    return compiler.compile(virtualDom(html), h);
  },
  setNotAttributes: virtualDom.setNotAttributes,
  registerHelper: compiler.registerHelper,
  unregisterHelper: compiler.unregisterHelper
};