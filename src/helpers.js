"use strict";

var helpers = {
  if: function (flag, html, elseHtml) {
    if (flag) {
      return html();
    } else if (elseHtml) {
      return elseHtml();
    }
  },
  unless: function (flag, html, elseHtml) {
    if (!flag) {
      return html();
    } else if (elseHtml) {
      return elseHtml();
    }
  },
  each: function (array, html, elseHtml) {
    if (array) {
      return array.map(function (current) {
        return html(current);
      });
    } else if (elseHtml) {
      return elseHtml();
    }
  }
};

var registerHelper = function (name, helper) {
  helpers[name] = helper;
};

var unregisterHelper = function (name) {
  helpers[name] = undefined;
};

module.exports = {
  helpers: helpers,
  registerHelper: registerHelper,
  unregisterHelper: unregisterHelper
};
